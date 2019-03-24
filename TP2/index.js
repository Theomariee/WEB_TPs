const http = require('http')
const fs = require('fs')

// Create server
const server = http.createServer((req,res) => {
    // Sync call to get files in current dir
    const filesInCurrentDir = fs.readdirSync('.')
    const tFilesStats = []

    filesInCurrentDir.forEach(f =>  {
        const currentFile = {
            name: f,
            properties: fs.statSync('./' + f)
        }

        tFilesStats.push(currentFile)
    })

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(tFilesStats))
})

server.listen(8000)