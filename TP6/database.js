const mongoose = require('mongoose')
const config = require('config')

const server = config.get('serv_host') || '127.0.0.1'
const database = config.get('db_name') || 'alerts'

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