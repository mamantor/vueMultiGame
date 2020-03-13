<template>
  <div id="app">
      <router-view></router-view>
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

<style lang="scss">
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
.full-with-container{
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-position: center;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.msgbox{
  position: fixed;
  z-index: 10;
  box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.15);
  width: 80%;
  padding: 2vh 2vw;
  transition: 0.5s;
  border-radius: 0 0 5px 5px;
  top:0;
  left:50%;
  transform: translate(-50%, -100%);
  background: lightgrey;
  color: black;
  font-size: 16px;
  animation: apearTop forwards ease-out 8s;
  font-weight: 500;

  &.error{
    color: white;
    background-color: red;
  }

  &.succes{
    color: white;
    background-color: red;
  }

}

@keyframes apearTop{
  0% {
      left:50%;
      transform: translate(-50%, -101%);
  }
  5% {
      transform: translate(-50%, 3%);
  }
  6% {
      transform: translate(-50%, -1%);
  }
  7% {
      transform: translate(-50%, 2%);
  }
  9% {
      transform: translate(-50%, 0%);
  }
  94%{
    transform: translate(-50%, 0%);
  }
  96%{
    transform: translate(-50%, 3%);
  }
  100%{
    transform: translate(-50%, -100%);
  }
}

</style>
