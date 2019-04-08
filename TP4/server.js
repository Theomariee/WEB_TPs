// Import app module
const {app} = require('./app')

// Run server

/**
 * Listen on provided port, on all network interfaces.
 */
const port = process.env.PORT || '3000'
app.listen(port)