<template>
  <div class="yuki-dialog-black-mask">
    <div class="yuki-alert">
      <div class="yuki-alert-head"></div>
      <div class="yuki-alert-cont" v-html="mes"></div>
      <div class="yuki-alert-foot">
        <button class="ok danger" @click.stop="closeAlert">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "alert",
  props: {
    mes: String,
    callback: Function
  }
};
</script>

<style lang="less">
@import "../../assets/styles/dialog";
.yuki-alert {
  width: 400px;
  background: #2e3846;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 6px;
  &-head {
  }
  &-cont {
    padding: 20px 0;
    color: #ffffff;
  }
  &-foot {
    display: flex;
    justify-content: center;
    button {
      min-width: 150px;
      max-width: 250px;
      display: inline-block;
      margin: 1em;
      padding: 1em 2em;
      border: 0;
      background: 0 0;
      vertical-align: middle;
      position: relative;
      z-index: 1;
      -webkit-backface-visibility: hidden;
      -moz-osx-font-smoothing: grayscale;
      background: #795aac;
      color: #ffffff;
      overflow: hidden;
      box-shadow: 0 0 4px -2px rgba(0, 0, 0, 0.6);
      border-radius: 40px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        background-color: #3e4b5d !important;
      }
      &.danger {
        background-color: #f44a56;
      }
    }
  }
}
</style>
