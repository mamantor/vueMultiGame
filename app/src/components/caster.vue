<template>
    <div class="caster">
        {{ roomId }}
        <caster-lobby  v-bind:socket="this.socket"/>
    </div>
</template>

<script>
import casterLobby from '../components/casterLobby.vue'

export default {
    name: 'caster',
    props: ['socket'],
    data: function (){
        return{
            roomId: this.$route.params.sessionId
        }
        
    },
    components: {
        casterLobby
    },
    created: function() {
        this.socket.emit("createRoom", this.roomId)
    }
}
</script>