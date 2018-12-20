<template>
  <div class="blog">
    <div class="blog-header">
      <div class="blog-header__progress"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blog"
};
</script>

<style lang="less" scoped>
.blog {
  .blog-header{
    .blog-header__progress{
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
