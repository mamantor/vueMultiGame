<template>
    <VueCountdown @end="$emit('end')" :time=time >
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
    }
}
</script>