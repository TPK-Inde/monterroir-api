require('dotenv');
import bodyParser = require("body-parser");
import express from 'express';
import {connectToMongo} from './mongo/db'

//Constantes pour SWAGGER
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Constante de route
const utilisateursRouter = require("./routes/utilisateurs.route.ts");
const vitrinesRouter = require("./routes/vitrines.route.ts");
const categoriesVitrineRouter = require("./routes/categorieVitrine.route.ts");
const commentsRouter = require("./routes/comments.route.ts");
const productsRouter = require("./routes/products.route.ts");
const ratesRouter = require("./routes/rates.route.ts");
const orderHeaderRouter = require("./routes/orderheader.route.ts");
const orderLineRouter = require("./routes/orderLine.route");
const conversationRouter = require("./routes/conversation.route");
const messageRouter = require("./routes/message.route");

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
        url: process.env.URL_API + ":" + process.env.PORT,
      },
    ],
  },
  apis: ["./routes/*.ts", "./schema/*.ts"],
};

const specs = swaggerJsdoc(optionsSwagger);

//En cas d'appel sur la racine de l'URL, en renvoi vers la doc SWAGGER
app.get("/", function (req, res) {
  res.redirect("/api-docs");
})

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.get("/api-docs.json", function (req, res) {
  res.status(200).send(specs);
});

connectToMongo();


app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.json());

//Routes API
app.use("/users", utilisateursRouter);
app.use("/vitrines", vitrinesRouter);
app.use("/comments", commentsRouter);
app.use("/products", productsRouter);
app.use("/rates", ratesRouter);
app.use("/orderheader", orderHeaderRouter);
app.use("/orderline", orderLineRouter);
app.use("/categoriesVitrine", categoriesVitrineRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);

module.exports = app;