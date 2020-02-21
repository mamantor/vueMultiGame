<template>

    <div>
        fill this sentence
        <countdown :time="2*1000" @end="endGame"/>
    </div>
</template>


<script>
import countdown from './countdown.vue'


export default {
    name: 'sentenceFill',
    data: function (){
        return{

        }
    },
    components: {
        countdown
    },
    methods: {
        endGame() {
            console.log('this game is over man')
            
        }
    }
}
</script>