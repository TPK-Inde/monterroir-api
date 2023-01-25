if (process.env.NODE_ENV == "dev") {require('dotenv').config({path:"./.ENV.dev"});} else {require('dotenv');}
const express = require('express');

console.log("Environnement = " + process.env.NODE_ENV);

//Constantes pour SWAGGER
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Constante de route
const utilisateursRouter = require("./routes/utilisateurs.js");

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

//Configuration Swagger
const optionsSwagger = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de l'application 'Mon Terroir'",
      version: "0.1.0",
      description:
        "Documentation de l'API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(optionsSwagger);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use(express.json());

//Routes API
app.use("/utilisateurs", utilisateursRouter);

module.exports = app;