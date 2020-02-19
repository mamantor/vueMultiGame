<template>
    <div class="casterLobby">
        <h1>Lobby</h1>
        <div>Room ID: {{ $route.params.sessionId}}</div>
        <div>Room ID: {{ $route.params.caster}}</div>
        <!-- <p class="username">Username: {{ username }}</p>
        <p class="online">Online : {{ users.length }}</p>
        <p class="online">List : {{ users }}</p>
        <p class="online">Last user joined : {{ lastUser }}</p>
        <div @click="check()" class="checker" v-bind:class="{ checkedColor :isChecked }"></div>
        <ChatWindow v-bind:messages="messages"/> -->
        <h3>Is players ready ?</h3>
        <button @click="startGame()"></button>
    </div> 
</template>

<script>

export default {
    name: 'casterLobby',
    props: ['socket'],
    data: function() {
        return {
            users: []
        }
    },
    computed: {
        startgame: function() {
            return this.socket.emit('startGame', this.socket )
        },
    },
    created: function (){
        this.socket.on('userOnline', data => {
            // TODO : this not working (try nextick)
               console.log("on connect : " + data);
            })
    }
}
</script>