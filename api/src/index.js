import Express from "express";
import fs from "fs";
import https from "https";
import bcrypt from "bcryptjs";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./models/User.js";
const app = Express();
const HOST = "localhost";
const PORT = 8000;
const salt = JSON.parse(fs.readFileSync("../config/config.json")).salt;
const jwtPrivateKey = JSON.parse(fs.readFileSync("../config/config.json")).jwtPrivateKey;
const privKey = fs.readFileSync("../ssl/privatekey.pem")
const cert = fs.readFileSync("../ssl/cert.pem");

mongoose.connect("mongodb://localhost:27017/reactlogintest", {useNewUrlParser: true, useUnifiedTopology: true});

const authenticate = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        const bearer = req.headers.authorization.split(" ");
        const token = bearer[1];
        req.token = token;
    } else {
        req.token = undefined;
    }
    next()
}

app.use(cors());
app.use(authenticate);
app.use(Express.json());

app.post("/user", (req, res) => {
    if (req.token) {
        jwt.verify(req.token, jwtPrivateKey, (err, authorizedData) => {
            if (err) {
                console.log(req.token);
                console.log(err);
                res.status(403).send({success: false});
            }

            if (authorizedData) {
                res.status(200).send({success: true, username: authorizedData.doc.username});
            }
        })
    }
})

app.post("/user/register", (req, res) => {
    User.findOne({username : req.body.username}).exec((err, doc) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        if (doc) {
            res.sendStatus(409);
            return;
        }

        User.create({
            username: req.body.username,
            hash: bcrypt.hashSync(req.body.password, salt),
        })
        res.sendStatus(201);
    })
});

app.post("/user/login", (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, salt);
    User.findOne({
        username: req.body.username,
        hash: hash,
    }).exec((err, doc) => {
        if (err) {
            console.log(err);
            res.status(500).json({success: false, statusMsg: "Internal Server Error. Please try again later."});
            return;
        }

        if (doc) {
            jwt.sign({doc}, jwtPrivateKey, {expiresIn: "2days"}, (err, token) => {
                if (err) {
                    console.log(err);
                }
                res.status(200).json({success: true, statusMsg: "Log in successful. You will be redirected in 5 seconds.", username: doc.username, token: token});
            })
        } else {
            res.status(422).json({success: false, statusMsg: "Invalid Username or Password"});
            return;
        }
    })
})

https.createServer({
    key: privKey,
    cert: cert
}, app).listen(PORT, HOST, () => {
    console.log(`Server listening at ${HOST}:${PORT}`)
});
