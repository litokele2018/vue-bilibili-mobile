<template>
  <div id="profile" v-if="Object.keys(info).length">
    <nav-bar :avatar="info.user_img"></nav-bar>
    <info :data="info" />
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar";
import Info from "../components/profile-comps/Info";

export default {
  name: "Profile",
  components: {
    NavBar,
    Info
  },
  created() {
    this.getDetail();
  },
  data() {
    return {
      info: {}
    };
  },
  methods: {
    async getDetail() {
      let id = localStorage.getItem("id");
      let token = localStorage.getItem("token");
      try {
        const res = await this.$http.get(`/user/${id}`);
        this.info = res.data[0];
        console.log(res);
      } catch (error) {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style>
</style>