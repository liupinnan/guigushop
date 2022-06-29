<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!--遍历数据-->
        <ul
          class="cart-list"
          v-for="(cartlist, index) in cartInfoList"
          :key="cartlist.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartlist.isChecked"
              @change="updateChecked(cartlist, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartlist.imgUrl" />
            <div class="item-msg">
              {{ cartlist.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartlist.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changehandler('sub', -1, cartlist)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cartlist.skuNum"
              @change="changehandler('own', $event.target.value * 1, cartlist)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changehandler('add', 1, cartlist)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartlist.skuNum * cartlist.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deletShop(cartlist)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          @change="allchecked($event)"
          :checked="allCheck && cartInfoList.length > 0"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleSelectChecked">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） :</em>
          <i class="summoney">{{ allPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartInfoList", "cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    allPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    allCheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("cateCartList");
    },
    async deletShop(cartlist) {
      try {
        await this.$store.dispatch("cateDeletShopCart", cartlist.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    async updateChecked(cartlist, event) {
      //带给服务器的参数isChecked，不是布尔值，应该是0|1
      try {
        //如果修改数据成功，再次获取服务器数据（购物车）
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedById", {
          skuId: cartlist.skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        //如果失败提示
        alert(error.message);
      }
    },
    changehandler: throttle(async function (type, num, cartlist) {
      switch (type) {
        case "add":
          num = 1;
          break;
        case "sub":
          num = cartlist.skuNum > 1 ? -1 : 0;
          break;
        case "own":
          if (isNaN(num) || num < 1) {
            num = 0;
          } else {
            num = parseInt(num) - cartlist.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("postShopCart", {
          skuId: cartlist.skuId,
          skuNum: num,
        });
        this.getData();
      } catch (error) {
        alert("修改失败");
      }
    }, 100),
    //全选
    async allchecked(event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateAllChecked", isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除选中的
    async deleSelectChecked() {
      try {
        await this.$store.dispatch("deletAllCheck");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>


<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 9px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 9px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>