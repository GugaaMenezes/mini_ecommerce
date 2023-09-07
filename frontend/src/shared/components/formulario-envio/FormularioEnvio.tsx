import React, { useState, ChangeEvent, FormEvent } from "react";
import { updatePricing } from "../../services/api";
import {
    Box,
    FormControl,
    Input,
    Button,
    Snackbar,
    Alert,
    SnackbarOrigin,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

interface State extends SnackbarOrigin {
    open: boolean;
    mensagem: string;
    severity: "success" | "error" | "warning" | "info";
    responseData: {
        message: string;
        productsSuccess: Array<{ productCode: number; newPrice: number }>;
        packsUpdated: Array<{ status: string; productPackId: number; productCode: number }>;
        notFound: Array<{ status: string; reason: string }>;
        productsError: Array<{ status: string; reason: string; productCode: number; newPrice: number; oldPrice: number }>;
    } | null;
}

const FormularioEnvio = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const [state, setState] = useState<State>({
        open: false,
        vertical: "top",
        horizontal: "center",
        mensagem: "",
        severity: "error",
        responseData: null,
    });
    const { vertical, horizontal, open, mensagem, severity, responseData } = state;

    const handleClick = (newState: SnackbarOrigin & {
        mensagem: string;
        severity: "success" | "error" | "warning" | "info";
        responseData: State["responseData"];
    }) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!file) {
            alert("Por favor, selecione um arquivo CSV.");
            return;
        }

        const formData = new FormData();
        formData.append("pricingFile", file);

        try {
            const response = await updatePricing(formData);
            if (response && response.data) {
                console.log("Resposta do servidor:", response.data);

                // Chame handleClick com as coordenadas corretas, mensagens e dados do servidor
                handleClick({
                    vertical: "top",
                    horizontal: "center",
                    mensagem: "Arquivo enviado com sucesso!",
                    severity: "success",
                    responseData: response.data,
                })();
            }
        } catch (error) {
            console.error("Erro ao enviar arquivo:", error);

            // Chame handleClick com as coordenadas corretas e mensagens de erro
            handleClick({
                vertical: "top",
                horizontal: "center",
                mensagem: "Erro ao enviar o arquivo.",
                severity: "error",
                responseData: null,
            })();
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <Input
                        type="file"
                        name="pricingFile"
                        id="pricingFile"
                        onChange={handleFileChange}
                    />
                </FormControl>
                <FormControl>
                    <Button type="submit">
                        Enviar
                    </Button>
                </FormControl>
            </form>

            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                    {mensagem}
                </Alert>
            </Snackbar>

            {responseData && responseData.productsSuccess.length > 0 && (
                <div>
                    <h2>Produtos com Sucesso:</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produto</TableCell>
                                    <TableCell>Novo Preço</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {responseData.productsSuccess.map((product: { productCode: number; newPrice: number }, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.productCode}</TableCell>
                                        <TableCell>{product.newPrice}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            {responseData && responseData.packsUpdated.length > 0 && (
                <div>
                    <h2>Packs Atualizados:</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id Pack</TableCell>
                                    <TableCell>Id Produto</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {responseData.packsUpdated.map((product: { productPackId: number; productCode: number }, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.productPackId}</TableCell>
                                        <TableCell>{product.productCode}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            {responseData && responseData.notFound.length > 0 && (
                <div>
                    <h2>Produtos não atualizados</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produto</TableCell>
                                    <TableCell>Preço Antigo</TableCell>
                                    <TableCell>Novo Preço</TableCell>
                                    <TableCell>Motivo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {responseData.productsError.map((product: { productCode: number; oldPrice: number; newPrice: number; reason: string }, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.productCode}</TableCell>
                                        <TableCell>{product.oldPrice}</TableCell>
                                        <TableCell>{product.newPrice}</TableCell>
                                        <TableCell>{product.reason}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            {responseData && responseData.productsError.length > 0 && (
                <div>
                    <h2>Produtos não encontrados:</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produto</TableCell>
                                    <TableCell>Preço Antigo</TableCell>
                                    <TableCell>Novo Preço</TableCell>
                                    <TableCell>Motivo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {responseData.productsError.map((product: { productCode: number; oldPrice: number; newPrice: number; reason: string }, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{product.productCode}</TableCell>
                                        <TableCell>{product.oldPrice}</TableCell>
                                        <TableCell>{product.newPrice}</TableCell>
                                        <TableCell>{product.reason}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </Box>
    );
};

export default FormularioEnvio;