import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useDrawerContext } from "../shared/contexts";
import { Dashboard, Inicio } from "../pages";



export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                label: "Início",
                icon: "home",
                path: "/",
            },
            {
                label: "Atualizar Preços",
                icon: "$",
                path: "/atualizar-precos",
            }
        ]);
    }, []);
    

    return (
        <Routes>
            <Route path="/" element={< Inicio />} />
            <Route path="/atualizar-precos" element={<Dashboard />} />

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>

    );
};