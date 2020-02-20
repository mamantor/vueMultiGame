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
        <button @click="startBtn">start</button>

        <h3>{{users.length}} player<template v-if="users.length >> 1">s</template> in the party </h3>

        <div :key="user.uid" v-for="user in this.users" class="user">
            <span>{{ user }}</span>
        </div>
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
    methods: {
        startBtn() {
            this.$emit('startGame')
            this.socket.emit('startGame', this.socket )
        },
    },
    created: function (){
        this.socket.on('userOnline', data => {
            this.users.push(data)
        })
        this.socket.on('userDisconnect', user =>{
            this.users.splice(this.users.indexOf(user), 1)
        })
    }
}
</script>