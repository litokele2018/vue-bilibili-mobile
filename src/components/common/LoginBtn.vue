<template>
  <div id="container">
    <div class="btn">{{content}}</div>
  </div>
</template>

<script>
export default {
  props: ["content"]
};
</script>

<style lang="less" scoped>
#container {
  padding: 2.778vw;
  .btn {
    height: 13.889vw;
    border-radius: 6.25vw;
    color: white;
    background-color: #ff9db5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>