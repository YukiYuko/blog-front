<template>
  <div class="item_search" flex="" @click="go('blog', { id: data._id });">
    <div class="image"><img :src="data.image" alt="" /></div>
    <div class="text">
      <h3>{{ data.title }}</h3>
      <p>{{ data.createdAt | getDate }}</p>
      <div>{{ data.desc }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemSearch",
  props: {
    data: Object
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/styles/var";
@import "../../../assets/styles/mixins";
.item_search {
  padding: 20px 0;
  border-bottom: 1px solid @border_color;
  .image {
    width: 240px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 140px;
    }
  }
  .text {
    h3 {
      font-size: 16px;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      color: @sub_color;
      margin-bottom: 20px;
    }
    div {
      font-size: 14px;
      color: @info_color;
      line-height: 20px;
    }
  }
}
</style>
