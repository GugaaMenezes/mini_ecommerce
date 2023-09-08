import React, { useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container} from "@mui/material";
import { getProducts } from "../../services/api";

const initialValues = { 
    code: "",
    name: "",
    cost_price: "",
    sales_price: "",
};

const TabelaProdutos = () => {
    const [products, setProducts] = useState([initialValues]); // Inicialização corrigida

    useEffect(() => {
        getProductsDetails(); // Nome da função corrigido
    }, []);

    const getProductsDetails = async () => {
        try {
            const response = await getProducts();
            console.log(response!.data);
            setProducts(response!.data.products); // Acessar produtos de sucesso corrigido
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box padding={3} marginBottom={10}>
                <Typography variant="h5" margin={3}>
                    Produtos cadastrados
                </Typography>

                {products.length > 0 ? ( 
                    <Box>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Code</TableCell>
                                        <TableCell>Produto</TableCell>
                                        <TableCell>Preço de Custo</TableCell>
                                        <TableCell>Preço de Venda</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{product.code}</TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>R$ {product.cost_price}</TableCell>
                                            <TableCell>R$ {product.sales_price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                ) : (
                    <Typography variant="h6" margin={3}>
                        Sem produtos cadastrados
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default TabelaProdutos;
