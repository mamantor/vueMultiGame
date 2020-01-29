<template>
  <div class="chat-window">
      <div class="messages">
          <div class="message" v-for="message in messages" :key="message.index" >{{message.username}} a cliqué sur le bouton</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'chatwindow',
    props: ['messages']
}
</script>

<style lang="scss" scoped>
.chat-window {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #a5a5a5;
    box-shadow: 1px 1px 6px 0px rgba(0, 0,0,0.15);

    .messages {
        flex: 1;
        overflow: scoll;

        .message {
            display: flex;
            border-bottom: 1px solid #EFEFEF;
            padding: 10px;

            &:last-of-type {
                border-bottom: none;
            }
        }
    }
}
</style>