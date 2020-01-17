import Express from "express";
const app = Express();
const PORT = 8000;
const HOST = "0.0.0.0";

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

app.listen(PORT, HOST, () => {
    console.log(`Listening on ${HOST}:${PORT}`);
})

