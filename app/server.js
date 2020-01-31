const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const admin = require("firebase-admin");
require('dotenv').config();

const uuid = require("uuid");


let isActivated = false;
let users = [];
let messages = [];
let index = 0;
let rooms = [];

var serviceAccount = require(process.env.FIREBASE_KEY);

admin.initializeApp({
    name: "server",
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vuemultigame.firebaseio.com"
  });

var roomsRef = admin.database().ref("content/44f6e");

roomsRef.on("value", function(snapshot) {
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

roomsRef.set({tg:"dffdfdz", titi:"test2"})

roomsRef.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

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
        rooms.push(room);
        socket.join(room);
        socket.room = room;
        const roomRef = admin.database().ref(`rooms/`+room);
        var newUserRef = roomRef.child('users').push({username: socket.username, uuid : uuid()})
        console.log(newUserRef.toString())
        socket.ref = newUserRef.toString()
        // roomRef.set({user:[socket.username]})


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