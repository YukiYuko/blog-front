<template>
  <div class="category">
    <HeadBar></HeadBar>
    <div
      :style="
        `background-image: url(${require('../../assets/images/bilibili.png')})`
      "
      class="banner"
      flex=""
      items="center"
      justify="center"
    >
      移动前端
    </div>
    <div class="container">
      <div class="bread">
        <Breadcrumb>
          <BreadcrumbItem to="/blog">首页</BreadcrumbItem>
          <BreadcrumbItem to="/category/h5">移动前端</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="category_content">
        <Row :gutter="16">
          <Cols span="16">
            <div class="category_content__left">
              <div class="category_list">
                <Item1></Item1>
              </div>
            </div>
          </Cols>
          <Cols span="8">
            <div class="category_content__right">
              <SideBar></SideBar>
            </div>
          </Cols>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "./components/HeadBar";
import SideBar from "./components/SideBar";
import Item1 from "./components/Item1";
export default {
  name: "Category",
  data() {
    return {};
  },
  components: {
    HeadBar,
    SideBar,
    Item1
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/var";
@import "../../assets/styles/mixins";
.category {
  background: @background_color;
  .banner {
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    font-size: 30px;
    color: #fff;
    margin-bottom: 20px;
  }
  .bread{
    padding: 20px;
    background-color: #ffffff;
  }
  &_content{
    background-color: @background_color;
    min-height: 2000px;
    padding: 20px 0;
    &__right {
      min-height: 1000px;
      position: -webkit-sticky;
      position: sticky;
      top: 0;
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
  }
}
</style>
