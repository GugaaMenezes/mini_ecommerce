const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./src/routes/api");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", apiRoutes);
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
