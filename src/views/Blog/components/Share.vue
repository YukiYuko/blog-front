<template>
  <div class="share">
    <ul>
      <li @click="$emit('likeHandle')">
        <Tooltip content="喜欢" placement="right">
          <i class="iconfont icon-dianzan"></i>
        </Tooltip>
      </li>
      <li class="active" @click="$emit('commentsHandle')">
        <Tooltip content="评论" placement="right">
          <i class="iconfont icon-pinglun"></i> <span>{{ comments || 0 }}</span>
        </Tooltip>
      </li>
    </ul>
    <div class="divider">分享</div>
    <ul>
      <li>
        <Tooltip content="分享到微博" placement="right">
          <i class="iconfont icon-logo-weibo"></i>
        </Tooltip>
      </li>
      <li>
        <Tooltip content="分享到QQ" placement="right">
          <i class="iconfont icon-qq-copy"></i>
        </Tooltip>
      </li>
      <li>
        <Tooltip content="分享到微信" placement="right">
          <i class="iconfont icon-weixin-copy"></i>
        </Tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Share",
  props: {
    comments: Number
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/styles/mixins";
@import "../../../assets/styles/var";
.share {
  position: fixed;
  top: 30vh;
  margin-left: -60px;
  text-align: center;
  ul {
    li {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
      cursor: pointer;
      margin-bottom: 10px;
      text-align: center;
      line-height: 40px;
      color: @sub_color;
      position: relative;
      &.active {
        color: @active_color;
        i {
          color: @active_color;
        }
        span {
          background-color: @active_color;
        }
      }
      i {
        margin-right: 0;
        font-size: 20px;
        width: 40px;
        height: 40px;
        display: block;
      }
      span {
        position: absolute;
        right: -5px;
        line-height: 1;
        top: -5px;
        padding: 0 4px;
        border-radius: 8px;
        background-color: @sub_color;
        color: #ffffff;
        font-size: 10px;
      }
    }
  }
  .divider {
    margin-bottom: 10px;
    width: 40px;
  }
}
</style>
