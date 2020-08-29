const { moviesGet, moviesPost, notFound } = require('./controllers');

// Maneja las rutas y se las delega a un controlador
function router(req, res) {
  switch (req.url) {
    case '/movies':
      if (req.method === 'GET') {
        // Controlador para listar películas
        moviesGet(req, res);
      } else if (req.method === 'POST') {
        // Controlador para crear películas
        moviesPost(req, res)
      } else {
        notFound(req, res);
      }
      // Poner el controlador de movies
      break;
    default:
      notFound(req, res);
  }
}

module.exports = router;
