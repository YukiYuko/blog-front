<template>
  <div class="index">
    <div class="index-item" flex wrap="wrap">
      <div
        flex=""
        items="center"
        :style="`background-image: url(${item.img})`"
        v-for="(item, index) in menu"
        :key="index"
        @click="go(item.url)"
      >
        <div class="major">
          <h3>{{ item.title }}</h3>
          <p>{{ item.intro }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import BackTop from "../../components/public/BackTop/BackTop";
export default {
  name: "index",
  data() {
    return {
      show: true,
      menu: [
        {
          img: require("../../assets/images/index/pic01.jpg"),
          title: "博客",
          intro: "一些知识，见闻，吐槽",
          url: "blogIndex" // 路由的名字
        },
        {
          img: require("../../assets/images/index/pic02.jpg"),
          title: "音乐",
          intro: "微型音乐播放器，自己喜欢的一些歌"
        },
        {
          img: require("../../assets/images/index/pic03.jpg"),
          title: "留言",
          intro: "客官说些什么吧~"
        },
        {
          img: require("../../assets/images/index/pic04.jpg"),
          title: "关于我",
          intro: "emmmm一个死宅而已~"
        },
        {
          img: require("../../assets/images/index/pic05.jpg"),
          title: "世界线",
          intro: "其实就是一个时间轴desu~"
        },
        {
          img: require("../../assets/images/index/pic06.jpg"),
          title: "例子",
          intro: "各种观摩大神的一些例子daze~"
        }
      ]
    };
  },
  components: {
    // BackTop
  },
  methods: {
    openDetail() {
      this.show = false;
    }
  }
};
</script>

<style scoped lang="less">
.index {
  .index-item {
    > div {
      height: 40vh;
      position: relative;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      overflow: hidden;
      transition: all 0.25s ease-in-out;
      padding: 4em;
      &:nth-child(odd) {
        width: 40%;
      }
      &:nth-child(even) {
        width: 60%;
      }
      &:nth-child(3n) {
        width: 60%;
      }
      &:nth-child(3n + 1) {
        width: 40%;
      }
      &:nth-child(1){
        h3{
          text-shadow: 0 0 5px #6fc3df, 0 0 10px #fff, 0 0 15px #fff;
        }
      }
      &:nth-child(2){
        h3{
          text-shadow: 0 0 5px #8d82c4, 0 0 10px #fff, 0 0 15px #fff;
        }
      }
      &:nth-child(3){
        h3{
          text-shadow: 0 0 5px #ec8d81, 0 0 10px #fff, 0 0 15px #fff;
        }
      }
      &:nth-child(4){
        h3{
          text-shadow: 0 0 5px #e7b788, 0 0 10px #fff, 0 0 15px #fff;
        }
      }
      &:nth-child(5){
        h3{
          text-shadow: 0 0 5px #8ea9e8, 0 0 10px #fff, 0 0 15px #fff;
        }
      }
      &:nth-child(6){
        h3{
          text-shadow: 0 0 5px #87c5a4, 0 0 10px #fff, 0 0 15px #fff;
        }
      }
      &:nth-child(1):before {
        background-color: #6fc3df;
      }
      &:nth-child(2):before {
        background-color: #8d82c4;
      }
      &:nth-child(3):before {
        background-color: #ec8d81;
      }
      &:nth-child(4):before {
        background-color: #e7b788;
      }
      &:nth-child(5):before {
        background-color: #8ea9e8;
      }
      &:nth-child(6):before {
        background-color: #87c5a4;
      }
      &:hover:before {
        opacity: 0;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0.8;
        transition: all 0.25s ease-in-out;
        z-index: 2;
      }
      &:after {
        content: "";
        background-color: rgba(36, 41, 67, 0.25);
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
      }
      &:hover{
        .major{
          h3{
            transform: translateY(-10px);
          }
          p{
            transform: translateY(10px);
          }
        }
      }
      .major {
        color: #fff;
        position: relative;
        z-index: 3;
        h3 {
          font-size: 1.75em;
          font-family: Audiowide;
          transition: all 0.2s ease-in-out;
          &:after {
            content: "";
            background-color: #fff;
            display: block;
            height: 2px;
            margin: 0.325em 0 0.5em;
            width: 100%;
            transition: all 0.2s ease-in-out;
          }
        }
        p {
          font-size: 0.7em;
          font-weight: 600;
          letter-spacing: 0.25em;
          margin-bottom: 0;
          text-transform: uppercase;
          transition: all 0.2s ease-in-out;
        }
      }
    }
  }
}
@keyframes neon3 {
  0% {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ffdd1b,
      0 0 70px #ffdd1b, 0 0 80px #ffdd1b, 0 0 100px #ffdd1b, 0 0 150px #ffdd1b;
  }
  100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ffdd1b,
      0 0 35px #ffdd1b, 0 0 40px #ffdd1b, 0 0 50px #ffdd1b, 0 0 75px #ffdd1b;
  }
}
</style>
