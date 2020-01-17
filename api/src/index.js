import Express from "express";
import fs from "fs";
import https from "https";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
const app = Express();
const HOST = "localhost";
const PORT = 8000;
const salt = JSON.parse(fs.readFileSync("../config/config.json")).salt;
const privKey = fs.readFileSync("../ssl/privatekey.pem")
const cert = fs.readFileSync("../ssl/cert.pem");
app.use(Express.json());

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set("Access-Control-Allow-Headers", "Content-Type");
    next()
})

app.post("/register", (req, res) => {
    const token = ""; //JWT.
    User.create({
        username: req.body.username,
        hash: bcrypt.hashSync(req.body.password, salt),
        token: token
    })
});

https.createServer({
    key: privKey,
    cert: cert
}, app).listen(PORT, HOST, () => {
    console.log(`Server listening at ${HOST}:${PORT}`)
});
