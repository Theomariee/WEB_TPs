const http = require('http')

const server = http.createServer((req,res) => {
    const jsonObject = {
        'test': 'value'
    }

    res.setHeader('Content-Type', 'text/html')
    res.end(JSON.stringify(jsonObject))
})
server.listen(8000)