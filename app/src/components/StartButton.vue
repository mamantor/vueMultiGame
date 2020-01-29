<template>
    <div>
        <button @click="startRoom()" class="btn success">Start Game</button>
        <button @click="showAbout()" class="btn success">About</button>
        <!-- <router-link to="/lobby">lobby</router-link> -->
        <router-view></router-view>
    </div>
</template>

<script>
import uuid from "uuid";

export default {
    name:"startButton",
    methods: {
        startRoom () {
            const newSessionUuid = uuid();
            const devSessionUuid = newSessionUuid.slice(0,4,1);
            // const devSessionUuid = 
            this.$router.push({ path: `/lobby/${devSessionUuid}` })
        },
        showAbout () {
            this.$router.push({ path: `/about`})
        }
    }
}
</script>

<style>

</style>