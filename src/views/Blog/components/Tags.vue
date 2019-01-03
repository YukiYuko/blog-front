<template>
  <div class="tags" flex wrap="wrap">
    <a v-for="(item, index) in list" :key="index" class="gradient-btn">{{
      item.name
    }}</a>
  </div>
</template>

<script>
import { getTags } from "../../../ajax/api";
export default {
  name: "Tags",
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this._getTags();
  },
  methods: {
    _getTags() {
      getTags().then(res => {
        this.list = res.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/styles/var";
.tags {
  padding: 15px;
  a {
    padding: 0 5px;
    min-width: 60px;
    height: 35px;
    border: 1px solid @border_color;
    margin-right: 15px;
    margin-bottom: 10px;
    text-align: center;
    line-height: 35px;
    color: @title_color;
  }
}
.gradient-btn {
  color: #b2876f;
  /*text-transform: uppercase;*/
  background: -webkit-linear-gradient(
    left,
    rgba(178, 135, 111, 0) 25%,
    rgba(178, 135, 111, 0.8) 75%
  );
  background: linear-gradient(
    to right,
    rgba(178, 135, 111, 0) 25%,
    rgba(178, 135, 111, 0.8) 75%
  );
  background-position: 1% 50%;
  background-size: 400% 300%;
  border: 1px solid #b2876f;
}
.gradient-btn:hover {
  -webkit-transition: 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.gradient-btn:hover {
  color: #fff;
  background-position: 99% 50%;
}
</style>
