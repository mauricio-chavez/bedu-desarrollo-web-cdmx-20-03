// Importar módulos y bibliotecas
const http = require('http'); // HTTP tiene las utilidades correspondientes a HTTP
const router = require('./router'); // Importar nuestro enrutador
const openDB = require('./database');

// Crear el servidor que recibe el callback donde le
// decimos cómo manejar las peticiones
const server = http.createServer(router);

openDB().then(async db => {
  await db.exec(
    'CREATE TABLE IF NOT EXISTS movies(name VARCHAR(255), director VARCHAR(255))'
  );

  db.close();
});

// Escuchar a las peticiones
server.listen(3000, () => {
  console.log('Listening on http://localhost:3000/');
});
