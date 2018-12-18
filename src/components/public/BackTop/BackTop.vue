<template>
  <transition name="slide-up">
    <div class="page-component-up" @click="scrollToTop" v-show="toTopShow">Top</div>
  </transition>
</template>

<script>
export default {
  name: "BackTop",
  props: {
    scrollTop: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      toTopShow: false
    };
  },
  methods: {
    handleScroll() {
      //首先修改相对滚动位置
      this.scrollTop = this.scrollTop =
        window.pageYOffset || document.body.scrollTop;
      if (this.scrollTop > this.scrollTop) {
        this.toTopShow = true;
      } else {
        this.toTopShow = false;
      }
    },
    scrollToTop() {
      let timer = null,
        _that = this;
      //动画，使用requestAnimationFrame代替setInterval
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 100;
          //然后修改这里实现动画滚动效果
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _that.toTopShow = false;
        }
      });
    }
  },
  mounted() {
    this.$nextTick(function() {
      //修改事件监听
      window.addEventListener("scroll", this.handleScroll);
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="less">
.page-component-up {
  cursor: pointer;
  position: fixed;
  z-index: 2;
  width: 70px;
  height: 900px;
  bottom: 250px;
  right: 0;
  background-image: url("../../../assets/images/back-top.7c489d1.png");
  -webkit-transition: bottom 1s;
  transition: bottom 1s;
  .el-icon-caret-top {
    color: #fff;
    display: block;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
  p {
    display: none;
    text-align: center;
    color: #fff;
  }
  &:hover {
    opacity: 0.8;
  }
}
</style>
