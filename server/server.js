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

    socket.emit('newEmail',{
        from: 'kt@gmail.com',
        text: 'Hi how are you',
        createdAt: 123
    });

    socket.emit('newMessage',{
        from:'kt@gam.com',
        text:'basic emit',
        createdAt: 234
    });

    socket.on('createMessage',(cmsg) => {
        console.log('Created Message', cmsg);
    });

    socket.on('createEmail', (newEmail) => {
        console.log('Create email', newEmail);
    });
    
    socket.on('disconnect', ()=> {
        console.log('User disconnected');
    });

});



server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});