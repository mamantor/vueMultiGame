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

    socket.handshake.query.isCaster === "caster" ? addCasterListeners (socket) : addPlayerListeners (socket)
    
    
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
    
})

function addPlayerListeners (socket) {
  socket.on('newUserInRoom', (data) => {
    newUsername = data.username;
    roomID = data.roomId;
    console.log(`${newUsername} joined the lobby`);

    socket.username = newUsername;
    joinRoom(socket, roomID);

    const caster=getCasterSocket(socket);
    if(caster){
      caster.emit('userOnline', socket.username)
    }
    else{
      socket.emit('noCasterForThisRoomFound');
    }
  })

  socket.on("disconnect", () => {
    console.log(`${socket.username} has left the lobby.`);
    const caster=getCasterSocket(socket);
    if(caster){
      caster.emit('userDisconnect', socket.username)
    }
    else{
      socket.emit('noCasterForThisRoomFound');
    }
    users.splice(users.indexOf(socket),1);
  });
}

function addCasterListeners (casterSocket) {

  casterSocket.on('createRoom', roomID => {
    console.log(`room ${roomID} creation`);
    const roomsRef = admin.database().ref(`rooms/${roomID}`);
    roomsRef.child('caster').set({ host: casterSocket.handshake.address, uuid : uuid()})


    rooms.push({id:roomID, caster:casterSocket});
    console.table(rooms)

    joinRoom(casterSocket, roomID)

    

    casterSocket.emit('roomCreated', roomID)
  });
}

function getCasterSocket(socket){
  for (room of rooms) {
    if (room.id === socket.roomID) {
      console.log('room trouvée')
      return room.caster
    }
    
  }
  console.log('no room found');
  return false
}

function joinRoom(socket, roomID){
        // SOCKET SHIT
        socket.join(roomID);
        // SERVER SHIT
        console.log(`roomID ${roomID} on joinroom`);
        
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
    

