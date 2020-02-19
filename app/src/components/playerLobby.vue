<template>
    <form class="playerLobby">
        <label for="username">Ton pseudo :</label>
        <input id="username" type="text" v-model="username" placeholder="your name">
        <button @click.prevent="sendUsername()" class="btn success">loggin</button>
    </form>
</template>

<script>
export default {
    name: 'playerLobby',
    props: ['socket'],
    data: function() {
        return {
            username:""
        }
    },
    methods: {
        sendUsername() {
            console.log("add user " + this.username + " : " +  this.$route.params.sessionId)
            this.socket.emit("newUserInRoom", {username: this.username, roomId: this.$route.params.sessionId})
        }
    }
}
</script>

<style lang="scss">

</style>