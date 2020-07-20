<template>
  <div class="hello">
    <top-bar
      title="登陆bilibili"
      to="/register"
    ></top-bar>
    <login-field
      @success="res => loginInfo.username = res"
      label="账号"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      style="margin: 4.167vw 0"
    />
    <login-field
      @success="res => loginInfo.password = res"
      label="密码"
      placeholder="请输入密码"
      rule="^.{6,16}$"
      type="password"
    />
    <login-btn
      @click.native="handleSubmit"
      content="登陆"
    ></login-btn>
  </div>
</template>

<script>
import TopBar from "../components/common/TopBar";
import LoginField from "../components/common/LoginField";
import LoginBtn from "../components/common/LoginBtn";

export default {
  name: "Home",
  components: {
    TopBar,
    LoginField,
    LoginBtn
  },
  data() {
    return {
      loginInfo: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async handleSubmit() {
      const res = await this.$http.post("/login", this.loginInfo);
      console.log(res);
      const { code, id, token, msg } = res.data;
      if (code === 200) {
        this.$toast.success("登陆成功");
        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        setTimeout(() => {
          this.$router.push("/profile");
        }, 1000);
      } else {
        this.$toast.fail(`${msg}`);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

