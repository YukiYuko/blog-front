<template>
  <div class="hot_news">
    <div
      class="hot_news_item"
      @mouseover="current = index;"
      :class="{ active: current === index }"
      items="center"
      flex
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="hot_news_item_image">
        <span :class="['top', 'second', 'three'][index]">{{ index + 1 }}</span>
        <img :src="item.image" :alt="item.title" />
      </div>
      <div class="hot_news_item_text">
        <h3>{{ item.title }}</h3>
        <p>
          <i class="iconfont icon-liuyan"></i>
          <span>{{ item.comments && item.comments.length }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getNews } from "../../../ajax/api";
export default {
  name: "HotNews",
  props: {
    type: String
  },
  data() {
    return {
      list: [],
      page: 1,
      limit: 5,
      current: 0
    };
  },
  mounted() {
    this._getNews();
  },
  methods: {
    _getNews() {
      getNews({
        page: this.page,
        limit: this.limit,
        condition: { sort: "heat" }
      }).then(res => {
        const { data } = res.data;
        this.list = data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/styles/var";
@import "../../../assets/styles/mixins";
.hot_news {
  padding: 15px;
  &_item {
    margin-bottom: 10px;
    cursor: pointer;
    &.active {
      .hot_news_item_text {
        p {
          display: block;
        }
      }
      .hot_news_item_image {
        img {
          display: block;
        }
      }
    }
    &_image {
      position: relative;
      margin-right: 15px;
      min-width: 22px;
      min-height: 22px;
      span {
        position: absolute;
        left: 0;
        top: 0;
        width: 22px;
        height: 22px;
        background-color: #b1b1b1;
        color: #fff;
        text-align: center;
        line-height: 22px;
        &.top {
          background-color: #e1554e;
        }
        &.second {
          background-color: #f3bf5a;
        }
        &.three {
          background-color: #7586db;
        }
      }
      img {
        width: 95px;
        height: 65px;
        display: none;
      }
    }
    &_text {
      color: @sub_color;
      h3 {
        font-size: 14px;
        line-height: 20px;
        .text-overflow(1);
      }
      p {
        display: none;
        margin-top: 10px;
      }
    }
  }
}
</style>
