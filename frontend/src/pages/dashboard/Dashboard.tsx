import { Box } from "@mui/material";
import { BarraDeFerramentas } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import FormularioEnvio from "../../shared/components/formulario-envio/FormularioEnvio";


export const Dashboard = () => {

    return (
        <LayoutBaseDePagina
            titulo="Atualizar Preço dos Produtos"
            barraDeFerramentas={(
                <BarraDeFerramentas />
            )}
        >

            <Box>
                <FormularioEnvio />

            </Box>

        </LayoutBaseDePagina>


    );
};