<template>
    <div class="caster">
        {{ roomId }}
        <caster-lobby 
            v-show="!started" 
            v-on:startGame="start" 
        ></caster-lobby>

        <caster-game v-if="started"></caster-game>
    </div>
</template>

<script>
import casterLobby from '../components/casterLobby.vue'
import casterGame from '../components/casterGame.vue'

export default {
    name: 'caster',
    data: function (){
        return{
            roomId: this.$route.params.sessionId,
            started: false
        }
        
    },
    methods: {
        start(){
            console.log('start')
            this.started = true
        }
    },
    components: {
        casterLobby,
        casterGame
    },
    created: function() {
        
        this.$socket.emit("createRoom", this.roomId)
    }
}
</script>