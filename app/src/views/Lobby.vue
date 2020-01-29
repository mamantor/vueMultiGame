<template>
    <div class="lobby">
        <h1>Lobby</h1>
        <div>Room ID: {{ $route.params.sessionId}}</div>
        <p class="username">Username: {{ username }}</p>
        <p class="online">Online : {{ users.length }}</p>
        <p class="online">List : {{ users }}</p>
        <p class="online">Last user joined : {{ lastUser }}</p>
        <div @click="check()" class="checker" v-bind:class="{ checkedColor :isChecked }"></div>
        <ChatWindow v-bind:messages="messages"/>
    </div>
</template>

<script>
import io from 'socket.io-client';
import ChatWindow from '../components/ChatWindow.vue'

export default {
    name:'lobby',
    components: {
        ChatWindow
    },
    data: function() {
        return {
            isChecked: false,
            lastUser: "",
            username: "",
            socket : io(process.env.SERVER_PATH),
            users: [],
            messages: []
        }
    },
    mounted: function (){
        this.username=prompt("What is you username ?", "Rihanna");
        if(!this.username){
            this.username = "Rihanna";
        }

        this.joinServer();
    },
    methods : {
        check () {
            this.isChecked = !this.isChecked;
            this.socket.emit('activate', this.isChecked )

        },
        
        joinServer : function () {
            this.socket.on('activate', data => {
                this.messages.push(data.message);
            });
            this.socket.on('newuserintheroom', data => {
                console.log('new user in the room ')
                console.log('data : %s', data.lastUser)
                this.lastUser = data.lastUser;
            })
            this.socket.on('loggedIn', data =>{
                this.isChecked = data.isActivated;
                this.messages = data.messages;
                this.users = data.users;
                this.socket.emit('newuser', this.username)
                this.socket.emit('room', this.$route.params.sessionId)

            })

            this.listen();
        },
        listen: function () {
            this.socket.on('userOnline', user => {
                this.users.push(user);
            });
            this.socket.on('userDisconect', user => {
                this.users.splice(this.usersindexOf(user), 1);
            })
        },
    }
}
</script>

<style>

    .checker {
        width:100px;
        height: 200px;
        background-color: #E63 
    }

    .checkedColor {
        background-color: #A2F
    }

    .roomClass {
        background-color: rgb(97, 190, 35)
    }

</style>