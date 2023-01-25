require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

//Constante de route
const utilisateursRouter = require("./routes/utilisateurs.js");

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
  });

app.use(express.json());

app.use("/utilisateurs", utilisateursRouter);

module.exports = app;