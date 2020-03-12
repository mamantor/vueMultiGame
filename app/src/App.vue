<template>
  <div id="app">
    <div id="nav">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import StartButton from './components/StartButton.vue'




export default {
  name : 'app',
  components : {
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.btn{
    padding: 10px 25px;
    text-transform: uppercase;
    font-weight: 500;
    border-radius: 5px;
    border: none;
    box-shadow: none;
    cursor: pointer;

    &.primary{
        color: white;
        background-color: cadetblue;
    }
    &.secondary{
        color: cadetblue;
        background-color: #e2e2e2;
    }

    &:hover, &:focus, &:active{
        transform: scale(1.05);
    }
}
</style>
