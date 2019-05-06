const {app} = require('./app')
const config = require('config')

const port = config.get('serv_port') || '5000'

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, function () {
  console.log("Running app on port " + port)
})