<template>
    <div>
        <caster v-if="caster==='caster'"/>
        <player-lobby v-else/>
    </div>
</template>

<script>
import caster from '../components/caster.vue'
import playerLobby from '../components/playerLobby.vue'
import Vue from "vue"

export default {
    name:'lobby',
    components: {
        caster,
        playerLobby,
    },
    data: function() {
        return {
            isChecked: false,
            lastUser: "",
            users: [],
            messages: [],
            
        }
    },
    computed: {
        caster: function() {
            return this.$route.params.caster ? "caster" : "player"
        }
    },
    created: function (){
        const caster = this.isCaster
        const socket =  this.$io(process.env.VUE_APP_SERVER_PATH, {query: { isCaster: this.caster}})
        Object.defineProperty(Vue.prototype, '$socket', { value: socket });
        this.$store.commit("socketStore", socket);
    }
}
</script>

<style>

    .checker {
        width:100px;
        height: 200px;
        background-color: #E63 
    }

    .checkedColor {
        background-color: #A2F
    }

    .roomClass {
        background-color: rgb(97, 190, 35)
    }

</style>