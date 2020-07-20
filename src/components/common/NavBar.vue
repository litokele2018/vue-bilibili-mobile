<template>
  <div class="nav-bar">
    <div class="logo">
      <img
        alt="logo"
        src="../../assets/logo.png"
      />
    </div>
    <div class="search">
      <van-icon name="search" />
      <span>请输入内容</span>
    </div>
    <div class="avatar">
      <img
        alt="avatar"
        src="../../assets/head_img.jpg"
      />
      <div>下载App</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nav-bar {
  height: 13.889vw;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    img {
      width: 25vw;
    }
  }
  .search {
    flex: 1;
    margin: 0 2.778vw;
    padding: 0.833vw 2.222vw;
    border-radius: 6.944vw;
    background-color: rgb(244, 244, 244);
    color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      flex: 1;
      font-size: 3.333vw;
      margin-left: 2.778vw;
    }
  }
  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 6.667vw;
      height: 6.667vw;
      border-radius: 50%;
    }
    div {
      background-color: rgb(251, 114, 153);
      color: white;
      line-height: 6.667vw;
      margin: 0 2vw;
      padding: 0.833vw 2.778vw;
      font-size: 3vw;
      border-radius: 1.389vw;
    }
  }
}
</style>