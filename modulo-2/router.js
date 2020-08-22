const { index, static, dotCom, api, notFound } = require('./controllers');

function router(req, res) {
  if (req.url === '/') {
    index(req, res);
  } else if (req.url.startsWith('/static')) {
    static(req, res);
  } else if (req.url.includes('.com')) {
    dotCom(req, res);
  } else if (req.url === '/api') {
    api(req, res);
  } else {
    notFound(req, res);
  }
}

module.exports = router;
