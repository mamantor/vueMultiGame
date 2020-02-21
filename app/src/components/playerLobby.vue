<template>
    <div>
        <form class="playerLobby" v-show="!ready">
            <label for="username">Ton pseudo :</label>
            <input id="username" type="text" v-model="username" placeholder="your name">
            <button @click.prevent="sendUsername()" class="btn success">loggin</button>
        </form>

        <h3 v-show="ready"> playing... </h3>
    </div>

</template>

<script>
export default {
    name: 'playerLobby',
    props: ['socket'],
    data: function() {
        return {
            username:"",
            ready: false
        }
    },
    methods: {
        sendUsername() {
            console.log("add user " + this.username + " : " +  this.$route.params.sessionId)
            this.socket.emit("newUserInRoom", {username: this.username, roomId: this.$route.params.sessionId})
            this.ready = true
        }
    }
}
</script>

<style lang="scss">

</style>