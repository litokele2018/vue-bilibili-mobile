<template>
  <div id="profile">
    <nav-bar></nav-bar>
    <info :data="detailData[0]" />
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
      detailData: {}
    };
  },
  methods: {
    async getDetail() {
      let id = localStorage.getItem("id");
      let token = localStorage.getItem("token");
      try {
        const res = await this.$http.get(`/user/${id}`);
        this.detailData = res.data;
        console.log(res)
      } catch (error) {
        this.$router.push('/login')
      }
    }
  }
};
</script>

<style>
</style>