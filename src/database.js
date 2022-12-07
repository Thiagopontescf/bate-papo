const mysql = require('mysql')

const database = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'batepapo'
})

database.connect((err) => {
    if(err) {
        console.log('ocorreu um erro ao se conectar no banco de dados ' + err)
    }else {
        console.log('conectado ao banco de dados com sucesso')
    }
})

module.exports = database
