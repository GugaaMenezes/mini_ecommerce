import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerDoc = () => {
    return (
        <div className="SwaggerDoc">
            <h1>Documentação da API</h1>
            <SwaggerUI
                url="api/api-docs" // URL da documentação Swagger do servidor Node.js
            />
        </div>
    );
};

export default SwaggerDoc;