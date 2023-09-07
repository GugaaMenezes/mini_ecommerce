
//Compara o Novo Preço, com o preço de venda atual e o preço de custo

function calculateNewPrice(productCode, newPrice, salesPrice, costPrice) {


    // Percentual máximo de variação do preço 
    let percentVariable = 0.1;

    const upperVariable = 1 + percentVariable;
    const downVariable = 1 - percentVariable;

    // Verifica se o Novo Preço é maior que o preço de custo
    if ( newPrice > (salesPrice * upperVariable) || newPrice < (salesPrice * downVariable) ) {
        return {
            status: "error",
            reason: "Produto teve uma variação maior que 10%",
            productCode: productCode,
            newPrice: newPrice,
            oldPrice: salesPrice
        }
        //Verifica se a variação do Novo Preço é maior que 10%
    } else if (newPrice < costPrice) {
        return {
            status: "error",
            reason: "Preço de venda inferior ao preço de custo",
            productCode: productCode,
            newPrice: newPrice,
            costPrice: costPrice
        };
    }

    return { status: "success", productCode: productCode, newPrice: newPrice };
    
}


//Compara o Novo Preço, com o preço de venda atual e o preço de custo

// function updatePricePack(productCode, newPrice, salesPrice, costPrice) {


//     // Percentual máximo de variação do preço 
//     let percentVariable = 0.1;

//     const upperVariable = 1 + percentVariable;
//     const downVariable = 1 - percentVariable;

//     // Verifica se o Novo Preço é maior que o preço de custo
//     if ( newPrice > (salesPrice * upperVariable) || newPrice < (salesPrice * downVariable) ) {
//         return {
//             status: "error",
//             reason: "Produto teve uma variação maior que 10%",
//             productCode: productCode,
//             newPrice: newPrice,
//             oldPrice: salesPrice
//         }
//         //Verifica se a variação do Novo Preço é maior que 10%
//     } else if (newPrice < costPrice) {
//         return {
//             status: "error",
//             reason: "Preço de venda inferior ao preço de custo",
//             productCode: productCode,
//             newPrice: newPrice,
//             costPrice: costPrice
//         };
//     }

//     return { status: "success", productCode: productCode, newPrice: newPrice };
// }

module.exports = { calculateNewPrice };