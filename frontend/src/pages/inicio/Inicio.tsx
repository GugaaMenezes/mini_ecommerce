import { Box } from "@mui/material";
import { BarraDeFerramentas } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import Tabela from "../../shared/components/tabela-produtos/TabelaProdutos";


export const Inicio = () => {

    return (
        <LayoutBaseDePagina
            titulo="Página principal"
            barraDeFerramentas={(
                <BarraDeFerramentas />
            )}
        >

            <Box>
                <Tabela />

            </Box>

        </LayoutBaseDePagina>


    );
};