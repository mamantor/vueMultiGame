<template>
    <VueCountdown ref="VueCountdown" @end="$emit('end')" :time=time >
        <template slot-scope="props">{{ props.seconds }}</template>
    </VueCountdown>

</template>


<script>
import VueCountdown from '@chenfengyuan/vue-countdown';

export default {
    name: 'countdown',
    props: ['time'],
    components: {
        VueCountdown
    },
    methods: {
        abort: function(){
            this.$refs.VueCountdown.abort();
        },
        start: function(){
            this.$refs.VueCountdown.start();
        }
    }
}
</script>