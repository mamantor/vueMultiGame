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


        <div :key="user.uid" v-for="user in this.users"  class="ticket">
            <div class="ticket__content">
                <p class="ticket__text">{{ user }}</p>
            </div>
        </div>
    </div> 
</template>

<script>

export default {
    name: 'casterLobby',
    data: function() {
        return {
        }
    },
    computed: {
        users : function() {
            return this.$store.state.users
        }
    },
    methods: {
        startBtn() {
            this.$emit('startGame')
            this.$socket.emit('startGame')
        },
    },
    created: function (){
        console.log(this.$socket)
        this.$socket.on('userOnline', data => {
            // this.users.push(data)
            this.$store.commit("newUser",data)
        })
        this.$socket.on('userDisconnect', user =>{
            this.$store.commit("newUser",user)

        })
    }
}
</script>

<style lang="scss">
$TICKET_COLOR: #005599;

.ticket {
  position: relative;
  box-sizing: border-box;
  width: 106px;
  height: 150px;
  margin: 50px auto 0;
  padding: 10px;
  border-radius: 8px;
  background: $TICKET_COLOR;
  box-shadow: 2px 2px 15px 0px #333;
  
  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 5px;
    height: 6px;
    width: 96px;
  }
  
  &:before {
    top: -5px;
    background: radial-gradient(circle, transparent, transparent 50%, $TICKET_COLOR 50%, $TICKET_COLOR 100% ) -7px -8px / 16px 16px repeat-x,
  }
  
  &:after {
    bottom: -5px;
    background: radial-gradient(circle, transparent, transparent 50%, $TICKET_COLOR 50%, $TICKET_COLOR 100% ) -7px -2px / 16px 16px repeat-x,
  }
}

.ticket__content {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: 2px dotted #D8D8D8;
}

.ticket__text {
    width: 100px;
    max-width: 120%;
    font-family: 'Helvetica', 'Arial', sans-serif;
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
    -webkit-transform: translate(-25px, 25px) rotate(-55deg);
    transform: translate(-7px, 35px) rotate(-55deg);
    word-break: break-all;
    margin: 10px 0;
    color: white;
}
</style>