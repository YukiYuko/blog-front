<template>
  <div class="section-two">
    <vue-ins-progress-bar></vue-ins-progress-bar>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item>菜单1</v-contextmenu-item>
      <v-contextmenu-item>菜单2</v-contextmenu-item>
      <v-contextmenu-item>菜单3</v-contextmenu-item>
    </v-contextmenu>
    <div class="container" v-contextmenu:contextmenu>
      <div class="news-list">
        <div
          class="news-list-item"
          :data-aos="index % 2 !== 0 ? 'fade-left' : 'fade-right'"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="left">
            <!-- <img src="../../assets/images/404.jpg" alt="" /> -->
            <img @click="previewImage(item);" v-lazy="item.image" alt="" />
          </div>
          <div
            @click="go('blog', { id: item._id });"
            class="right"
            flex
            justify="center"
            dir="column"
          >
            <p class="time">{{ item.createdAt }}</p>
            <div class="title">{{ item.title }}</div>
            <div class="cont">{{ item.content }}</div>
          </div>
        </div>
      </div>
      <div id="pager">
        <FrameBtn @click="loadMore" :text="loadMoreText"></FrameBtn>
      </div>
    </div>
    <Modal
      :styles="{ background: 'none' }"
      :footer-hide="true"
      v-model="show_modal"
      width="800px"
    >
      <div slot="header">{{ current.title }}</div>
      <img style="width: 100%;" class="imgUrl" :src="current.image" alt="" />
    </Modal>
  </div>
</template>

<script>
import { getNews } from "../../ajax/api";
import AOS from "aos";
import "aos/dist/aos.css";
import FrameBtn from "../../components/public/FrameBtn/FrameBtn";
export default {
  name: "Section-two",
  data() {
    return {
      page: 1,
      limit: 10,
      list: [],
      loadMoreText: "加载更多",
      hasMore: true,
      show_modal: false,
      current: ""
    };
  },
  components: {
    FrameBtn
  },
  mounted() {
    this._getNews();
    AOS.init();
  },
  methods: {
    _getNews() {
      if (!this.hasMore) {
        return false;
      }
      console.log(this);
      this.loadMoreText = "加载中";
      this.$insProgress.start();
      getNews({ page: this.page, limit: this.limit })
        .then(res => {
          const { data } = res;
          if (data.data.length) {
            this.list = [...this.list, ...data.data];
            if (data.data.length < this.limit) {
              this.loadMoreText = "没有更多啦!";
              this.hasMore = false;
            } else {
              this.page++;
              this.loadMoreText = "加载更多";
              this.hasMore = true;
            }
          } else {
            this.loadMoreText = "没有更多啦!";
            this.hasMore = false;
          }
          this.$insProgress.finish();
        })
        .catch(() => {
          this.$insProgress.finish();
        });
    },
    // 获取随机颜色值
    _getColor() {
      return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
    },
    // 加载更多
    loadMore() {
      this._getNews();
    },
    // 查看图片
    previewImage(current) {
      this.current = current;
      this.show_modal = true;
    }
  }
};
</script>

<style lang="less">
.section-two {
  min-height: 100vh;
  padding-bottom: 60px;
}
.news-list {
  position: relative;
  padding-top: 60px;
  .news-list-item {
    position: relative;
    margin-bottom: 100px;
    height: 400px;
    z-index: 1;
    &:nth-child(even) {
      .left {
        right: 0;
        left: auto;
      }
      .right {
        left: 0;
        right: auto;
      }
    }
    .left {
      height: 400px;
      width: 682px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      overflow: hidden;
      &:hover {
        img {
          transform: scale(1.2);
          filter: blur(0px);
        }
      }
      img {
        width: 100%;
        height: 100%;
        transition: all 0.5s ease-in-out;
        filter: blur(0.5px);
      }
    }
    .right {
      height: 360px;
      width: 520px;
      position: absolute;
      right: 0;
      top: 20px;
      border: 1px solid #eaeaea;
      padding-left: 100px;
      padding-right: 60px;
      .time {
        color: #999;
        margin-bottom: 10px;
      }
      .title {
        font-size: 18px;
        color: #111;
        margin-bottom: 10px;
      }
      .cont {
        font-size: 14px;
        color: #555;
      }
    }
  }
}
#pager {
  text-align: center;
  margin: 70px 0 0;
  position: relative;
}
</style>
