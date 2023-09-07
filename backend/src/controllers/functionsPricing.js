
//Compara o Novo Preço, com o preço de venda atual e o preço de custo

function calculateNewPrice(productCode, newPrice, salesPrice, costPrice) {


    // Percentual máximo de variação do preço 
    let percentVariable = 0.1; // 10 % de variação permitida

    const upperVariable = 1 + percentVariable;
    const downVariable = 1 - percentVariable;

    //Verifica se a variação do Novo Preço é maior que 10%
    if ( newPrice > (salesPrice * upperVariable) || newPrice < (salesPrice * downVariable) ) {
        return {
            status: "error",
            reason: "Produto teve uma variação maior que 10%",
            productCode: productCode,
            newPrice: newPrice,
            oldPrice: salesPrice
        }

    // Verifica se o Novo Preço é maior que o preço de custo
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

function varPricePack(salesPrice, newPrice, productPackQty) {


    // console.log("Sales Price " + salesPrice + "/ New Price " + newPrice + "/ Qty " + productPackQty)

    const priceChangeProduct = Number((newPrice - salesPrice).toPrecision(3));

    const priceChangePacks = Number((priceChangeProduct * productPackQty).toPrecision(3));

    return { priceChangeProduct :  priceChangeProduct,  priceChangePacks : priceChangePacks};
}

module.exports = { calculateNewPrice, varPricePack };