const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const { Socket } = require("dgram");
const { log } = require("console");

const app = express();
const port=4100 || process.env.PORT;

const users=[{}];

app.use(cors());

app.get("/", (req,res)=>{
    res.send("It's working properly")
})

const server= http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New connection");

    socket.on('joined', ({user})=>{
        users[socket.id] = users;
        console.log(`${user} has joined`);
        socket.broadcast.emit('userJoined',{user:"Admin", message:`${users[socket.id]} has joined`});
        socket.emit('welcome',{user:"Admin", message:`Welcome to the chat, ${users[socket.id]}`})

    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id})
    })

    socket.on('disconnected',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`})
        console.log('User left');
    })
})

server.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})