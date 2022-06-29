<template>
  <div class="swiper-container">
    <div class="swiper-button-next"><</div>
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <ul class="swiper-ul">
          <li
            @click="enterLi(index)"
            :class="current == index ? 'slip' : ''"
            v-for="(skuImage, index) in skuImageList"
            :key="skuImage.id"
          >
            <img :src="skuImage.imgUrl" />
          </li>
        </ul>
      </div>
    </div>
    <div class="swiper-button-prev">></div>
  </div>
</template>

<script>
export default {
  name: "ImageList",
  props: ["skuImageList"],

  computed: {},
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    imgchange(val) {
      // console.log(val);
      this.current = val;
    },
    //鼠标点击小图时事件，显示对应的中图
    enterLi(index) {
      this.current = index;
      this.$refs.remarkCarusel.setActiveItem(index);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  display: flex;
  justify-content: space-between;
  height: 56px;
  width: 402px;
  box-sizing: border-box;
  // padding: 0 12px;
  .swiper-wrapper {
    width: 100%;
    display: flex;
  }
  .swiper-ul {
    display: flex;
    justify-content: space-between;
  }
  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>