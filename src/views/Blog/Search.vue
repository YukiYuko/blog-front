<template>
  <div class="search_page">
    <HeadBar></HeadBar>
    <div class="container">
      <div class="search_page_keyword">
        搜索 <span>"小米"</span> 的结果
      </div>
      <div class="search_page_cont">
        <div class="search_page_cont_menu">
          <a class="active">全部文章</a>
          <a>移动前端</a>
          <a>web前端</a>
          <a>授人以渔</a>
        </div>
        <div class="search_page_cont_list">
          <div class="search_page_cont_list_item">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "./components/HeadBar";
export default {
  name: "Search",
  data() {
    return {};
  },
  components: {
    HeadBar
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/var";
.search_page {
  background-color: @background_color;
  padding-bottom: 100px;
  &_keyword{
    padding: 50px 0;
    font-size: 16px;
    span{
      color: @keyword_color;
    }
  }
  &_cont{
    background-color: #fff;
    min-height: 1000px;
    &_menu{
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      font-size: 0;
      position: relative;
      border-bottom: 1px solid @border_color;
      a{
        font-size: 14px;
        color: @title_color;
        padding: 0 15px;
        height: 50px;
        display: inline-block;
        margin-right: 30px;
        &.active{
          border-bottom: 1px solid @keyword_color;
        }
      }
    }
  }
}
</style>
