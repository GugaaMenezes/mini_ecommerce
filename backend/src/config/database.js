const mysql = require("mysql");

// Configuração da conexão com o banco de dados
const dbConfig = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "ecommerce",
};

const connection = mysql.createConnection(dbConfig);

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    } else {
        console.log("Conectado ao banco de dados.");
    }
});

// Exportar a função query
function query(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { connection, query }; // Exporte a função query
