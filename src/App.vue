<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="this.$route.meta.show" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  //监听 beforeunload 这个方法，beforeunload 在页面刷新时触发，
  //监听 beforeunload 让页面在刷新前将数据存到 sessionStorage 中
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  mounted() {
    this.$store.dispatch("cateGoryList");
  },
};
</script>

<style>
</style>
