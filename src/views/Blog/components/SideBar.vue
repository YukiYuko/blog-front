<template>
  <div class="sideBar">
    <div class="widget"><SearchInput></SearchInput></div>
    <div class="widget">
      <div class="widget__title">热门文章</div>
      <HotNews></HotNews>
    </div>
    <div class="widget">
      <div class="widget__title">最新评论</div>
      <latest-comment></latest-comment>
    </div>
    <div class="widget">
      <div class="widget__title">所有标签</div>
      <Tags></Tags>
    </div>
  </div>
</template>

<script>
import HotNews from "./HotNews";
import SearchInput from "./SearchInput";
import Tags from "./Tags";
import LatestComment from "./LatestComment.vue";
export default {
  name: "SideBar",
  components: {
    HotNews,
    LatestComment,
    Tags,
    SearchInput
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/styles/var";
@import "../../../assets/styles/mixins";
.sideBar {
  .widget {
    background-color: #fff;
    margin-bottom: 16px;
    position: relative;
    &__title {
      font-size: 16px;
      color: #333;
      line-height: 50px;
      height: 50px;
      padding: 0 20px;
      position: relative;
      &:after {
        .bottom-line();
      }
    }
  }
}
</style>
