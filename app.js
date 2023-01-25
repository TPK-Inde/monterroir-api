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
/* Error handler middleware */


// app.post('/todos', (req, res, next) => {

//   const todo = new sTodo({...req.body});
//   todo.save().then(() => {
//     res.status(201).json({
//       message: 'Todo enregistrée'
//     })
//   }).catch((error) => {
//     res.status(400).json({error})
//   })
// });

// app.delete('/todos/:id', (req, res, next) => {
//   sTodo.deleteOne({ "_id" : req.params.id})
//     .then(res.status(200).json({message: "Todo supprimé"}))
//     .catch((error) => {
//       res.status(400).json({error})
//     })
// })

// app.put('/todos/:id', (req, res, next) => {
//   sTodo.updateOne({ "_id" : req.params.id}, { $set : req.body, "_id" :  req.params.id })
//     .then(res.status(200).json({message: "Todo modifié"}))
//     .catch((error) => {
//       res.status(400).json({error})
//     })
// })

// app.get('/todos', (req, res, next) => {
//   sTodo.find()
//   .then(todos => res.status(200).json(todos))
//   .catch(error => res.status(400).json({error}));

// })

var listeExperiences = [
  {
    "title": "Développeur C#",
    "name": "Alphatex",
    "dateDepart": "01 Octobre 2022",
    "dateFin": "En cours...",
    "text": "Développement en C# et ASP.Net d'application interne",
    "entreprise": "Alphatex",
    "display": true
  },
  {
    "title": "Développeur C#",
    "name": "Alphatex",
    "dateDepart": "01 Octobre 2022",
    "dateFin": "En cours...",
    "text": "Développement en C# et ASP.Net d'application interne",
    "entreprise": "Alphatex",
    "display": true
  },
  {
      "title" : "Développeur DELPHI 6",
      "name" : "GIRPI",
      "dateDepart" : "28 Septembre 2020",
      "dateFin" : "28 septembre 2022",
      "text" : "Développement en Delphi 6 d'un WMS, TMS et d'autres application interne",
      "entreprise" : "GIRPI",
      "display" : true
  }
]

app.get('/experiences', (req, res, next) => {
  res.status(200).json(listeExperiences)
})

module.exports = app;