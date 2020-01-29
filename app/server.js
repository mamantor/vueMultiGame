const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let isActivated = false;
let users = [];
let messages = [];
let index = 0;
let rooms = [];

io.on("connection", socket =>{
    socket.emit('loggedIn', {
        users: users.map(s => s.username),
        messages : messages,
        isActivated : isActivated
    });
    socket.on('newuser', username => {
        console.log(`${username} joined the lobby`);
        socket.username = username;
        users.push(socket);

        io.to(socket.room).emit('userOnline', socket.username)
    });
    socket.on('room', room => {
        console.log('room =%s',room);
        rooms.push(room);
        socket.join(room);
        socket.room = room;
        io.to(room).emit('newuserintheroom', {lastUser:socket.username})
    })

    socket.on('activate', newActivated => {
        isActivated = newActivated
        let message = {
            index : index,
            username: socket.username,
        }

        messages.push(message);

        io.to(socket.room).emit('activate', {isActivated, message})

        index++;
    })

    //Disconnect
    socket.on("disconnect", () => {
        console.log(`${socket.username} has left the lobby.`);
        io.to(socket.room).emit("userDisconnect", socket.username);
        users.splice(users.indexOf(socket),1);
    });

}) 

http.listen(process.env.LISTENING_PORT || 3000, () => {
    console.log("listening on port %s", process.env.LISTENING_PORT || 3000 )
})