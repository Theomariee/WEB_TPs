let mongoose = require('mongoose')

const server = '127.0.0.1:27017'
const database = 'alerts'

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('Db connection successful')
      })
      .catch((err) => {
        console.error('Db connection error')
      })
  }
}

module.exports = new Database()