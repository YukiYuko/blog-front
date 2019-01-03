<template>
  <div class="item1">
    <div class="time">
      <div>2018/10</div>
      <div>23&nbsp;&nbsp;周二</div>
    </div>
    <div class="title">iPhone微信二维码长按识别不了?</div>
    <div class="image">
      <img src="../../../assets/images/blog/a2.png" alt="" />
    </div>
    <div class="desc">
      前言
      微信提供图片长按识别二维码跳转的功能，但是发现有时候在iPhone下并不是所有图都可以出现识别二维码。但是在Android的设备下可识别，这里究竟是什么原因呢？
      识别方式 微信 6.7.3 Android 取整张图片分析，有二维码即可识别。 iOS
      [crayon-5c2d8772aef2c426872991/]
      当图片的宽高或高宽比例超过竖屏2倍，采用的方案是截取当前屏幕分析，两端策略不一致。
      所以当长图超过一定比例，二维码没在屏幕可视区域时，不会出现识别二维码。 测
    </div>
    <div flex justify="between" items="center" class="text">
      <div class="avatar" box="1">
        <img src="../../../assets/images/touxiang.png" width="25" height="25" />
        <span>凤凰院凶真</span>
      </div>
      <div flex="" items="center" box="4" class="tags">
        <a> <i class="iconfont icon-tag"></i> </a>
        <a v-for="(tag, tag_index) in ['aa', 'bb', 'cc']" :key="tag_index">{{
          tag
        }}</a>
      </div>
      <div flex="" items="center" box="1" class="discuss">
        <div><i class="iconfont icon-liuyan"></i> <span>10</span></div>
        <div><i class="iconfont icon-hot"></i> <span>12</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item1"
};
</script>

<style lang="less" scoped>
@import "../../../assets/styles/var";
@import "../../../assets/styles/mixins";
.item1 {
  background-color: #ffffff;
  color: @title_color;
  position: relative;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    &:before{
      width: 100%;
    }
  }
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: @keyword_color;
    transition: all 0.2s;
  }
  .time {
    position: absolute;
    top: 68px;
    left: -50px;
    width: 70px;
    height: 45px;
    line-height: 1;
    background: #e5e5e5;
    filter: alpha(opacity=80);
    background: hsla(0, 0%, 80%, 0.4);
    z-index: 1;
    text-align: center;
    &:after {
      content: "";
      position: absolute;
      top: 45px;
      left: 0;
      border-color: transparent #bbb transparent transparent;
      border-style: solid;
      border-width: 0 50px 20px 0;
      height: 0;
      width: 0;
    }
    div {
      float: left;
      font-size: 12px;
      line-height: 22px;
      color: #666;
      width: 100%;
    }
  }
  .title {
    padding: 15px 15px 0;
    font-size: 18px;
    margin-bottom: 35px;
    -webkit-box-reflect: below 0 -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(10%, transparent), to(hsla(0, 0%, 100%, 0.2)));
  }
  .image {
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
  .desc {
    line-height: 20px;
    padding: 15px;
    color: @info_color;
  }
  .text {
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    border-top: 1px solid @border_color;
    color: @sub_color;
    > div:not(:last-child) {
      border-right: 1px solid @border_color;
    }
    > div {
      padding-left: 15px;
    }
    .tags {
      a {
        color: @sub_color;
        margin-right: 10px;
      }
    }
    .discuss {
      div {
        margin-right: 10px;
      }
    }
  }
}
</style>
