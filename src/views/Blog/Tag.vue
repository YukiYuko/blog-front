<template>
  <div class="tag_page">
    <HeadBar></HeadBar>
    <div class="tag_banner" flex="" items="center" justify="center">
      <div class="tag_banner_text">
        <h3>{{ this.tag }}</h3>
        <p>{{ total }}篇文章</p>
      </div>
    </div>
    <div class="tag_container">
      <div class="container">
        <Row :gutter="16">
          <Cols span="16">
            <div class="tag_page_list">
              <ItemSearch
                v-show="list.length"
                v-for="(item, index) in list"
                :key="index"
                :data="item"
              ></ItemSearch>
              <Nomore v-show="!list.length"></Nomore>
            </div>
          </Cols>
          <Cols span="8">
            <div class="tag_page_side"><SideBar></SideBar></div>
          </Cols>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "./components/HeadBar";
import SideBar from "./components/SideBar";
import ItemSearch from "./components/ItemSearch";
import Nomore from "../../components/public/Nomore/Nomore";
import { search } from "../../ajax/api";
export default {
  name: "Tag",
  components: {
    HeadBar,
    SideBar,
    ItemSearch,
    Nomore
  },
  data() {
    return {
      page: 1,
      limit: 5,
      tag: "",
      total: 0,
      list: []
    };
  },
  created() {
    this.tag = this.$route.params.type || "";
  },
  watch: {
    $route: function() {
      this.tag = this.$route.params.type;
      this.page = 1;
      this._getNews();
    }
  },
  mounted() {
    this._getNews();
  },
  methods: {
    _getNews() {
      let params = {
        page: this.page,
        limit: this.limit,
        tag: this.tag
      };
      search(params).then(res => {
        this.list = res.data.data;
        this.total = res.data.total;
      });
    }
  }
};
</script>

<style lang="less">
@import "../../assets/styles/var";
@import "../../assets/styles/mixins";
.tag_page {
  background-color: @background_color;
  .tag_banner {
    height: 150px;
    background: url("../../assets/images/tag.png") top #505050;
    background-size: 150px;
    &_text {
      color: #ffffff;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      line-height: 20px;
    }
  }
  .tag_container {
    padding: 20px 0;
  }
}
</style>
