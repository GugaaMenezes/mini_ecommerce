import { Box } from "@mui/material";
import { BarraDeFerramentas } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import SwaggerDoc from "../../shared/components/swagger-doc/SwaggerDoc";


export const SwaggerUI = () => {

    return (
        <LayoutBaseDePagina
            titulo="Documentação"
            barraDeFerramentas={(
                <BarraDeFerramentas />
            )}
        >

            <Box>
                <SwaggerDoc />
            </Box>

        </LayoutBaseDePagina>


    );
};