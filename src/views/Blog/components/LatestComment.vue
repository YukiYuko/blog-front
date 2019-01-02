<template>
  <div class="latestComment">
    <div class="latestComment_item" v-for="(item, index) in list" :key="index">
      <div class="latestComment_item_title" flex items="center">
        <img
          class="touxiang"
          src="../../../assets/images/touxiang.png"
          alt=""
        />
        <div class="text" box="1">
          <p flex="" justify="between">
            <span
              ><i>{{ item.name }}</i
              >评论:
            </span>
            <span>{{ item.createdAt | getDate }}</span>
          </p>
          <p>{{ item.newsId.title }}</p>
        </div>
      </div>
      <div class="latestComment_item_content">
        <em class="prev"></em>
        <span> {{ item.desc }} </span>
        <em class="nex"></em>
      </div>
    </div>
  </div>
</template>

<script>
import { getLatestComment } from "../../../ajax/api";
export default {
  name: "latestComment",
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this._getLatestComment();
  },
  methods: {
    _getLatestComment() {
      getLatestComment().then(res => {
        this.list = res.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/styles/var";
@import "../../../assets/styles/mixins";
.latestComment {
  padding: 0 15px 15px;
  &_item {
    font-size: 12px;
    cursor: pointer;
    position: relative;
    padding: 15px 0;
    &:before {
      .bottom-line();
    }
    &_title {
      margin-bottom: 5px;
      .touxiang {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .text {
        p {
          color: @info_color;
          margin-bottom: 5px;
          span {
            i {
              color: #29a8e8;
            }
          }
        }
      }
    }
    &_content {
      position: relative;
      padding: 10px 20px;
      line-height: 20px;
      em {
        display: inline-block;
        vertical-align: middle;
        background: url("../../../assets/images/igao7_spirit.png") no-repeat -173px -144px;
        width: 13px;
        height: 10px;
        color: @sub_color;
      }
      em.prev{
        position: absolute;
        left: 0;
        top: 10px;
        background-position: -144px -145px;
      }
      span {
        color: @title_color;
      }
    }
  }
}
</style>
