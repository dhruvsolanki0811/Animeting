const express = require('express')
const app = express()
const socket= require('socket.io')
const path= require('path')
const port = 3000

const http = require('http');
const formatMessage = require('./utils/message')
const { addUser, getCurrentUser, getroomuser,disconnectUser } = require('./utils/users')
const botname='Admin bot'
// app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static(path.join(__dirname,'client')))
const server= http.createServer(app)

const io= socket(server)

io.on('connect',(socket)=>{
    socket.on('chatJoinRoom',({username,room})=>{
        const user = addUser(socket.id,username,room)
    socket.join(user.room)
    // console.log('New connection ')
    socket.emit('message',formatMessage(botname,'Welcome to the chadt'))

    //Broadcast user disconnects except user everyone gets the message
    socket.broadcast.to(user.room).emit('message',formatMessage(botname,`A ${user.username} has joined`))
        //send room info 
        console.log(user.room)

        io.to(user.room).emit('roomuser',{
            room:user.room,
            roomusers:getroomuser(user.room)
        })

})
  

    socket.on('disconnect',()=>{
        const user=disconnectUser(socket.id)
        if(user){
        console.log(user.room)
        io.to(user.room).emit('message',formatMessage(botname,`${user.username} has left`))
        io.to(user.room).emit('roomuser',{
            room:user.room,
            roomusers:getroomuser(user.room)

        })
    
    }
    

})

    socket.on('chatMessage',(msg)=>{
        const user=getCurrentUser(socket.id)
        io.to(user.room).emit('message',formatMessage(user.username,msg))
    })

   
    
})

server.listen(3000,()=>{console.log("Http server configured")})
