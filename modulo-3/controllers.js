const model = require('./models');

async function moviesGet(req, res) {
  // Traemos los datos de las películas desde el modelo
  const movies = await model.getMovies();
  const moviesJSON = JSON.stringify(movies);
  res.write(moviesJSON);
  res.end();
}

async function moviesPost(req, res) {
  const { name, director } = req.headers;

  await model.createMovie(name, director);

  const movie = {
    name: name,
    director: director,
  };

  const response = JSON.stringify(movie)

  res.write(response);
  res.end();
}

// Controlador de 404
function notFound(req, res) {
  // Como nuestra API espera un JSON, vamos a escribir
  // la respuesta como un objeto de JavaScript
  const response = {
    error: 'Nothing to do here!',
    method: req.method,
  };
  // Devolvemos de status 404 (No se encontró el recurso solicitado)
  res.writeHead(404);
  // Convertir el objeto de JavaScript a texto (JSON)
  res.write(JSON.stringify(response));
  res.end();
}

module.exports = { moviesGet, moviesPost, notFound };
