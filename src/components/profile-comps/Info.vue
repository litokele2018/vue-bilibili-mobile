<template>
  <div
    class="info"
    v-if="data"
  >
    <div class="banner">
      <img
        alt="banner"
        src="../../assets/bannerTop_new.png"
      />
    </div>
    <div class="avatar-card">
      <div class="title-info">
        <img
          :src="data.user_img"
          alt="avatar"
          v-if=" data.user_img"
        />
        <img
          alt="avatar"
          src="../../assets/head_img.jpg"
          v-else
        />
        <div class="detail">
          <div class="nums">
            <div class="fans">
              <div>0</div>
              <div>粉丝</div>
            </div>
            <div class="line"></div>
            <div class="watch">
              <div>54</div>
              <div>关注</div>
            </div>
            <div class="line"></div>
            <div class="great">
              <div>0</div>
              <div>获赞</div>
            </div>
          </div>
          <div class="edit" @click="$router.push('/edit')">编辑资料</div>
        </div>
      </div>
      <div class="other-info">
        <div>{{data.username}}</div>
        <div>{{data.user_desc? data.user_desc: 'nothing'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  props: ["data"]
};
</script>

<style lang="less" scoped>
.info {
  .banner {
    margin-bottom: 1.389vw;
    img {
      height: 25.278vw;
      width: 100%;
    }
  }
  .avatar-card {
    background-color: #fff;

    .title-info {
      padding: 1.389vw;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 25vw;
        width: 25vw;
        border-radius: 50%;
      }
      .detail {
        flex: 1;
        margin-left: 8.333vw;
        .nums {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          text-align: center;
          font-size: 3.889vw;
          .line {
            width: 0.278vw;
            height: 9.722vw;
            margin: 0.833vw 0;
            background-color: #ccc;
          }
        }
        .edit {
          border: 0.278vw solid #fb7299;
          border-radius: 2.778vw;
          margin: 0 auto;
          height: 8.333vw;
          width: 90%;
          line-height: 8.333vw;
          text-align: center;
          font-size: 4.167vw;
          color: #fb7299;
        }
      }
    }
  }
}
</style>