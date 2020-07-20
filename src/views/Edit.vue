<template>
  <div class="edit" v-if="Object.keys(info).length">
    <div class="nav-container" style="margin-bottom: 10px;">
      <Nav-bar />
    </div>
    <edit-content class="avatar" left="头像">
      <img alt="avator" slot="right" src="../assets/head_img.jpg" />
    </edit-content>
    <edit-content left="昵称">
      <div slot="right">{{info.name}}</div>
    </edit-content>
    <edit-content left="账号">
      <div slot="right">{{info.username}}</div>
    </edit-content>
    <edit-content left="性别"></edit-content>
    <edit-content left="个性标签">
      <div slot="right">{{info.user_desc}}</div>
    </edit-content>
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar";
import EditContent from "../components/common/EditContent";

export default {
  name: "Edit",
  components: {
    NavBar,
    EditContent
  },
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.request();
  },
  methods: {
    async request() {
      let id = localStorage.getItem("id");
      let token = localStorage.getItem("token");
      try {
        const res = await this.$http.get(`/user/${id}`);
        console.log(res);
        this.info = res.data[0];
      } catch (error) {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.edit {
  height: 100vh;
  .avatar {
    img {
      width: 11.111vw;
      height: 11.111vw;
      border-radius: 50%;
    }
  }
}
</style>