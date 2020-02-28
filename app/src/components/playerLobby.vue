<template>
    <div>
        <form class="playerLobby" v-show="!ready">
            <label for="username">Ton pseudo :</label>
            <input id="username" type="text" v-model="username" placeholder="your name">
            <button @click.prevent="sendUsername()" class="btn success">loggin</button>
        </form>

        <h3 v-show="idle"> wait for game to continue </h3>
        <div v-show="playing">
            Vas y balance ta meilleure punchline !
            <form class="playerLobby">
                <input id="answer" type="text" v-model="answer">
                <button @click.prevent="sendAnswer()" class="btn success">Send</button>
            </form>
        </div>
        <h3 v-show="scoring">look at the caster ! scoring phase !</h3> 

    </div>

</template>

<script>
export default {
    name: 'playerLobby',
    data: function() {
        return {
            username:"",
            answer:"",
            ready: false
        }
    },
    created: function(){
        this.$socket.on('scoring', ()=> {
            console.log("j'ai recu scoring")
            this.$store.commit('gameState', 'scoring')

        }),
        this.$socket.on('playing', ()=> {
            console.log("j'ai recu playing")
            this.$store.commit('gameState', 'playing')

        })
    },
    computed: {
        scoring() {
            return this.$store.state.gameState.scoring;
        },
        playing() {
            return this.$store.state.gameState.playing;
        },
        idle() {
            return this.$store.state.gameState.idle;
        }
    },
    methods: {
        sendUsername() {
            console.log("add user " + this.username + " : " +  this.$route.params.sessionId)
            this.$socket.emit("newUserInRoom", {username: this.username, roomId: this.$route.params.sessionId})
            this.ready = true
        },
        sendAnswer() {
            console.log("send answer " + this.answer)
            this.$socket.emit("userAnswer", this.answer)
            this.$store.commit('gameState', 'idle')

        }
    }
}
</script>

<style lang="scss">

</style>