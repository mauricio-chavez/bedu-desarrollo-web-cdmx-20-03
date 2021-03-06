const fs = require('fs');
const path = require('path');
const datos = require('./datos.json');
const { getImages } = require('./models');

function index(req, res) {
  fs.readFile('./views/index.html', (err, data) => {
    res.write(data);
    res.end();
  });
}

function static(req, res) {
  const filePath = path.join(process.cwd(), req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write('No se encontro el recurso solicitado');
      res.end();
    } else {
      const extensions = {
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.gif': 'image/gif',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
      };

      const ext = path.extname(req.url);
      if (Object.keys(extensions).includes(ext)) {
        res.setHeader('Content-Type', extensions[ext]);
      }

      res.write(data);
      res.end();
    }
  });
}

function dotCom(req, res) {
  res.write(JSON.stringify(datos));
  res.end();
}

function api(req, res) {
  const images = getImages();
  res.write(images);
  res.end();
}

function notFound(req, res) {
  res.writeHead(404);
  res.write('No se encontro el recurso solicitado');
  res.end();
}

module.exports = { index, static, dotCom, api, notFound };
