<template>
  <div class="blog">
    <div class="blog-header__progress"></div>
    <HeadBar></HeadBar>
    <!-- banner -->
    <div class="cont">
      <!-- <div class="mouse"></div> -->
      <div class="app">
        <div class="app__bgimg">
          <div class="app__bgimg-image app__bgimg-image--1"></div>
          <div class="app__bgimg-image app__bgimg-image--2"></div>
        </div>
        <div class="app__img">
          <img
            onmousedown="return false"
            src="../../assets/images/blog/whiteTest4.png"
            alt="city"
          />
        </div>
        <div class="app__text app__text--1">
          <div class="app__text-line app__text-line--4">旅行见闻专题</div>
          <div class="app__text-line app__text-line--3">跟着博主</div>
          <div class="app__text-line app__text-line--2">
            一起走遍世界各地吧(做梦)
          </div>
          <div class="app__text-line app__text-line--1">
            <img src="../../assets/images/blog/opus-attachment.png" alt="" />
          </div>
        </div>
        <div class="app__text app__text--2">
          <div class="app__text-line app__text-line--4">各种番剧推荐</div>
          <div class="app__text-line app__text-line--3">不经典，不推荐！</div>
          <div class="app__text-line app__text-line--2">
            这是博主看过的觉得非常好看的番！
          </div>
          <div class="app__text-line app__text-line--1">
            <img src="../../assets/images/blog/opus-attachment.png" alt="" />
          </div>
        </div>
      </div>
      <div class="pages">
        <ul class="pages__list">
          <li
            data-target="1"
            class="pages__item pages__item--1 page__item-active"
          ></li>
          <li data-target="2" class="pages__item pages__item--2"></li>
        </ul>
      </div>
    </div>
    <!-- banner 结束 -->
    <!-- 内容 -->
    <div class="blog-content">
      <div class="container">
        <Row :gutter="16">
          <Cols span="16">
            <div class="blog-content__left">
              <div class="blog-content__left__list">
                <div
                  @click="go('blog', { id: item._id });"
                  v-for="(item, index) in list"
                  :key="index"
                  class="blog-content__left__list__item"
                >
                  <div class="blog-content__left__list__item--1">
                    <img :src="item.image" alt="" />
                  </div>
                  <div class="blog-content__left__list__item--2">
                    <div class="blog-content__left__list__item--2__title">
                      {{ item.title }}
                    </div>
                    <div class="blog-content__left__list__item--2__intro">
                      {{ item.desc }}
                    </div>
                  </div>
                  <div
                    flex
                    justify="between"
                    items="center"
                    class="blog-content__left__list__item--3"
                  >
                    <div class="avatar">
                      <img
                        src="../../assets/images/touxiang.png"
                        width="25"
                        height="25"
                      />
                      <span>凤凰院凶真</span>
                    </div>
                    <div flex="" items="center" box="4" class="tags">
                      <a> <i class="iconfont icon-tag"></i> </a>
                      <a
                        v-for="(tag, tag_index) in item.tags"
                        :key="tag_index"
                        >{{ tag }}</a
                      >
                    </div>
                    <div flex="" items="center" box="2" class="time">
                      <i class="iconfont icon-shijian"></i>
                      <span>{{ item.createdAt | getDate("year") }}</span>
                    </div>
                    <div flex="" items="center" class="discuss">
                      <i class="iconfont icon-liuyan"></i> <span>23</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="pager"
                style="text-align: center;margin: 70px 0 0;position: relative;"
              >
                <FrameBtn @click="_getNews" :text="loadMoreText"></FrameBtn>
              </div>
            </div>
          </Cols>
          <Cols span="8">
            <div class="blog-content__right">
              <div class="widget widget__search">
                <input class="search__input" type="text" placeholder="搜索">
              </div>
              <div class="widget">
                <div class="widget__title">热门文章</div>
              </div>
              <div class="widget">
                <div class="widget__title">最新文章</div>
              </div>
              <div class="widget">
                <div class="widget__title">随机文章</div>
              </div>
            </div>
          </Cols>
        </Row>
      </div>
    </div>
    <!-- 内容结束 -->
  </div>
</template>

<script>
import HeadBar from "./components/HeadBar";
import $ from "../../lib/classie";
import { getNews } from "../../ajax/api";
import FrameBtn from "../../components/public/FrameBtn/FrameBtn";
export default {
  name: "Blog",
  data() {
    return {
      page: 1,
      limit: 10,
      list: [],
      loadMoreText: "加载更多",
      hasMore: true,
      show_modal: false,
      current: "",
      id: "",
      show_detail: false
    };
  },
  components: {
    HeadBar,
    FrameBtn
  },
  mounted() {
    this.init_anime();
    this._getNews();
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
    init_anime() {
      let $app = document.querySelector(".app");
      let animation = true;
      let curSlide = 1;
      let scrolledUp = void 0,
        nextSlide = void 0;
      let pagination = function(slide, target) {
        animation = true;
        if (target === undefined) {
          nextSlide = scrolledUp ? slide - 1 : slide + 1;
        } else {
          nextSlide = target;
        }
        $.addClass(
          document.querySelector(".pages__item--" + nextSlide),
          "page__item-active"
        );
        $.removeClass(
          document.querySelector(".pages__item--" + slide),
          "page__item-active"
        );
        $.toggleClass($app, "active");
        setTimeout(() => {
          animation = false;
        }, 3000);
      };
      setTimeout(() => {
        $.addClass($app, "initial");
      }, 500);
      setTimeout(() => {
        animation = false;
      }, 4500);
      let dom = document.querySelectorAll(".pages__item");
      for (let i = 0; i < dom.length; i++) {
        dom[i].addEventListener("click", function() {
          if ($.hasClass(this, "page__item-active")) return;
          if (animation) return;
          // + 号是转化成数字
          let target = +this.getAttribute("data-target");
          pagination(curSlide, target);
          curSlide = target;
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/var";
@import "../../assets/styles/mixins";
.blog {
  .blog-header {
    .blog-header__progress {
      width: 100%;
      height: 2px;
      background: #29d;
      -webkit-animation: hue 20s infinite linear;
    }
  }
  .blog-content {
    background-color: @background_color;
    min-height: 2000px;
    padding: 20px 0;
    &__left {
      min-height: 2000px;
      &__list {
        &__item {
          background-color: #fff;
          margin-bottom: 16px;
          cursor: pointer;
          &--1 {
            .fixed-aspect-rations();
            background-color: #e800a4;
            height: 0;
            position: relative;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
            &:after {
              .over-lay;
            }
          }
          &--2 {
            padding: 20px;
            position: relative;
            &:after {
              .bottom-line();
            }
            &:hover {
              .blog-content__left__list__item--2__title {
                text-indent: 15px;
                color: #e800a4;
              }
            }
            &__title {
              font-size: 18px;
              color: @title_color;
              margin-bottom: 10px;
              transition: all 0.1s ease-in-out;
            }
            &__intro {
              color: @info_color;
              .line-clamp();
            }
          }
          &--3 {
            padding: 10px 20px;
            height: 45px;
            line-height: 25px;
            font-size: 13px;
            color: @sub_color;
            > div:not(:nth-last-child(1)) {
              position: relative;
              margin-right: 20px;
              &:after {
                .right-line();
              }
            }
            .avatar {
              padding-right: 20px;
            }
            .tags {
              a {
                color: @sub_color;
                margin-right: 10px;
              }
            }
            i {
              font-size: 18px;
              /*vertical-align: middle;*/
              color: @sub_color;
              margin-right: 5px;
            }
          }
        }
      }
    }
    &__right {
      min-height: 1000px;
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
      .widget.widget__search {
        padding: 20px;
        .search__input {
          width: 100%;
          padding: 12px 24px;
          background-color: transparent;
          transition: all 250ms ease-in-out;
          font-size: 14px;
          line-height: 18px;
          color: #575756;
          background-image: url(http://mihaeltomic.com/codepen/input-search/ic_search_black_24px.svg);
          background-repeat: no-repeat;
          background-size: 18px 18px;
          background-position: 95% center;
          border-radius: 50px;
          border: 1px solid #575756;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        .search__input::placeholder {
          color: rgba(87, 87, 86, 0.8);
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .search__input:hover,
        .search__input:focus {
          padding: 12px 0;
          outline: 0;
          border: 1px solid transparent;
          border-bottom: 1px solid #575756;
          border-radius: 0;
          background-position: 100% center;
        }
      }
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
/*banner*/
@contBgClr: linear-gradient(to left bottom, #f2e3c6 0%, #a7a1a5 100%);
@appShadowClr: rgba(#000, 0.3);

.cont {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: @contBgClr;
  overflow: hidden;
}

.app {
  position: relative;
  min-width: 850px;
  height: 540px;
  box-shadow: 0 0 60px @appShadowClr;
  overflow: hidden;

  &__bgimg {
    position: absolute;
    top: 0;
    left: -2.5%;
    width: 105%;
    height: 100%;
    transition: transform 3.5s 770ms;

    &-image {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;

      &--1 {
        background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/city22222.jpg")
          center center no-repeat;
        background-size: cover;
      }

      &--2 {
        background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/forest.jpg")
          center center no-repeat;
        background-size: cover;
        opacity: 0;
        transition: opacity 0ms 1300ms;
        will-change: opacity;
      }
    }
  }

  &__text {
    position: absolute;
    right: 165px;
    top: 150px;
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    z-index: 1;
    cursor: pointer;
    &-line {
      transition: transform 1500ms 400ms, opacity 750ms 500ms;
      will-change: transform, opacity;
      user-select: none;
      .generate-columns00(-1);
      &--4 {
        font-size: 50px;
        font-weight: 700;
        color: #0a101d;
      }
      &--3 {
        font-size: 40px;
        font-weight: 300;
      }
      &--2 {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #0099cc;
      }
      &--1 {
        margin-top: 15px;
        img {
          width: 50px;
        }
      }
    }

    &--1 {
      .app__text-line {
        transform: translate3d(0, -125px, 0);
        opacity: 0;
      }
    }

    &--2 {
      right: initial;
      top: 250px;
      left: 80px;
      z-index: -1;
      transition: z-index 1500ms;

      .generate-columns0(-1);
    }
  }

  &__img {
    position: absolute;
    transform: translate3d(0, -750px, 0);
    width: 850px;
    height: 100%;
    transition: transform 3s cubic-bezier(0.6, 0.13, 0.31, 1.02);
    will-change: transform;

    img {
      min-width: 100%;
      user-select: none;
    }
  }
}

.initial {
  .app__img {
    transform: translate3d(0, 0, 0);
  }
  .app__text--1 {
    .generate-columns(4);
  }
}
.generate-columns00(@n, @i: -4) when (@i =< @n) {
  @abs: abs(@i);
  &--@{abs} {
    transition: transform 1500ms 2000ms + 100ms * (@i - 1),
      opacity 1500ms 2750ms + 250ms * (@i - 1);
  }
  .generate-columns00(@n, (@i + 1));
}
.generate-columns0(@n, @i: -4) when (@i =< @n) {
  @abs: abs(@i);
  .app__text-line--@{abs} {
    opacity: 0;
    transition: transform 1500ms 300ms + 75ms * (@i - 1),
      opacity 400ms 500ms + 75ms * (@i - 1);
  }
  .generate-columns0(@n, (@i + 1));
}
.generate-columns(@n, @i: 1) when (@i <= @n) {
  .app__text-line--@{i} {
    transform: translate3d(0, 0, 0);
    transition: transform 1500ms 1400ms + 75ms * (@i - 1),
      opacity 400ms 1600ms + 75ms * (@i - 1);
    opacity: 1;
  }
  .generate-columns(@n, (@i + 1));
}
.generate-columns-active(@n, @i: 1) when (@i =< @n) {
  .app__text-line--@{i} {
    transform: translate3d(0, -125px, 0);
    transition: transform 1500ms 300ms + 75ms * (@i - 1),
      opacity 400ms 500ms + 75ms * (@i - 1);
    opacity: 0;
  }
  .generate-columns-active(@n, (@i + 1));
}
.generate-columns2(@n, @i: 1) when (@i =< @n) {
  .app__text-line--@{i} {
    transform: translate3d(0, -125px, 0);
    transition: transform 2500ms 1100ms + 75ms * (@i - 1),
      opacity 1300ms 1300ms + 275ms * (@i - 1);
    opacity: 1;
  }
  .generate-columns2(@n, (@i + 1));
}

.active {
  .app__bgimg {
    transform: translate3d(10px, 0, 0) scale(1.05);
    transition: transform 5s 850ms ease-in-out;
    .app__bgimg-image--2 {
      opacity: 1;
      transition: opacity 0ms 1500ms;
    }
  }
  .app__img {
    transition: transform 3s cubic-bezier(0.6, 0.13, 0.31, 1.02);
    transform: translate3d(0, -1410px, 0);
  }
  .app__text--1 {
    z-index: -1;
    transition: z-index 0ms 1500ms;
    .generate-columns-active(4);
  }
  .app__text--2 {
    z-index: 1;
    .generate-columns2(4);
  }
}

.mouse {
  position: relative;
  margin-right: 20px;
  min-width: 50px;
  height: 80px;
  border-radius: 30px;
  border: 5px solid rgba(255, 255, 255, 0.8);
  &:after {
    content: "";
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    animation: scroll 1s infinite alternate;
    @keyframes scroll {
      100% {
        transform: translate(-50%, 15px);
      }
    }
  }
}

.pages {
  margin-left: 20px;
  &__list {
    list-style-type: none;
  }
  &__item {
    position: relative;
    margin-bottom: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid #fff;
    cursor: pointer;
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0, 0);
      width: 75%;
      height: 75%;
      border-radius: 50%;
      background-color: #fff;
      opacity: 0;
      transition: 500ms;
    }
    &:hover:after {
      transform: translate(-50%, -50%) scale(1, 1);
      opacity: 1;
    }
  }
}

.page__item-active {
  &:after {
    transform: translate(-50%, -50%) scale(1, 1);
    opacity: 1;
  }
}

.icon-link {
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 50px;
  img {
    width: 100%;
    vertical-align: top;
  }
  &--twitter {
    left: auto;
    right: 5px;
  }
}
/*banner 结束*/
</style>
