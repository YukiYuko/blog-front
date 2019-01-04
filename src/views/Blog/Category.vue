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
      {{ category }}
    </div>
    <div class="container">
      <div class="bread">
        <Breadcrumb>
          <BreadcrumbItem to="/blog">首页</BreadcrumbItem>
          <BreadcrumbItem :to="`/category/${newsType}`">{{
            category
          }}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="category_content">
        <Row :gutter="16">
          <Cols span="16">
            <div class="category_content__left">
              <div class="category_list">
                <Item1
                  v-for="(item, index) in list"
                  :data="item"
                  :key="index"
                ></Item1>
              </div>
              <div class="page" style="text-align: center; padding: 30px">
                <Page @on-change="changePage" :total="total" :page-size="limit"></Page>
              </div>
            </div>
          </Cols>
          <Cols span="8">
            <div class="category_content__right"><SideBar></SideBar></div>
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
import { getNews } from "../../ajax/api";
export default {
  name: "Category",
  data() {
    return {
      page: 1,
      limit: 5,
      newsType: "",
      list: [],
      total: 0
    };
  },
  components: {
    HeadBar,
    SideBar,
    Item1
  },
  computed: {
    category() {
      let data = {
        h5: "移动前端",
        web: "web前端",
        skill: "授人以渔",
        design: "UI设计"
      };
      return data[this.newsType];
    }
  },
  created() {
    this.newsType = this.$route.params.type;
  },
  watch: {
    $route: function() {
      this.newsType = this.$route.params.type;
      this.page = 1;
      this._getNews();
    }
  },
  mounted() {
    this._getNews();
  },
  methods: {
    changePage(page) {
      this.page = page;
      window.scrollTo(0, 0);
      this._getNews();
    },
    _getNews() {
      let params = {
        page: this.page,
        limit: this.limit,
        condition: {
          newsType: this.newsType
        }
      };
      getNews(params).then(res => {
        const { data, total } = res.data;
        this.list = data;
        this.total = total;
      });
    }
  }
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
  .bread {
    padding: 20px;
    background-color: #ffffff;
  }
  &_content {
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
