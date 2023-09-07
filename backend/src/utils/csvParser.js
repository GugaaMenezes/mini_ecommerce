const fs = require("fs");
const csv = require("csv-parser");

class CSVParser {
    static async parseCSV(filePath) {
        return new Promise((resolve, reject) => {
            const results = [];

            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (data) => {
                    // Processar cada linha do CSV conforme necessário
                    results.push(data);
                })
                .on("end", () => {
                    resolve(results);
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    }
}

module.exports = CSVParser;
