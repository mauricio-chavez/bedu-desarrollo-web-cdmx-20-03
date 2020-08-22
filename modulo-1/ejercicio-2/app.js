const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  if (req.url === '/tours') {
    res.write('Hola desde Bedu Travels')
    res.end()
  } else if (req.method === 'GET') {
    fs.readFile('./views/index.html', (err, data) => {
      if (err) {
        res.write('Ha ocurrido un error')
      } else {
        res.write(data)
      }
      res.end()
    })    
  }
})

server.listen(3000, () => {
  console.log('Estamos escuchando en 3000')
})
