<template>
    <div>
        <caster v-bind:socket="this.socket" v-if="isCaster"/>
        <player-lobby v-bind:socket="this.socket" v-else/>
    </div>
</template>

<script>
import caster from '../components/caster.vue'
import playerLobby from '../components/playerLobby.vue'

export default {
    name:'lobby',
    components: {
        caster,
        playerLobby
    },
    data: function() {
        return {
            isChecked: false,
            lastUser: "",
            users: [],
            messages: [],
            socket:""
        }
    },
    computed: {
        isCaster(){
            return this.$route.params.caster==="caster"
        }
    },
    mounted: function (){

        this.socket = this.$io(process.env.VUE_APP_SERVER_PATH, {query:`isCaster=${this.isCaster}`}),

        this.joinServer();
    },
    methods : {

        check () {
            this.isChecked = !this.isChecked;

        },
        
        joinServer : function () {
            // this.socket.on('activate', data => {
            //     this.messages.push(data.message);
            // });
            // this.socket.on('newuserintheroom', data => {
            //     console.log('new user in the room ')
            //     console.log('data : %s', data.lastUser)
            //     this.lastUser = data.lastUser;
            // })
            // this.socket.on('loggedIn', data =>{
            //     this.socket.emit('room', this.$route.params.sessionId)

            //     this.isChecked = data.isActivated;
            //     this.messages = data.messages;
            //     this.users = data.users;

            // })

            // this.listen();
        },
    //     listen: function () {
    //         this.socket.on('userOnline', user => {
    //             this.users.push(user);
    //         });
    //         this.socket.on('userDisconect', user => {
    //             this.users.splice(this.usersindexOf(user), 1);
    //         })
    //     },
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