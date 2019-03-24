const http = require('http')
const fs = require('fs')

// Create server
const server = http.createServer((req,res) => {
    // Sync call to get files in current dir
    const filesInCurrentDir = fs.readdirSync('.')

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(filesInCurrentDir))
})

server.listen(8000)