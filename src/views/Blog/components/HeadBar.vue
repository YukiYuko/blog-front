<template>
  <div class="header">
    <div class="container" flex justify="between">
      <div class="header_left"></div>
      <div class="header_center">
        <ul flex>
          <li>
            <a href="">首页</a>
            <div
              :style="{
                'background-color': colors[0]
              }"
              class="skew"
            ></div>
          </li>
          <li>
            <a href="">移动前端</a>
            <div
              :style="{
                'background-color': colors[1]
              }"
              class="skew"
            ></div>
          </li>
          <li>
            <a href="">Web前端</a>
            <div
              :style="{
                'background-color': colors[2]
              }"
              class="skew"
            ></div>
          </li>
          <li>
            <a href="">授人以渔</a>
            <div
              :style="{
                'background-color': colors[3]
              }"
              class="skew"
            ></div>
          </li>
          <li>
            <a href="">UI设计</a>
            <div
              :style="{
                'background-color': colors[4]
              }"
              class="skew"
            ></div>
          </li>
          <li>
            <a href="">关于&留言</a>
            <div
              :style="{
                'background-color': colors[5]
              }"
              class="skew"
            ></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HeadBar",
  data() {
    return {
      colors: [
        "#FFCCCC",
        "#FF99CC",
        "#CCCCFF",
        "#6699CC",
        "#99CCFF",
        "#003366"
      ],
      color_new: []
    };
  },
  computed: {
    ...mapGetters(["user_id"])
  },
  mounted() {
    // this.colors = this.shuffle(this.colors);
    this.colors = this.shuffle(this.colors);
    console.log(this.user_id);
  },
  methods: {
    ...mapActions(["save"]),
    // 乱序
    shuffle(a) {
      let len = a.length;
      for (let i = 0; i < len - 1; i++) {
        let index = parseInt(Math.random() * (len - i));
        let temp = a[index];
        a[index] = a[len - i - 1];
        a[len - i - 1] = temp;
      }
      return [...a];
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/styles/mixins";
@import "../../../assets/styles/var";
.header {
  .drop-shadow-bottom;
  .container {
    height: 74px;
  }
  .header_left {
    position: relative;
    width: 140px;
    height: 60px;
    text-indent: -999em;
    background-image: url("../../../assets/images/blog/style-index.d437fb5e.png");
    background-position: -4px -4px;
    background-repeat: no-repeat;
  }
  .header_center {
    ul {
      height: 100%;
      li {
        width: 90px;
        height: 100%;
        position: relative;
        overflow: hidden;
        a {
          display: block;
          height: 100%;
          text-align: center;
          line-height: 74px;
          position: relative;
          color: @title_color;
          font-size: 14px;
          overflow: hidden;
          z-index: 1;
        }
        &:hover {
          .skew {
            top: 0;
          }
        }
        .skew {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 70px;
          transition: all 0.2s ease-in-out;
        }
      }
    }
  }
}
</style>
