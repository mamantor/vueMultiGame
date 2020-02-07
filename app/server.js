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

http.listen(process.env.LISTENING_PORT || 3000, () => {
    console.log("listening on port %s", process.env.LISTENING_PORT || 3000 )
})

// roomsRef.on("value", function(snapshot) {
//   console.log(snapshot.val());
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

io.on("connection", socket =>{
    console.log(socket.handshake.query.isCaster);
    socket.handshake.query.isCaster ? addCasterListeners (socket) : addPlayerListeners (socket)
    
    
    // socket.emit('loggedIn', {
    //     users: users.map(s => s.username),
    //     messages : messages,
    //     isActivated : isActivated
    // });
    // socket.on('newuser', username => {
    //     console.log(`${username} joined the lobby`);
    //     socket.username = username;
    //     users.push(socket);
    //     io.to(socket.room).emit('userOnline', socket.username)
    // });
    socket.on("disconnect", () => {
      console.log(`${socket.username} has left the lobby.`);
      io.to(socket.room).emit("userDisconnect", socket.username);
      users.splice(users.indexOf(socket),1);
  });
})

function addPlayerListeners (socket) {

  socket.on('newUserInRoom', (newUsername, roomID) => {
    console.log(`${username} joined the lobby`);
        socket.username = username;
        joinRoom(socket, roomID);
        socket.caster=getCasterSocket(socket);
        io.to(socket.room.caster).emit('userOnline', socket.username)
  })
}

function addCasterListeners (casterSocket) {

  casterSocket.on('createRoom', roomID => {
    console.log(`room ${roomID} creation`);
    const roomsRef = admin.database().ref(`rooms/${roomID}`);
    roomsRef.child('caster').set({ host: casterSocket.handshake.address, uuid : uuid()})

    joinRoom(casterSocket, roomID)

    rooms.push({roomID:roomID, caster:casterSocket});

    casterSocket.emit('roomCreated', roomID)
  });
}

function getCasterSocket(socket){
  for (room in rooms) {
    if (room.roomID === socket.roomID) {
      return room.caster
    }
    
  }
  return ''
}

function joinRoom(socket, roomID){
        // SOCKET SHIT
        socket.join(roomID);
        // SERVER SHIT
        socket.roomID = roomID;
}
    // socket.on('room', room => {

    //     console.log('room request');
    //     // FIREBASE SHIT
    //     const roomRef = admin.database().ref(`rooms/`+room);
    //     var newUserRef = roomRef.child('users').push({ username: 'test', uuid : uuid()})
    //     console.log(newUserRef.toString())

    //     // SOCKET SHIT
    //     socket.join(room);

    //     // SERVER SHIT
    //     rooms.push(room);
    //     socket.room = room;
    //     socket.ref = newUserRef.toString()

    //     io.to(room).emit('newuserintheroom', {lastUser:socket.username})
        
    // })

    // socket.on('activate', newActivated => {
    //     isActivated = newActivated
    //     let message = {
    //         index : index,
    //         username: socket.username,
    //     }

    //     messages.push(message);

    //     io.to(socket.room).emit('activate', {isActivated, message})

    //     index++;
    // })

    //Disconnect
    

