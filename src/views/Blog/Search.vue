<template>
  <div class="search_page">
    <HeadBar></HeadBar>
    <div class="container">
      <div class="search_page_keyword">
        搜索 <span>"{{ keyword }}"</span> 的结果
      </div>
      <div class="search_page_cont">
        <div class="search_page_cont_menu">
          <a @click="switchResult('');" :class="{ active: !active }"
            >全部文章</a
          >
          <a
            @click="switchResult(item.key);"
            :class="{ active: active === item.key }"
            v-for="(item, index) in nav"
            :key="index"
            >{{ item.name }}</a
          >
        </div>
        <div class="search_page_cont_list">
          <ItemSearch
            v-show="list.length"
            v-for="(item, index) in list"
            :key="index"
            :data="item"
          ></ItemSearch>
          <Nomore v-show="!list.length"></Nomore>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "./components/HeadBar";
import ItemSearch from "./components/ItemSearch";
import Nomore from "../../components/public/Nomore/Nomore";
import { search } from "../../ajax/api";
import { mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      keyword: "",
      active: "",
      limit: 5,
      page: 1,
      list: []
    };
  },
  components: {
    HeadBar,
    ItemSearch,
    Nomore
  },
  watch: {
    active: function() {
      this.page = 1;
      this._getNews();
    }
  },
  computed: {
    ...mapGetters(["user_id", "nav"])
  },
  created() {
    this.keyword = this.$route.query.keyword;
  },
  mounted() {
    this._getNews();
  },
  methods: {
    switchResult(key) {
      this.active = key;
    },
    _getNews() {
      let params = {
        page: this.page,
        limit: this.limit,
        keyword: this.keyword
      };
      if (this.active) {
        params = {
          ...params,
          newsType: this.active
        };
      }
      search(params).then(res => {
        this.list = res.data.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/var";
.search_page {
  background-color: @background_color;
  padding-bottom: 100px;
  &_keyword {
    padding: 50px 0;
    font-size: 16px;
    span {
      color: @keyword_color;
    }
  }
  &_cont {
    background-color: #fff;
    min-height: 1000px;
    &_menu {
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      font-size: 0;
      position: relative;
      border-bottom: 1px solid @border_color;
      a {
        font-size: 14px;
        color: @title_color;
        padding: 0 15px;
        height: 50px;
        display: inline-block;
        margin-right: 30px;
        &.active {
          border-bottom: 1px solid @keyword_color;
        }
      }
    }
    &_list {
      padding: 0 20px;
    }
  }
}
</style>
