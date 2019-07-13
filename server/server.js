const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
 

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

    socket.on('createMessage',(cmsg,callback) => {
        console.log('Created Message', cmsg); 
        io.emit('newMessage',generateMessage(cmsg.from,cmsg.text));
        callback('This is from the server');

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