<template>
  <button @click="$emit('click');" class="button" :class="type">
    <slot> {{ text }} </slot>
  </button>
</template>

<script>
export default {
  name: "EffectBtn",
  props: {
    type: {
      type: String,
      default: "type1"
    },
    text: {
      type: String,
      default: "点击我"
    }
  }
};
</script>

<style lang="less" scoped>
.button {
  position: relative;
  width: 90px;
  height: 35px;
  line-height: 35px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  font-size: 14px;
}
.button.type1 {
  color: #566473;
}
.button.type1.type1::after,
.button.type1.type1::before {
  content: "";
  display: block;
  position: absolute;
  width: 20%;
  height: 20%;
  border: 2px solid;
  transition: all 0.6s ease;
  border-radius: 2px;
}
.button.type1.type1::after {
  bottom: 0;
  right: 0;
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: #566473;
  border-right-color: #566473;
}
.button.type1.type1::before {
  top: 0;
  left: 0;
  border-bottom-color: transparent;
  border-right-color: transparent;
  border-top-color: #566473;
  border-left-color: #566473;
}
.button.type1.type1:hover:after,
.button.type1.type1:hover:before {
  width: 100%;
  height: 100%;
}
.button.type2 {
  color: #16a085;
}
.button.type2.type2:after,
.button.type2.type2:before {
  content: "";
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #16a085;
  transition: all 0.3s ease;
  transform: scale(0.85);
}
.button.type2.type2:hover:before {
  top: 0;
  transform: scale(1);
}
.button.type2.type2:hover:after {
  transform: scale(1);
}
.button.type3 {
  color: #435a6b;
}
.button.type3.type3::after,
.button.type3.type3::before {
  content: "";
  display: block;
  position: absolute;
  width: 20%;
  height: 20%;
  border: 2px solid;
  transition: all 0.6s ease;
  border-radius: 2px;
}
.button.type3.type3::after {
  bottom: 0;
  right: 0;
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: #435a6b;
  border-right-color: #435a6b;
}
.button.type3.type3::before {
  top: 0;
  left: 0;
  border-bottom-color: transparent;
  border-right-color: transparent;
  border-top-color: #435a6b;
  border-left-color: #435a6b;
}
.button.type3.type3:hover:after,
.button.type3.type3:hover:before {
  border-bottom-color: #435a6b;
  border-right-color: #435a6b;
  border-top-color: #435a6b;
  border-left-color: #435a6b;
  width: 100%;
  height: 100%;
}

.button {
  &.normal {
    display: inline-block;
    font-size: 1em;
    -webkit-appearance: none;
    appearance: none;
    background-color: #ff0081;
    color: #fff;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    position: relative;
    transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
    box-shadow: 0 2px 25px rgba(255, 0, 130, 0.5);
    &:active {
      transform: scale(0.9);
      background-color: #e60074;
      box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
    }
  }
}
</style>
