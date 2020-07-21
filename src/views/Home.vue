<template>
  <div v-if="Object.keys(info).length && categories.length">
    <nav-bar :avatar="info.user_img" />
    <van-tabs swipeable v-model="active" sticky>
      <van-tab :key="index" :title="item.title" v-for="(item, index) in categories">
        <van-list
          :finished="item.finished"
          :immediate-check="false"
          @load="onLoad"
          finished-text="没有更多了"
          v-model="item.loading"
        >
          <detail :item="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar";
import Detail from "../components/common/Detail";

export default {
  name: "Home",
  components: {
    NavBar,
    Detail
  },
  async created() {
    let id = localStorage.getItem("id");
    const res = await this.$http.get(`/user/${id}`);
    this.info = res.data[0];
    await this.getCategory();
    this.getList(this.categories[this.active]);
  },
  data() {
    return {
      info: {},
      categories: [],
      active: 0
    };
  },
  watch: {
    active() {
      this.getList(this.categories[this.active]);
    }
  },
  methods: {
    getCategory() {
      return new Promise(async resolve => {
        const res = await this.$http.get("/category");
        this.categories = res.data.map(item => {
          item.list = [];
          item.page = 0;
          item.pagesize = 10;
          item.loading = false;
          item.finished = false;
          item.recentPage = -1;
          return item;
        });
        resolve();
      });
    },
    async getList(item) {
      let id = item._id;
      if (item.page === item.recentPage) return;
      const res = await this.$http.get(`/detail/${id}`, {
        params: {
          page: item.page,
          pagesize: item.pagesize
        }
      });
      item.list.push(...res.data);
      item.recentPage = item.page;
      item.loading = false;
    },
    onLoad() {
      console.log("load");
      let item = this.categories[this.active];
      item.page++;
      this.getList(item);
    }
  }
};
</script>

<style lang="less" scoped>
</style>