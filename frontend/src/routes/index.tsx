import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useDrawerContext } from "../shared/contexts";
import { Dashboard, Inicio, SwaggerUI } from "../pages";



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
            },
            {
                label: "Documentação",
                icon: "article",
                path: "/api/api-docs",
            }
        ]);
    }, []);
    

    return (
        <Routes>
            <Route path="/" element={< Inicio />} />
            <Route path="/atualizar-precos" element={<Dashboard />} />
            <Route path="/api/api-docs" element={<SwaggerUI />} />
            
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>

    );
};