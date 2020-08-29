const express = require('express'); // Dependencia de Express
const mongoose = require('mongoose'); // Dependencia de Mongoose
const bodyParser = require('body-parser'); // Dependencia de Body Parser
const movieRouter = require('./routes/movies');

require('dotenv').config();

const app = express(); // Creamos la aplicación de Express
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Routes
app.use('/movies', movieRouter);

// Escuchamos peticiones
app.listen(port, () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(`Listening on http://localhost:${port}/`);
    })
    .catch(() => {
      console.error('An error ocurred while connecting to database...');
      process.exit(1);
    });
});
