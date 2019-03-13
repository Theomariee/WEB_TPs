const http = require('http')
let nbRequests = 0

const server = http.createServer((req,res) => {
    const jsonObject = {
        'test': 'value',
        'nbRequests': nbRequests
    }

    nbRequests++

    res.setHeader('Content-Type', 'text/html')
    res.end(JSON.stringify(jsonObject))
})

server.listen(8000)