require('dotenv');
import express from 'express';
const db = require("./sequelize/db"); //NE PAS RETIRER, PERMET D'INITIER LA CONNEXION A LA BASE DE DONNEES
//Todo : Trouver un autre moyen d'initier la connexion

//Constantes pour SWAGGER
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Constante de route
const utilisateursRouter = require("./routes/utilisateurs.route.ts");
const vitrinesRouter = require("./routes/vitrines.route.ts");

const app = express();

app.use((req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      }
    ],
    servers: [
      {
        url: "http://localhost:" + process.env.PORT,
      },
    ],
  },
  apis: ["./routes/*.ts", "./schema/*.ts"],
};

const specs = swaggerJsdoc(optionsSwagger);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.get("/api-docs.json", function (req, res) {
  res.status(200).send(specs);
});

app.use(express.json());

//Routes API
app.use("/users", utilisateursRouter);
app.use("/vitrines", vitrinesRouter);

module.exports = app;