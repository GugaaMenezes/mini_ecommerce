import React, { useState, ChangeEvent, FormEvent } from "react";
import { updatePricing } from "../../services/api";
import { Box, FormControl, Input, Button } from "@mui/material";

function FormularioEnvio() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
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
                // Faça algo com a resposta, se necessário
            }
        } catch (error) {
            console.error("Erro ao enviar arquivo:", error);
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}> {/* Envolver todo o formulário com <form> */}
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
        </Box>
    );
}

export default FormularioEnvio;
