<template>
  <section id="container" class="intro-effect-push">
    <div class="first">
      <div id="scene" class="bg">
        <img data-depth="0.2" class="img" :src="img" alt="" />
      </div>
      <div class="vibrant"></div>
      <div class="text">
        <div class="text_skew">
          <span>Y</span> <span>u</span> <span>k</span> <span>i</span>
          <span>の</span> <span>世</span> <span>界</span>
        </div>
        <div class="welcome">
          <span>私</span> <span>の</span> <span>秘</span> <span>密</span>
          <span>基</span> <span>地</span> <span>に</span> <span>よ</span>
          <span>う</span> <span>こ</span> <span>そ</span>
        </div>
        <div class="tips"></div>
        <div class="mouse"></div>
        <div class="line line1 lineY"></div>
        <div class="line line2 lineX"></div>
        <div class="line line3 lineY"></div>
        <div class="line line4 lineX"></div>
      </div>
      <nav class="bt-menu" :class="{ 'bt-menu-open': open }">
        <a class="bt-menu-trigger" @click="openMenu"> <span></span> </a>
        <ul class="bt-menu-right">
          <li>
            <a flex justify="center" items="center" href="#" class="bt-icon">
              <i class="iconfont icon-shouye"></i>
            </a>
          </li>
          <li>
            <a flex justify="center" items="center" href="#" class="bt-icon">
              <i class="iconfont icon-xiebaogao"></i>
            </a>
          </li>
          <li>
            <a flex justify="center" items="center" href="#" class="bt-icon">
              <i class="iconfont icon-github"></i>
            </a>
          </li>
          <li>
            <a flex justify="center" items="center" href="#" class="bt-icon">
              <i class="iconfont icon-archive"></i>
            </a>
          </li>
          <li>
            <a flex justify="center" items="center" href="#" class="bt-icon">
              <i class="iconfont icon-i-mail"></i>
            </a>
          </li>
        </ul>
        <ul class="bt-menu-bottom">
          <li>
            <a flex justify="center" items="center" href="#" class="bt-icon">
              <i class="iconfont icon-example"></i>
            </a>
          </li>
          <li>
            <a flex justify="center" items="center" href="#" class="bt-icon">
              <i class="iconfont icon-yinle"></i>
            </a>
          </li>
          <li>
            <a flex justify="center" items="center" href="#" class="bt-icon">
              <i class="iconfont icon-liuyan"></i>
            </a>
          </li>
          <li>
            <a flex justify="center" items="center" href="#" class="bt-icon">
              <i class="iconfont icon-wode"></i>
            </a>
          </li>
        </ul>
      </nav>
      <!--<div class="skew">-->
        <!--<div class="skew-item" v-for="i in 10" :key="i"></div>-->
      <!--</div>-->
      <Down></Down>
    </div>
  </section>
</template>

<script>
import Parallax from "parallax-js";
import { getImg } from "../../ajax/api";
import anime from "animejs";
import Down from "../../components/public/Down/Down";
import Typed from "typed.js";
import classie from "../../lib/classie";
export default {
  name: "Section-one",
  data() {
    return {
      img: "",
      open: false
    };
  },
  components: {
    Down
  },
  mounted() {
    this._getImg();
    this.initScene();
    this.initAnime();
    // this.initSkew();
    this.initTyped();
    // this.initScrollAnime();
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
        translateY: ["-100%", 0],
        duration: 800,
        easing: "linear"
      });
      anime({
        targets: document.querySelector(".line3"),
        opacity: [{ value: 0 }, { value: 1 }],
        translateY: ["100%", 0],
        duration: 800,
        easing: "linear"
      });
      anime({
        targets: document.querySelector(".line2"),
        opacity: [{ value: 0 }, { value: 1 }],
        translateX: ["-100%", 0],
        duration: 800,
        easing: "linear"
      });
      anime({
        targets: document.querySelector(".line4"),
        opacity: [{ value: 0 }, { value: 1 }],
        translateX: ["100%", 0],
        duration: 800,
        easing: "linear"
      });

      let basicTimeline = anime.timeline();
      basicTimeline.add({
        targets: ".title",
        opacity: 1,
        top: [{ value: "25%", duration: 800 }],
        duration: 800,
        easing: "easeOutExpo"
      });
      anime({
        targets: ".welcome span",
        delay: function(el, i) {
          return i * 200;
        },
        duration: 500,
        easing: "easeOutExpo",
        // direction: "alternate",
        scale: [10, 1.5],
        paddingLeft: 15,
        paddingRight: 15,
        opacity: 1
        // loop: true
      });
      // TLParamsInheritance.add({
      //   scale: 1.5,
      //   paddingLeft: 15,
      //   paddingRight: 15,
      //   opacity: 1
      // });
    },
    openMenu() {
      this.open = !this.open;
      if (this.open) {
        anime({
          targets: ".bt-menu-right li",
          duration: 300,
          easing: "easeOutExpo",
          opacity: 1,
          translateY: function(el, i) {
            return (i + 1) * -70;
          }
        });
        anime({
          targets: ".bt-menu-bottom li",
          duration: 300,
          easing: "easeOutExpo",
          opacity: 1,
          translateX: function(el, i) {
            return (i + 1) * -70;
          }
        });
      } else {
        anime({
          targets: ".bt-menu-right li",
          duration: 300,
          opacity: 0,
          easing: "easeOutExpo",
          translateY: 0
        });
        anime({
          targets: ".bt-menu-bottom li",
          duration: 300,
          easing: "easeOutExpo",
          opacity: 0,
          translateX: 0
        });
      }
    },
    // 初始化方块动画
    initSkew() {
      let items = document.querySelectorAll(".skew-item");
      for (let i = 0; i < items.length; i++) {
        console.log(items[i]);
        items[i].style.left = window.innerWidth * Math.random() + "px";
        items[i].style.bottom = -100 * Math.random() + "px";
        items[i].style.transform = `rotate(${300 * Math.random()}deg)`;
      }
      anime({
        targets: items,
        duration: 10000,
        easing: "linear",
        bottom: window.innerHeight + "px",
        loop: true,
        rotate: function() {
          return 300 * Math.random() + "deg";
        }
      });
    },
    // 打字效果
    initTyped() {
      let options = {
        strings: [
          "滚动鼠标滚轮发现新的世界....",
          "吾之名为，凤凰院凶真！改变世界构造的支配者!",
          "未来研究所的创始人！No.001！"
        ],
        fadeOut: true,
        typeSpeed: 40,
        loop: true
      };
      new Typed(".tips", options);
    },
    // 滚动动画
    initScrollAnime() {
      // left: 37, up: 38, right: 39, down: 40,
      // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
      var keys = [32, 37, 38, 39, 40],
        wheelIter = 0;

      function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
      }

      function keydown(e) {
        for (var i = keys.length; i--; ) {
          if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
          }
        }
      }

      function touchmove(e) {
        preventDefault(e);
      }

      function wheel(e) {
        // for IE
        //if( ie ) {
        //preventDefault(e);
        //}
      }

      function disable_scroll() {
        window.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;
        document.body.ontouchmove = touchmove;
      }

      function enable_scroll() {
        window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
      }

      let docElem = window.document.documentElement,
        scrollVal,
        isRevealed,
        noscroll,
        isAnimating,
        container = document.getElementById("container"),
        trigger = container.querySelector(".arrow");
      console.log(trigger);
      // 获取滚动距离
      function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
      }

      function scrollPage() {
        scrollVal = scrollY();

        if (noscroll) {
          if (scrollVal < 0) return false;
          // keep it that way
          window.scrollTo(0, 0);
        }

        if (classie.has(container, "notrans")) {
          classie.remove(container, "notrans");
          return false;
        }

        if (isAnimating) {
          return false;
        }

        if (scrollVal <= 0 && isRevealed) {
          toggle(0);
        } else if (scrollVal > 0 && !isRevealed) {
          toggle(1);
        }
      }
      function toggle(reveal) {
        isAnimating = true;

        if (reveal) {
          classie.add(container, "modify");
        } else {
          noscroll = true;
          disable_scroll();
          classie.remove(container, "modify");
        }

        // simulating the end of the transition:
        setTimeout(function() {
          isRevealed = !isRevealed;
          isAnimating = false;
          if (reveal) {
            noscroll = false;
            enable_scroll();
          }
        }, 1200);
      }

      // refreshing the page...
      let pageScroll = scrollY();
      noscroll = pageScroll === 0;
      disable_scroll();
      if (pageScroll) {
        isRevealed = true;
        classie.add(container, "notrans");
        classie.add(container, "modify");
      }
      window.addEventListener("scroll", scrollPage);
      trigger.addEventListener("click", function() {
        toggle("reveal");
      });
    }
  }
};
</script>

<style lang="less">
.first {
  height: 100vh;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  min-height: 560px;
  width: 100%;
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
    background-color: rgba(0, 0, 0, 0.6);
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
    z-index: 10;
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
    .welcome {
      width: 100%;
      text-align: center;
      font-size: 40px;
      color: #fff;
      position: absolute;
      top: 45%;
      perspective: 1000px;
      span {
        display: inline-block;
        opacity: 0;
      }
    }
    .tips {
      width: 100%;
      text-align: center;
      font-size: 25px;
      color: #fff;
      position: absolute;
      top: 60%;
    }
  }
}

.bt-menu {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  border-width: 0;
  border-style: solid;
  border-color: #333;
  background-color: transparent;
  -webkit-backface-visibility: hidden;
  transition: border-width 0.3s, background-color 0.3s, height 0s 0.3s;
  a {
    display: block;
  }
  &.bt-menu-open {
    height: 100%;
    border-width: 30px 90px 90px 30px;
    background-color: rgba(0, 0, 0, 0.3);
    -webkit-transition: border-width 0.3s, background-color 0.3s;
    transition: border-width 0.3s, background-color 0.3s;
  }
  ul {
    position: fixed;
    margin: 0;
    padding: 0;
    list-style: none;
    width: 90px;
    height: 90px;
    &:first-of-type {
      right: 0;
      bottom: 0;
    }
    &:nth-of-type(2) {
      right: 0;
      bottom: 0;
    }
    li {
      width: 90px;
      height: 90px;
      line-height: 90px;
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      a {
        color: #fff;
        i {
          font-size: 30px;
        }
      }
    }
  }
}
.bt-menu-trigger {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  display: block;
  width: 50px;
  height: 50px;
  cursor: pointer;
  span {
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    width: 100%;
    height: 4px;
    background-color: #fff;
    font-size: 0;
    user-select: none;
    transition: background-color 0.3s;
    &:before,
    &:after {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      content: "";
      transition: transform 0.3s;
    }
    &:before {
      transform: translateY(-250%);
    }
    &:after {
      transform: translateY(250%);
    }
  }
}
.bt-menu-open .bt-menu-trigger span {
  background-color: transparent;
}
.bt-menu-open .bt-menu-trigger span:before {
  transform: translateY(0) rotate(45deg);
}
.bt-menu-open .bt-menu-trigger span:after {
  transform: translateY(0) rotate(-45deg);
}
/**/
.skew {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  .skew-item {
    position: absolute;
    width: 80px;
    height: 80px;
    background-image: linear-gradient(124deg, #d8da69, #82ff59);
    opacity: 0.2;
  }
}
/**/
.text_skew {
  display: flex;
  justify-content: center;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 20px;
}
.text_skew:hover {
  transform: rotateX(15deg) translateY(-20%);
}
.text_skew:hover span {
  color: #ccc;
}
.text_skew:hover span:nth-child(odd) {
  transform: skewY(15deg);
}
.text_skew:hover span:nth-child(even) {
  transform: skewY(-15deg);
  background-color: #f9f9f9;
  color: #a6a6a6;
}
.text_skew > span {
  display: block;
  background-color: #fff;
  width: 60px;
  height: 60px;
  line-height: 60px;
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
  box-shadow: 0 40px 50px rgba(0, 0, 0, 0.1);
}
.text_skew > span:first-child {
  border-radius: 5px 0 0 5px;
}

/* -------------------------- */
/* Push */
/* -------------------------- */
.intro-effect-push:not(.notrans) .header,
.intro-effect-push:not(.notrans) > .title,
.intro-effect-push:not(.notrans) .content > div {
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, transform;
  -webkit-transition-duration: 1s;
  transition-duration: 1s;
}

.intro-effect-push:not(.notrans) .header {
  -webkit-transition-timing-function: cubic-bezier(0.7,0,0.3,1);
  transition-timing-function: cubic-bezier(0.7,0,0.3,1);
  -webkit-transition-duration: 1.2s;
  transition-duration: 1.2s;
}

.intro-effect-push .codrops-demos a {
  color: #108576;
}

.intro-effect-push .header {
  position: absolute;
  z-index: 1500;
}

.intro-effect-push > .title {
  position: relative;
  top: auto;
  left: auto;
  padding: 6em 1em 2em;
}

.intro-effect-push .content > div {
  margin-top: 50px;
  color: #b2b2c0;
}

.intro-effect-push > .title,
.intro-effect-push .content > div {
  -webkit-transform: translateY(400px);
  transform: translateY(400px);
  opacity: 0;
}

.intro-effect-push.modify > .title,
.intro-effect-push.modify .content > div {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
}

.intro-effect-push.modify .header {
  opacity: 0;
  -webkit-transform: translateY(-100%) scale(0.9);
  transform: translateY(-100%) scale(0.9);
}
</style>
