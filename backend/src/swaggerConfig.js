const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0", // Versão do Swagger
        info: {
            title: "Mini Ecommerce",
            version: "1.0.0",
            description: "Documentação da API de Mini Ecommerce - Criado por Gustavo Menezes",
        },
    },
    // Especifique os caminhos para os arquivos que contêm os comentários JSDoc.
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
