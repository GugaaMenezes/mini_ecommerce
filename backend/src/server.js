const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api"); // Suas rotas de API
const multer = require("multer");
const cors = require("cors");

const upload = multer({ dest: "uploads/" }); // Diretório de upload

app.use(bodyParser.json());
app.use(cors());
app.use("/api", apiRoutes);

// Configurar a rota para servir a aplicação React
// app.use(express.static(path.join(__dirname, "../frontend/publicasd")));

// Rota principal que serve a aplicação React
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Configurar suas rotas de API

// Rota POST para processar o arquivo de preços com Multer
app.post("/api/pricing", upload.single("pricingFile"), (req, res) => {
    // Aqui você pode acessar o arquivo enviado como req.file
    // Processar o arquivo, se necessário
    console.log("Arquivo recebido:", req.file);

    // Retornar uma resposta adequada
    res.json({ message: "Arquivo CSV recebido com sucesso." });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor Node.js está em execução na porta ${port}`);
});
