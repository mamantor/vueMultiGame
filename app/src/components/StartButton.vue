<template>
    <div>
        <button @click="startRoom()" class="btn primary">Start Game</button>
        <button @click="showAbout()" class="btn secondary">About</button>
        <!-- <router-link to="/lobby">lobby</router-link> -->
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
            var roomRef = this.$fb.database.ref(`rooms/${devSessionUuid}`);
            roomRef.once('value', snapshot => {
                if (snapshot.val()==null) {
                    this.$router.push({ path: `/lobby/${devSessionUuid}/caster`})
                } else {
                    this.startRoom()
                }
            });
            
        },
        showAbout () {
            this.$router.push({ path: `/about`})
        }
    }
}
</script>

<style lang="scss">
    .btn{
        padding: 10px 25px;
        text-transform: uppercase;
        font-weight: 500;
        border-radius: 5px;
        border: none;
        box-shadow: none;
        cursor: pointer;

        &.primary{
            color: white;
            background-color: cadetblue;
        }
        &.secondary{
            color: cadetblue;
            background-color: #e2e2e2;
        }

        &:hover, &:focus, &:active{
            transform: scale(1.05);
        }
    }
</style>