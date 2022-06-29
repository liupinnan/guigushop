<template>
  <div>
    <!-- 三级联动 -->
    <TypeNav></TypeNav>
    <ListerContainer></ListerContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="(floor, index) in cateFloorList"
      :list="floor"
      :key="floor.id"
    ></Floor>
    <!-- <Floor></Floor> -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListerContainer from "./ListContainer/index.vue";
import TodayRecommend from "./TodayRecommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";
import { mapState } from "vuex";
export default {
  name: "home",
  computed: {
    ...mapState({
      cateFloorList: (state) => state.home.cateFloorList,
    }),
  },
  mounted() {
    this.$store.dispatch("cateFloorList");
    this.$store.dispatch("getUserToken");
    // console.log(...mapState);
  },
  components: {
    ListerContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style>
</style>