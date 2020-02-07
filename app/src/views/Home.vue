<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div v-if="isMobile()">
      this is mobile
      <roomRequest />
    </div>
    <div v-else>
      this is desktop
      <StartButton />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StartButton from '../components/StartButton.vue'
import roomRequest from '../components/roomRequest.vue'


export default {
 name: "home",
 components: {
   StartButton,
   roomRequest
 },
 methods: {
 isMobile() {
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     return true
   } else {
     return false
   }
 }
}

};
</script>
