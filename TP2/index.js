const http = require('http')
const filestats = require('./lib/filestats')

// Create server
const server = http.createServer((req,res) => {
    
    filestats.getFileStats('.', (error, result) => {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(result))     
    })

})

server.listen(8000)