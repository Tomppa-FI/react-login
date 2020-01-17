import Express from "express";
import fs from "fs";
import https from "https";
const app = Express();
const HOST = "localhost";
const PORT = 8000;
const privKey = fs.readFileSync("../ssl/privatekey.pem")
const cert = fs.readFileSync("../ssl/cert.pem");
app.use(Express.json());

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set("Access-Control-Allow-Headers", "Content-Type");
    next()
})

app.post("/register", (req, res) => {
    console.log(req.body);
    console.log(req.body.username);
})

https.createServer({
    key: privKey,
    cert: cert
}, app).listen(PORT, HOST, () => {
    console.log(`Server listening at ${HOST}:${PORT}`)
});
