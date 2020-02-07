<template>
    <form class="playerLobby">
        <label for="username">Ton pseudo :</label>
        <input id="username" type="text" v-model="username" placeholder="your name">
        <button @click="sendUsername()" class="btn success">loggin</button>
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
            this.socket.emit("newUserInRoom", this.username)
        }
    }
}
</script>

<style lang="scss">

</style>