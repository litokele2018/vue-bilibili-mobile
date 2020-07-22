<template>
  <div class="comments-item" v-if="item.length">
    <div :key="index1" v-for="(item1, index1) in item">
      <div class="userinfo" v-if="item1.userinfo">
        <div>
          <img :src="item1.userinfo.user_img" alt="user_avatar" v-if="item1.userinfo && item1.userinfo.user_img" />
          <img alt="user_avatar" src="../../assets/head_img.jpg" v-else />
        </div>
        <div class="name-content">
          <div class="name-date">
            <span class="username">{{item1.userinfo.name}}</span>
            <span class="date">{{item1.comment_date}}</span>
          </div>
          <div class="comment-content">{{item1.comment_content}}</div>
          <div @click="handleReply(item1)" class="re-btn">回复</div>
        </div>
      </div>
      <div v-if="item1.children.length">
        <div class="reply">
          <span>回复</span>
          <span>@{{item1.userinfo? item1.userinfo.name : ''}}</span>
          <comments-item :item="item1.children" @postId="postId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentsItem from "./CommentsItem";
export default {
  name: "CommentsItem",
  props: ["item"],
  components: {
    CommentsItem
  },
  data() {
    return {
      parentId: null
    };
  },
  methods: {
    handleReply(item) {
      this.parentId = item.comment_id;
      this.$emit("postId", this.parentId);
    },
    postId(id) {
      this.parentId = id;
      this.$emit("postId", id);
    }
  }
};
</script>

<style lang="less" scoped>
.comments-item {
  margin-top: 20px;
  .userinfo {
    display: flex;
    margin-bottom: 20px;
    img {
      width: 24px;
      height: 24px;
      border-radius: 12px;
      margin-right: 10px;
    }
    .name-content {
      font-size: 14px;
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
  .reply {
    span:nth-child(2) {
      color: #7a98ae;
    }
  }
}
</style>