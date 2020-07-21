<template>
  <div class="edit" v-if="Object.keys(info).length">
    <div class="nav-container" style="margin-bottom: 10px;">
      <Nav-bar :avatar="info.user_img" />
    </div>
    
    <div class="uploader-container">
      <van-uploader :after-read="afterRead" class="uploader" preview-size="100vw" />
      <edit-content class="avatar" left="头像">
        <img :src="info.user_img" alt="avator" slot="right" v-if="info.user_img" />
        <img alt="avator" slot="right" src="../assets/head_img.jpg" v-else />
      </edit-content>
    </div>

    <edit-content @click.native="(nameDialog = true) && (content = info.name)" left="昵称">
      <div slot="right">{{info.name}}</div>
    </edit-content>
    <edit-content left="账号">
      <div slot="right">{{info.username}}</div>
    </edit-content>
    <edit-content @click.native="genderShow = true" left="性别">
      <div slot="right">{{info.gender === '1'? '男' : '女'}}</div>
    </edit-content>
    <edit-content @click.native="(descDialog = true) && (content = info.user_desc)" left="个性标签">
      <div slot="right">{{info.user_desc}}</div>
    </edit-content>

    <div @click="$router.push('/profile')" class="back">返回个人主页</div>

    <!--  修改昵称的对话框 -->
    <van-dialog @confirm="handleConfirm('name')" show-cancel-button title="昵称" v-model="nameDialog">
      <van-field v-model="content" />
    </van-dialog>
    <!-- 修改个性标签的对话框 -->
    <van-dialog @confirm="handleConfirm('user_desc')" show-cancel-button title="个性标签" v-model="descDialog">
      <van-field v-model="content" />
    </van-dialog>
    <!-- 选择性别的动作面板 -->
    <van-action-sheet :actions="actions" @select="ongenderSelect" v-model="genderShow" />
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
      info: {},
      nameDialog: false,
      descDialog: false,
      genderShow: false,
      content: "",
      actions: [
        { name: "男", val: 1 },
        { name: "女", val: 0 }
      ]
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
    },
    async afterRead(file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file.file);
      const res = await this.$http.post("/upload", formData);
      console.log(res);
      let { url } = res.data;
      this.info.user_img = url;
      this.updateInfo();
    },
    handleConfirm(val) {
      this.info[val] = this.content;
      this.updateInfo();
      this.content = "";
    },
    ongenderSelect(item) {
      this.genderShow = false;
      this.info.gender = item.val;
      this.updateInfo();
    },
    // 上传修改
    updateInfo() {
      let id = localStorage.getItem("id");
      this.$http.post(`/update/${id}`, this.info);
    }
  }
};
</script>

<style lang="less" scoped>
.edit {
  height: 100vh;
  .uploader-container {
    overflow: hidden;
    position: relative;
    .uploader {
      position: absolute;
      opacity: 0;
    }
    .avatar {
      img {
        width: 11.111vw;
        height: 11.111vw;
        border-radius: 50%;
      }
    }
  }
  .back {
    color: #666;
    font-size: 3.889vw;
    margin-top: 5.556vw;
    background-color: #fff;
    padding: 4.167vw 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>