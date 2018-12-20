<template>
  <div class="tab_head">
    <a
      :class="{ active: item.id === current_id }"
      v-for="(item, index) in tabs"
      :key="index"
      @click="select(item.id);"
      >{{ item.name }}</a
    >
  </div>
</template>

<script>
export default {
  name: "TabHead",
  props: {
    tabs: {
      type: Array,
      default: () => {
        return [
          { id: "watched", name: "看过" },
          { id: "queue", name: "想看" },
          { id: "remove", name: "抛弃" }
        ];
      }
    }
  },
  data() {
    return {
      current_id: "watched"
    };
  },
  methods: {
    select(id) {
      this.current_id = id;
      this.$emit("select", id);
    }
  }
};
</script>

<style scoped></style>
