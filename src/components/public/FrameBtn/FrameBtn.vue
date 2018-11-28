<template>
  <a class="frame-btn">
    <span class="frame-btn__outline frame-btn__outline--tall">
      <span class="frame-btn__line frame-btn__line--tall"></span>
      <span class="frame-btn__line frame-btn__line--flat"></span>
    </span>
    <span class="frame-btn__outline frame-btn__outline--flat">
      <span class="frame-btn__line frame-btn__line--tall"></span>
      <span class="frame-btn__line frame-btn__line--flat"></span>
    </span>
    <span class="frame-btn__solid"></span>
    <span class="frame-btn__text">Link Start !</span>
  </a>
</template>

<script>
export default {
  name: "FrameBtn"
};
</script>

<style scoped>
.frame-btn {
  line-height: 10px;
  display: inline-block;
  padding: 25px 30px;
  font-size: 10px;
  letter-spacing: 3px;
  text-decoration: none;
  position: relative;
  cursor: pointer;
}
.frame-btn__text {
  color: #b2876f;
  font-weight: bold;
  text-transform: uppercase;
  -webkit-transition: 300ms ease;
  transition: 300ms ease;
  position: relative;
}
.frame-btn:hover .frame-btn__text {
  color: white;
}
.frame-btn__solid {
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  background-color: #b2876f;
  width: calc(100% - (5px * 4));
  height: calc(100% - (5px * 4));
  -webkit-transform-origin: 50%;
  transform-origin: 50%;
  -webkit-transform: scale(0.85);
  transform: scale(0.85);
  opacity: 0;
  -webkit-transition: 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.frame-btn:hover .frame-btn__solid {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
.frame-btn__outline {
  position: absolute;
  top: 0;
  left: 0;
}
.frame-btn__outline--tall {
  margin: 0 5px;
  width: calc(100% - (5px * 2));
  height: 100%;
}
.frame-btn__outline--flat {
  margin: 5px 0;
  height: calc(100% - (5px * 2));
  width: 100%;
}
.frame-btn__line {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.frame-btn__line--tall:before,
.frame-btn__line--tall:after {
  height: 100%;
  width: 1px;
  top: 0;
}
.frame-btn:hover .frame-btn__outline--flat .frame-btn__line--tall:before,
.frame-btn:hover .frame-btn__outline--flat .frame-btn__line--tall:after {
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
}
.frame-btn:hover .frame-btn__outline--tall .frame-btn__line--tall:before,
.frame-btn:hover .frame-btn__outline--tall .frame-btn__line--tall:after {
  margin: 5px 0;
  height: calc(100% - (5px * 2));
}
.frame-btn__line--tall:before {
  left: 0;
}
.frame-btn__line--tall:after {
  right: 0;
}
.frame-btn__line--flat:before,
.frame-btn__line--flat:after {
  width: 100%;
  height: 1px;
  left: 0;
}
.frame-btn:hover .frame-btn__outline--tall .frame-btn__line--flat:before,
.frame-btn:hover .frame-btn__outline--tall .frame-btn__line--flat:after {
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
}
.frame-btn:hover .frame-btn__outline--flat .frame-btn__line--flat:before,
.frame-btn:hover .frame-btn__outline--flat .frame-btn__line--flat:after {
  margin: 0 5px;
  width: calc(100% - (5px * 2));
}
.frame-btn__line--flat:before {
  top: 0;
}
.frame-btn__line--flat:after {
  bottom: 0;
}
.frame-btn__line:before,
.frame-btn__line:after {
  content: "";
  display: block;
  position: absolute;
  background-color: #b2876f;
  -webkit-transition: 800ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: 800ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.frame-btn:hover .frame-btn__line:before,
.frame-btn:hover .frame-btn__line:after {
  -webkit-transition: 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>
