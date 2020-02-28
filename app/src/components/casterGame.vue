<template>

    <div>
        game playing... {{allUsersAnswered}}
        <SentenceFill :allUserAnswered="allUsersAnswered"/>
    </div>
</template>


<script>
import SentenceFill from './gameComponents/sentenceFill.vue'

export default {

    name: 'casterGame',
    data: function (){
        return{

        }
        
    },
    computed: {
        allUsersAnswered: function() {
            return (this.$store.state.users.length == this.$store.state.answerCount)
        }
    },
    components: {
        SentenceFill
    },
    created: function() {
        this.$socket.on("userAnswer", data => {
            console.log(data)
            this.$store.commit("userAnswer", data)
        })
    }
}
</script>