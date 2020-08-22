const { index, static, notFound } = require('./controllers');

function router(req, res) {
  if (req.url === '/') {
    index(req, res);
  } else if (req.url.startsWith('/static')) {
    static(req, res);
  } else {
    notFound(req, res);
  }
}

module.exports = router;
