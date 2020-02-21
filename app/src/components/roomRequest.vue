<template>
    <div>
        <div class="roomNotFound" v-if="roomNotFound">no room found</div>
        <input id="roomID" v-model="roomID" class="btn success" placeholder="ROOM ID">
        <button @click="joinRoom()" class="btn success">Join Room</button>
        
    </div>
</template>

<script>
import uuid from "uuid";

export default {
    name:"roomRequest",
    data: function() {
        return {
            roomID:"",
            roomNotFound: false
        }
    },
    computed: {
        noRoomFound(){
            return this.roomNotFound
        }
    },
    props: ['socket'],
    methods: {
        joinRoom () {
            var roomRef = this.$fb.database.ref(`rooms/${this.roomID}`);
            roomRef.once('value', snapshot => {
                if (snapshot.val()==null) {
                    this.roomNotFound = true
                } else {
                    this.$router.push({ path: `/lobby/${this.roomID}`})
                }
            });

            }
        }
    }

</script>

<style>

</style>