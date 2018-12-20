<template>
  <div class="blog">
    <div class="blog-header__progress"></div>
    <HeadBar></HeadBar>
  </div>
</template>

<script>
import HeadBar from "./components/HeadBar";
export default {
  name: "Blog",
  data() {
    return {};
  },
  components: {
    HeadBar
  }
};
</script>

<style lang="less" scoped>
.blog {
  .blog-header {
    .blog-header__progress {
      width: 100%;
      height: 2px;
      background: #29d;
      -webkit-animation: hue 20s infinite linear;
    }
  }
}
@keyframes hue {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(-1turn);
  }
}
</style>
