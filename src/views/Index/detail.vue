<template>
  <div class="detail">
    <div class="detail_head" flex>
      <div class="left" @click="go('index');">
        <i class="iconfont icon-shouye"></i>
      </div>
      <div class="center" box="1">
        <transition name="fade">
          <span v-show="scrollVal > 100">{{ detail.title }}</span>
        </transition>
      </div>
      <div
        id="code"
        class="right"
        @mouseover="show_code = true;"
        @mouseout="show_code = false;"
      >
        <i class="iconfont icon-QR"></i> <v-code v-show="show_code"></v-code>
      </div>
    </div>
    <div class="detail_cont">
      <div class="min_container">
        <div class="detail_cont_title" @click="test">{{ detail.title }}</div>
        <div class="detail_cont_time">
          {{ detail.createdAt | getDate("year") }}
        </div>
        <div class="detail_cont_tags">
          <a v-for="(item, index) in detail.tags" :key="index">{{ item }}</a>
        </div>
        <div class="detail_cont_banner">
          <img :src="detail.image" :alt="detail.title" />
        </div>
        <div class="detail_cont_cont">{{ detail.content }}</div>
      </div>
    </div>
    <BackTop :scrollTop="100"></BackTop>
  </div>
</template>

<script>
import { getNewsDetail } from "../../ajax/api";
import Code from "../../components/common/QRCode";
import BackTop from "../../components/public/BackTop/BackTop";
export default {
  name: "detail",
  props: {
    id: String
  },
  data() {
    return {
      detail: {},
      show_code: false,
      scrollVal: 0
    };
  },
  components: {
    VCode: Code,
    BackTop
  },
  mounted() {
    this.getData();
    // document.getElementById("code").addEventListener("hover", () => {
    //   this.show_code = true
    // });
    this.scroll();
  },
  methods: {
    getData() {
      let id = this.id || this.$route.params.id || "";
      if (id) {
        getNewsDetail({ id: id }).then(res => {
          const { data } = res;
          this.detail = data;
        });
      }
    },
    scroll() {
      window.addEventListener("scroll", () => {
        let scrollVal = window.document.documentElement.scrollTop;
        this.scrollVal = scrollVal;
      });
    },
    test() {
      history.pushState("", "", "/");
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*bottom: 0;*/
  background-color: #fff;
  z-index: 1000;
  padding-top: 50px;
  .detail_head {
    height: 50px;
    text-align: center;
    border-bottom: 1px solid #f7f7f7;
    background: #fefefe;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
    padding: 0 20px;
    line-height: 50px;
    .left {
      width: 40px;
      text-align: center;
      font-size: 20px;
      cursor: pointer;
    }
    .center {
    }
    .right {
      width: 50px;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      position: relative;
      i {
        font-size: 30px;
      }
    }
  }
  .detail_cont {
    padding: 80px 0;
    .detail_cont_banner {
      img {
        width: 100%;
      }
    }
    .detail_cont_title {
      font-size: 24px;
      margin-bottom: 20px;
    }
    .detail_cont_time {
      font-size: 14px;
      color: #999;
      margin-bottom: 10px;
    }
    .detail_cont_tags {
      margin-bottom: 30px;
      a {
        margin-right: 10px;
        background: rgba(102, 128, 153, 0.075);
        border-radius: 0;
        padding: 2px 5px;
        color: rgba(44, 63, 81, 0.5);
        font-size: 12px;
      }
    }
  }
}
</style>
