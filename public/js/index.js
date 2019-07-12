var socket = io();

socket.on('connect', function() {
    console.log('Connected to the  server');

    socket.emit('createEmail',{
        to: 'ht@gmail.com',
        text: 'Hello man'
    });

    socket.emit('createMessage',{
        to: 'gtau@gmail.com',
        text:'crete msgs'
    });
});

socket.on('disconnect', function(){
    console.log('Disconnected from the server');
});

socket.on('newEmail', function (email) {
    console.log('New Email',email)
});

socket.on('newMessage', function (msg) {
    console.log('New message', msg);
});