let mongoose = require('mongoose');

const server = '192.168.11.92:27017';
const database = 'chigui'

class Database {
    constructor(){
        this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}

//Aplication singleton pattern
module.exports = new Database()
