<template>
  <div id="top-bar">
    <div></div>
    <div>{{title}}</div>
    <div
      @click="handleChange"
      class="change"
    >{{to === '/login'? '切换登陆界面': '切换注册界面'}}</div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  props: ["title", "to"],
  methods: {
    handleChange() {
      this.$router.replace(this.to);
    }
  }
};
</script>

<style lang="less">
#top-bar {
  display: flex;
  height: 13.889vw;
  background-color: #fff;
  div {
    flex: 1;
    font-size: 4.444vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .change {
    font-size: 3.333vw;
  }
}
</style>