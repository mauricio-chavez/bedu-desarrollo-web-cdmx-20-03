const MovieModel = require('../models/Movie');

async function getMovies(req, res) {
  const movies = await MovieModel.find();
  res.json(movies);
}

async function createMovie(req, res) {
  const { name, director, year } = req.body;
  const movie = await MovieModel.create({ name, director, year });
  res.json(movie);
}

async function getMovie(req, res) {
  const { id } = req.params;
  try {
    const movie = await MovieModel.findOne({ _id: id });
    if (!movie) {
      res.json({ error: `Cannot GET movie with ID ${id}` });
    } else {
      res.json(movie);
    }
  } catch {
    res.json({error: 'Invalid ID'});
  }

}

async function updateMovie(req, res) {
  const { id } = req.params;
  const { name, director, year } = req.body;
  await MovieModel.updateOne({ _id: id }, { name, director, year });
  const movie = await MovieModel.find({ _id: id });
  res.json(movie);
}

async function deleteMovie(req, res) {
  const { id } = req.params;
  const movie = await MovieModel.findOne({ _id: id });
  await MovieModel.deleteOne({ _id: id });
  res.json(movie);
}

module.exports = { getMovies, createMovie, getMovie, updateMovie, deleteMovie };
