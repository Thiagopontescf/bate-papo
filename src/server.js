const express = require('express')
const http = require('http')
const {Server} = require('socket.io')

const database = require('./database')
const app = express()
const server = http.createServer(app)
const io = new Server(server)


app.use(express.static(__dirname + '/static'))

app.get('/',(req,res) => {
    res.sendFile(__dirname + './static/index.html')
})

io.on('connection',(socket) => {
    console.log('usuario conectado' + socket.id)
        database.query("select * from mensagens",(err,result) => {
            if(err) {
                console.log(err)
            }else {
                io.emit("prevMessage",result)
            }
        })
    
    socket.on('sendMessage',(message) => {
        console.log(message)
        database.query(`INSERT INTO mensagens(nome,mensagem,de,para) VALUES('${message.nome}','${message.message}','${message.nome}','${message.para}')`,(err,result) => {
            if(err) {
                console.log('ocorreu um erro ao enviar mensagem ' + err)
            }else {
                console.log(result)
            }
        })
        io.emit('sendMessage',message)
    })
    

})



server.listen(8080,() => {
    console.log('servidor rodando')
})



