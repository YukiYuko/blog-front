<template>
  <section class="first">
    <div id="scene" class="bg">
      <img data-depth="0.2" class="img" :src="img" alt="" />
    </div>
    <div class="vibrant"></div>
    <div class="text">
      <div class="title">Yuki</div>
      <div class="welcome">私の秘密基地にようこそ</div>
      <div class="mouse"></div>
      <div class="line line1 lineY"></div>
      <div class="line line2 lineX"></div>
      <div class="line line3 lineY"></div>
      <div class="line line4 lineX"></div>
    </div>
  </section>
</template>

<script>
import Parallax from "parallax-js";
import { getImg } from "../../ajax/api";
import anime from "animejs";
export default {
  name: "Section-one",
  data() {
    return {
      img: ""
    };
  },
  mounted() {
    this._getImg();
    this.initScene();
    this.initAnime();
  },
  methods: {
    initScene() {
      let scene = document.getElementById("scene");
      let img = document.querySelector(".img");
      img.style.width = window.innerWidth + 100 + "px";
      img.style.height = window.innerHeight + 100 + "px";
      img.style.marginLeft = "-50px";
      img.style.marginTop = "-50px";
      new Parallax(scene);
    },
    _getImg() {
      getImg({ w: 1920, h: 1080 }).then(res => {
        this.img = res.data.url;
      });
    },
    initAnime() {
      anime({
        targets: document.querySelector(".line1"),
        opacity: [{ value: 0 }, { value: 1 }],
        translateY: [
          { value: "-100%", duration: 0 },
          { value: 0, duration: 800 }
        ],
        duration: 800,
        easing: "linear"
      });
      anime({
        targets: document.querySelector(".line3"),
        opacity: [{ value: 0 }, { value: 1 }],
        translateY: [
          { value: "100%", duration: 0 },
          { value: 0, duration: 800 }
        ],
        duration: 800,
        easing: "linear"
      });
      anime({
        targets: document.querySelector(".line2"),
        opacity: [{ value: 0 }, { value: 1 }],
        translateX: [
          { value: "-100%", duration: 0 },
          { value: 0, duration: 800 }
        ],
        duration: 800,
        easing: "linear"
      });
      anime({
        targets: document.querySelector(".line4"),
        opacity: [{ value: 0 }, { value: 1 }],
        translateX: [
          { value: "100%", duration: 0 },
          { value: 0, duration: 800 }
        ],
        duration: 800,
        easing: "linear"
      });

      let basicTimeline = anime.timeline();
      basicTimeline
        .add({
          targets: ".title",
          opacity: 1,
          top: [{ value: "25%", duration: 800 }],
          duration: 800,
          easing: "easeOutExpo"
        })
        .add({
          targets: ".welcome",
          opacity: 1,
          top: [{ value: "45%", duration: 800 }],
          duration: 800,
          easing: "easeOutExpo"
        });
    }
  }
};
</script>

<style lang="less" scoped>
.first {
  height: 100vh;
  position: relative;
  overflow: hidden;
  .bg {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .vibrant {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    transform: skew(45deg) translateX(-55%);
  }
  .text {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .line {
      background-color: rgba(255, 255, 255, 0.6);
      position: absolute;
      opacity: 0;
    }
    .line1 {
      width: 1px;
      height: 80%;
      left: 20%;
      top: 10%;
    }
    .line3 {
      width: 1px;
      height: 80%;
      right: 20%;
      bottom: 10%;
    }
    .line2 {
      height: 1px;
      width: 80%;
      left: 10%;
      top: 20%;
      transform: translateX(-100%);
    }
    .line4 {
      height: 1px;
      width: 80%;
      left: 10%;
      bottom: 20%;
      transform: translateX(100%);
    }
    .title {
      text-align: center;
      font-size: 60px;
      color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
    .welcome {
      text-align: center;
      font-size: 40px;
      color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
}
</style>
