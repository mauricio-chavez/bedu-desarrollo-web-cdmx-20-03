// Modelos son los encargados de conseguir los datos

// Importamos la base de datos
const openDB = require('./database');

async function getMovies() {
  // Abrimos la base de datos
  const db = await openDB();
  // Obtenemos todos los registros de la tabla "movies"
  const movies = await db.all('SELECT * FROM movies');

  await db.close();

  // Devolvemos las películas
  return movies;
}

async function createMovie(name, director) {
  // Generamos el objeto a mandar a el arreglo
  const db = await openDB();
  
  // Se usan signos de interrogación para prevenir SQL Injection
  await db.run('INSERT INTO movies VALUES(?, ?)', name, director)
  await db.close();
}

module.exports = { getMovies, createMovie };
