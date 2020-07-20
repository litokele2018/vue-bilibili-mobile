<template>
  <div class="register">
    <top-bar
      title="注册bilibili"
      to="/login"
    ></top-bar>
    <login-field
      @success="res => info.name = res"
      label="姓名"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      style="margin: 4.167vw 0"
    />
    <login-field
      @success="res => info.username = res"
      label="账号"
      placeholder="请输入账号"
      rule="^.{6,16}$"
    />
    <login-field
      @success="res => info.password = res"
      label="密码"
      placeholder="请输入密码"
      rule="^.{6,16}$"
      type="password"
    />
    <login-btn
      @click.native="handleSubmit"
      content="注册"
    ></login-btn>
  </div>
</template>

<script>
import TopBar from "../components/common/TopBar";
import LoginField from "../components/common/LoginField";
import LoginBtn from "../components/common/LoginBtn";

export default {
  name: "Register",
  components: {
    TopBar,
    LoginField,
    LoginBtn
  },
  data() {
    return {
      info: {
        name: "",
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async handleSubmit() {
      if (this.info.name && this.info.username && this.info.password) {
        const res = await this.$http.post("/register", this.info);
        if (res.status === 200) {
          const { id, objtoken } = res.data;
          if (localStorage.getItem("id") !== id) {
            localStorage.setItem("id", id);
            localStorage.setItem("token", objtoken);
          }
          this.$toast.success("注册成功");
          this.$router.push("/profile");
        } else {
          this.$toast.fail("注册失败");
        }
      } else {
        this.$toast.fail("请填写正确的注册信息");
      }
    }
  }
};
</script>

<style>
</style>
