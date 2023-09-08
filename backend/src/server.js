const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Diretório de upload
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};



app.use(cors(corsOptions));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(bodyParser.json());


// Rota principal que serve a aplicação React
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.use("/api", apiRoutes);
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    responseContentType: 'application/json',
}));
// Configurar suas rotas de API

// Rota POST para processar o arquivo de preços
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
