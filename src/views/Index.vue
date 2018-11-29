<template>
  <div class="index">
    <section class="first">
      <div id="scene" class="bg">
        <img data-depth="0.2" class="img" :src="img" alt="" />
      </div>
      <div class="vibrant"></div>
    </section>
  </div>
</template>

<script>
import Parallax from "parallax-js";
import { getImg } from "../ajax/api";
export default {
  name: "index",
  data() {
    return {
      img: ""
    };
  },
  mounted() {
    this._getImg();
    this.initScene();
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
    }
  }
};
</script>

<style lang="less">
.index {
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
  }
}
</style>
