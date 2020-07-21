<template>
  <div class="article" v-if="Object.keys(detail).length">
    <nav-bar :avatar="info.user_img" />
    <div class="video-container">
      <video :poster="detail.img" :src="detail.content" controls></video>
    </div>
    <div class="title-container">
      <div>
        <div class="cate-title">{{detail.category.title}}</div>
        <span>{{detail.name}}</span>
      </div>
      <p class="username">{{detail.userinfo ? detail.userinfo.name : ''}}</p>
      <span>146.4万次观看</span>
      <span>5281弹幕</span>
      <span>{{detail.date}}</span>
      <!-- star 收藏缓存分享-->
      <div class="like">
        <div>
          <span class="icon icon-star-full"></span>
          <span>收藏</span>
        </div>
        <div>
          <span class="icon icon-box-add"></span>
          <span>缓存</span>
        </div>
        <div>
          <span class="icon icon-redo2"></span>
          <span>分享</span>
        </div>
      </div>
      <detail :item="commendList" v-if="commendList.list.length" />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar";
import Detail from "../components/common/Detail";

export default {
  name: "Article",
  components: {
    NavBar,
    Detail
  },
  data() {
    return {
      info: {},
      detail: {},
      commendList: {
        list: []
      }
    };
  },
  watch: {
    $route() {
      this.getArticle();
      this.getCommendList();
    }
  },
  async created() {
    let id = localStorage.getItem("id");
    const res = await this.$http.get(`/user/${id}`);
    this.info = res.data[0];
    this.getArticle();
    this.getCommendList();
  },
  methods: {
    async getArticle() {
      let { id } = this.$route.params;
      const res = await this.$http.get(`/article/${id}`);
      this.detail = res.data[0];
    },
    async getCommendList() {
      const res = await this.$http.get("/commend");
      this.commendList.list = res.data;
    }
  }
};
</script>

<style lang="less" scoped>
.article {
  height: 100vh;
  background-color: #fff;
  .video-container {
    width: 100vw;
    video {
      width: 100%;
    }
  }
  .title-container {
    padding: 20px;
    color: #aaa;
    div {
      .cate-title {
        display: inline-block;
        margin-right: 5px;
        text-align: center;
        background-color: #f7f3f5;
        border-radius: 5px;
        width: 50px;
        color: pink;
      }
      span {
        color: black;
      }
    }
    .username {
      margin-top: 5px;
      margin-bottom: 10px;
      font-size: 14px;
      color: black;
    }
    & > span {
      font-size: 13px;
      margin-right: 8px;
    }
    .like {
      margin-top: 10px;
      display: flex;
      width: 50%;
      justify-content: space-between;
      align-items: center;
      .icon {
        color: #777;
        font-size: 20px;
        margin-right: 5px;
      }
      span {
        color: #777;
        font-size: 12px;
      }
    }
  }
}
</style>