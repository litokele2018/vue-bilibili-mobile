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
        <div :class="{activeClass: isCollected}" @click="handleCollection">
          <span class="icon icon-star-full"></span>
          <span>收藏</span>
        </div>
        <div :class="{activeClass: isSubscribe}" @click="handleSubscribe">
          <span class="icon icon-bubble"></span>
          <span>关注</span>
        </div>
        <div>
          <span class="icon icon-redo2"></span>
          <span>分享</span>
        </div>
      </div>
    </div>
    <detail :item="commendList" v-if="commendList.list.length" />
    <comments :avatar="info.user_img" @push="handlePush" ref="comment" />
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar";
import Detail from "../components/common/Detail";
import Comments from "../components/article-comps/Comments";

export default {
  name: "Article",
  components: {
    NavBar,
    Detail,
    Comments
  },
  data() {
    return {
      info: {},
      detail: {},
      commendList: {
        list: []
      },
      pushComment: {
        comment_content: "",
        comment_date: "",
        article_id: null,
        parent_id: null
      },
      isCollected: false,
      isSubscribe: false
    };
  },
  watch: {
    $route() {
      this.getArticle();
      this.getCommendList();
    }
  },
  async created() {
    this.getUserInfo();
    await this.getArticle();
    this.getCommendList();
    this.getCollection();
    this.getSubscribe();
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      let id = localStorage.getItem("id");
      if (id) {
        const res = await this.$http.get(`/user/${id}`);
        this.info = res.data[0];
      }
    },
    // 获取文章数据
    getArticle() {
      return new Promise(async resolve => {
        let { id } = this.$route.params;
        const res = await this.$http.get(`/article/${id}`);
        this.detail = res.data[0];
        resolve();
      });
    },
    // 获取推荐列表
    async getCommendList() {
      const res = await this.$http.get("/commend");
      this.commendList.list = res.data;
    },
    // 发表评论
    async pushSelfComment() {
      const res = await this.$http.post(
        `/comment_post/${localStorage.getItem("id")}`,
        this.pushComment
      );
      if (res.status === 200) {
        this.$toast.success("发布成功");
        // 发表完成后 重新请求数据
        this.$refs.comment.getComments();
      }
    },
    handlePush(content, parentId) {
      this.pushComment.comment_content = content;
      // 获取时间
      let date = new Date();
      let m = date.getMonth() + 1;
      let r = date.getDate();
      this.pushComment.comment_date = `${m > 10 ? m : "0" + m}-${
        r > 10 ? r : "0" + r
      }`;
      this.pushComment.article_id = this.$route.params.id;
      this.pushComment.parent_id = parentId;
      this.pushSelfComment();
    },
    // 获取是否收藏
    async getCollection() {
      let id = localStorage.getItem("id");
      let token = localStorage.getItem("token");
      if (!id || !token) {
        return;
      }
      const res = await this.$http.get(`/collection/${id}`, {
        params: {
          article_id: this.$route.params.id
        }
      });
      this.isCollected = res.data.success;
    },
    // 收藏
    async handleCollection() {
      let id = localStorage.getItem("id");
      let token = localStorage.getItem("token");
      if (!id || !token) {
        this.$toast.fail("请先登陆后操作");
        return;
      }
      const res = await this.$http.post(`/collection/${id}`, {
        article_id: this.$route.params.id
      });
      if (res.data.code === 200) {
        this.$toast.success(res.data.msg);
        this.isCollected = !this.isCollected;
      }
    },
    // 获取是否关注
    async getSubscribe() {
      let id = localStorage.getItem("id");
      let token = localStorage.getItem("token");
      if (!id || !token) {
        return;
      }
      const res = await this.$http.get(`/sub_scription/${id}`, {
        params: {
          sub_id: this.detail.userid
        }
      });
      console.log(res);
      this.isSubscribe = res.data.success;
    },
    // 收藏
    async handleSubscribe() {
      let id = localStorage.getItem("id");
      let token = localStorage.getItem("token");
      if (!id || !token) {
        this.$toast.fail("请先登陆后操作");
        return;
      }
      const res = await this.$http.post(`/sub_scription/${id}`, {
        sub_id: this.detail.userid
      });
      if (res.data.code === 200) {
        this.$toast.success(res.data.msg);
        this.isSubscribe = !this.isSubscribe;
      }
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

      .activeClass {
        span {
          color: #fb7299;
        }
      }
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