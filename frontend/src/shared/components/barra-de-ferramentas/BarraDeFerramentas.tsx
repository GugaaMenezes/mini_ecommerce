import { Box, Button, Paper, useTheme } from "@mui/material";


export const BarraDeFerramentas: React.FC = () =>{

    const theme = useTheme();

    return (
        <Box height={theme.spacing(5)} component={Paper}>

            <Button>Novo</Button>
        </Box>
    );
};