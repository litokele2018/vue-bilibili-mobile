<template>
  <div class="detail">
    <div :key="index" @click="handleClick(item._id || data._id)" v-for="(data, index) in item.list">
      <img :alt="data.name" :src="data.img" />
      <p>{{data.name}}</p>
      <div class="container">
        <div class="count">
          <van-icon name="video-o" />
          <span>163.4万</span>
        </div>
        <div class="danmu">
          <van-icon name="comment-o" />
          <span>5067</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    handleClick(id) {
      if (this.$route.params.id === String(id)) return;
      this.$router.push(`/article/${id}`);
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1.389vw 2.778vw;
  div {
    position: relative;
    width: 48%;
    img {
      width: 100%;
      height: 27.778vw;
      border-radius: 1.389vw;
    }
    p {
      margin: 0;
      padding: 0;
      font-size: 3.333vw;
      color: #777;
    }
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      font-size: 3.611vw;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.4);
      top: 23.611vw;
      color: white;
      .count {
        display: flex;
        align-items: center;
      }
      .danmu {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>