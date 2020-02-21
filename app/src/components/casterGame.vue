<template>

    <div>
        game playing...
        <SentenceFill/>
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
    components: {
        SentenceFill
    }
}
</script>