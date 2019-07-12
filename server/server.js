const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
 

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage',{
            from: 'Admin',
            text: 'welcome to the chat app',
            createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
            from: 'admin',
            text: 'new user joined',
            createdAt: new Date().getTime()
    });

    socket.on('createMessage',(cmsg) => {
        console.log('Created Message', cmsg); 
        io.emit('newMessage',{
            from: cmsg.from,
            text: cmsg.text,
            createdAt: new Date().getTime()
        });

        // Broadcasting
        // socket.broadcast.emit('newMessage', {
        //     from: cmsg.from,
        //     text: cmsg.text,
        //     createdAt: new Date().getTime()
        // });
    });
    
    socket.on('disconnect', ()=> {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});