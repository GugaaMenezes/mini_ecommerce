# Mini Ecommerce

#### Uma pequena ferramenta para atualizar os valores de produtos no banco de dados, através de um arquivo .csv 


### Backend 
- Node.js
### Frontend
- React.js
### Banco de Dados
- Mysql
### Documentação API
- Swagger 

### Dependências

- Node.js (versão v18.16.0)
- React.js (versão v18.2.18)
- npm (versão v9.7.1)
### Como Executar

1. Clone este repositório:

   ```
   git clone https://github.com/GugaaMenezes/mini_ecommerce.git
   ```

2. Crie o banco de dados, utilizando o aquivo abaixo, localizado na raiz do projeto:  

   > *database.sql*
   
3. Navegue até a pasta do backend:

   ```
   cd backend
   ```

4. Instale as dependências do NodeJS:

   ```
   npm install
   ```

5. Navegue até a pasta /src e execute o servidor:

   ```
   cd src
   node server.js
   ```

> *O **NodeJS** está configurado para ser executado no endereço http://127.0.0.1:5000*.


6. Navegue até a pasta do frontend:

   ```
   cd..
   cd..
   cd frontend
   ```

7. Instale as dependências do ReactJS:

   ```
   npm install  
   ```

8. Execute o ReactJS:

   ```
   npm start
   ```

> *O **Frontend** está configurado para ser executado no endereço http://127.0.0.1:3000*.


> *Para acessar o **Swagger**, basta acessar o endereço http://127.0.0.1:5000/api/api-docs/*.

## Referência

 - [Arquivo .csv exemplo](https://github.com/GugaaMenezes/mini_ecommerce/blob/main/atualizacao_preco_exemplo.csv)
 - [Modelo do Banco de Dados](https://github.com/GugaaMenezes/mini_ecommerce/blob/main/database.sql)


## Autores

- Gustavo Menezes - [@gugaamenezes](https://github.com/GugaaMenezes) 


## Funcionalidades

- Temas responsivo
- Retorno dos packs atualizados, produtos atualizados, produtos com erro e produtos não localizados
- Tema escuro


## Documentação

 - Foi utilizado o Swagger para geração automática da documentação

> [!NOTE]
> A aplicação pode ser iniciada com o único comando, na pasta raiz execute

1. Na pasta raiz, instale as dependências:

   ```
   npm install
   ```

2. Execute simuntâneamente o Backend e o Frontend (NodeJS e ReactJS):

   ```
   npm start
   ```
   
> *_Os endereços permanecem os mesmos._*

> [!WARNING]
> Ao executar da forma acima (com único comando), não é possível acessar o endereço da documentação _http://127.0.0.1:5000/api/api-docs/_.
