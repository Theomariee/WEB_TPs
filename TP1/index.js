const http = require('http')
let nbRequests = 0

const server = http.createServer((req,res) => {
    const jsonObject = {
        'test': 'value',
        'nbRequests': nbRequests
    }

    nbRequests++

    res.setHeader('Content-Type', 'text/html')

    const waitTill = new Date(new Date().getTime() + 2 * 1000)
    while(waitTill < new Date()) {null}
    res.end(JSON.stringify(jsonObject))
})

server.listen(8000)