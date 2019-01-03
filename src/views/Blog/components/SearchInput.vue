<template>
  <div class="widget__search">
    <input
      class="search__input"
      @keyup.enter="search"
      v-model="keyword"
      type="text"
      placeholder="搜索"
    />
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    search() {
      if (this.keyword.trim()) {
        this.go("search", "", { keyword: this.keyword });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.widget__search {
  padding: 20px;
  .search__input {
    width: 100%;
    padding: 12px 24px;
    background-color: transparent;
    transition: all 250ms ease-in-out;
    font-size: 14px;
    line-height: 18px;
    color: #575756;
    background-image: url(http://mihaeltomic.com/codepen/input-search/ic_search_black_24px.svg);
    background-repeat: no-repeat;
    background-size: 18px 18px;
    background-position: 95% center;
    border-radius: 50px;
    border: 1px solid #575756;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }
  .search__input::placeholder {
    color: rgba(87, 87, 86, 0.8);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .search__input:hover,
  .search__input:focus {
    padding: 12px 0;
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #575756;
    border-radius: 0;
    background-position: 100% center;
  }
}
</style>
