<template>
  <div class="comments" v-if="commentsList.length">
    <p class="comment-info">
      <span>评论</span>
      <span>({{commentsList.length}})</span>
    </p>
    <div class="self-comment">
      <img :src="avatar" alt="av" v-if="avatar" />
      <img alt="av" src="../../assets/head_img.jpg" v-else />
      <input placeholder="说点什么吧" ref="inp" type="text" v-model="content" />
      <button @click="sendComment">发表</button>
    </div>
    <div :key="index" class="first-comment" v-for="(item, index) in commentsList">
      <!-- 一级评论 -->
      <div class="userinfo" v-if="item.userinfo">
        <div>
          <img :src="item.userinfo.user_img" alt="user_avatar" v-if="item.userinfo && item.userinfo.user_img" />
          <img alt="user_avatar" src="../../assets/head_img.jpg" v-else />
        </div>
        <div class="name-content">
          <div class="name-date">
            <span class="username">{{item.userinfo.name}}</span>
            <span class="date">{{item.comment_date}}</span>
          </div>
          <div class="comment-content">{{item.comment_content}}</div>
          <div @click="handleReply(item)" class="re-btn">回复</div>
        </div>
      </div>
      <!-- 二级评论和后面的 -->
      <div class="add-good-bad">
        <van-icon name="good-job-o" />
        <van-icon name="good-job-o" style="transform: rotate(180deg)" />
        <span class="icon icon-redo2"></span>
        <div
          @click="item.show = !item.show"
          class="showcomments"
          v-if="item.children.length"
        >查看对话({{item.children.length}})</div>
      </div>
      <comments-item
        :item="item.children"
        @postId="postId"
        class="reply-comments"
        v-if="item.children.length"
        v-show="item.show"
      />
    </div>
  </div>
</template>

<script>
import CommentsItem from "../article-comps/CommentsItem";

export default {
  name: "Comments",
  props: ["avatar"],
  components: {
    CommentsItem
  },
  created() {
    this.getComments();
  },
  data() {
    return {
      commentsList: [],
      content: "",
      parentId: null
    };
  },
  methods: {
    // 发表评论
    sendComment() {
      let id = localStorage.getItem("id");
      let token = localStorage.getItem("token");
      if (!id || !token) {
        this.$toast.fail("请先登陆后评论");
        return;
      }
      this.$emit("push", this.content, this.parentId);
      this.content = "";
      this.parentId = null;
    },
    // 获取评论
    async getComments() {
      const res = await this.$http.get(`/comment/${this.$route.params.id}`);
      this.changeData(res.data);
    },
    // 修改数据结构
    changeData(data) {
      let map = new Map();
      this.commentsList = data
        .map(item => {
          if (!map.has(item.comment_id)) {
            map.set(item.comment_id, []);
          }
          // 如果有父id
          if (item.parent_id) {
            let pid = parseInt(item.parent_id);
            if (map.has(pid)) {
              map.get(pid).push(item);
            } else {
              map.set(pid, [item]);
            }
          }
          return item;
        })
        .map(item => {
          item.children = map.get(item.comment_id);
          item.show = false;
          return item;
        });
    },
    // 点击回复
    handleReply(item) {
      this.parentId = item.comment_id;
      this.$refs.inp.focus();
    },
    // postId 监听子组件的id传输
    postId(id) {
      this.parentId = id;
      this.$refs.inp.focus();
    }
  }
};
</script>

<style lang="less" scoped>
.comments {
  padding: 5.556vw 4.167vw;
  .comment-info {
    font-size: 5vw;
    span:nth-child(2) {
      margin-left: 2.778vw;
      color: #666;
      font-size: 4.444vw;
    }
  }
  .self-comment {
    margin-top: 2.778vw;
    margin-bottom: 5.556vw;
    display: flex;
    align-items: center;
    img {
      width: 6.667vw;
      height: 6.667vw;
      border-radius: 3.333vw;
      margin-right: 2.778vw;
    }
    input {
      height: 6.667vw;
      border-radius: 3.333vw;
      border: 0;
      background-color: #f5f4f6;
      font-size: 3.333vw;
      padding: 0 2.778vw;
      margin-right: 2.778vw;
    }
    button {
      border: 0;
      padding: 1.389vw 4.167vw;
      border-radius: 3.333vw;
      color: white;
      background-color: #ff819b;
      font-size: 3.333vw;
    }
  }
  .userinfo {
    display: flex;
    margin-bottom: 5.556vw;
    img {
      width: 6.667vw;
      height: 6.667vw;
      border-radius: 3.333vw;
      margin-right: 2.778vw;
    }
    .name-content {
      font-size: 3.889vw;
      width: 100%;
      position: relative;
      .name-date {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #777;
        .username {
          color: #777;
        }
      }
      .re-btn {
        position: absolute;
        color: red;
        right: 1.389vw;
        bottom: 0vw;
      }
    }
  }
  .add-good-bad {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 50%;
    position: relative;
    .showcomments {
      position: absolute;
      right: -41.667vw;
      color: #777;
    }
  }
  .first-comment {
    border-bottom: 0.278vw solid #eeeeee;
    padding-bottom: 1.389vw;
    margin-bottom: 1.389vw;
  }
  .reply-comments {
    margin-left: 8.333vw;
  }
}
</style>