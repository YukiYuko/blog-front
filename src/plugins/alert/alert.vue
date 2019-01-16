<template>
  <div class="yuki-alert">
    <div class="yuki-alert-box">
      <div class="yuki-alert-box-head"></div>
      <div class="yuki-alert-box-cont">您确定要删除吗</div>
      <div class="yuki-alert-box-foot">
        <button class="exit">取消</button>
        <button class="ok danger">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "alert"
};
</script>

<style lang="less">
.yuki-alert {
  background: rgba(00, 00, 00, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  &-box {
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
}
</style>
