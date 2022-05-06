<template>
  <div class="pagination">
    <button @click="goBack">上一页</button>
    <button v-if="startPage > 1" @click="$emit('reGet',1)">1</button>
    <button v-if="startPage > 2">···</button>

    <button v-for="item in endPage - startPage + 1" @click="$emit('reGet',startPage + item - 1)">
      {{ startPage + item - 1 }}
    </button>

    <button v-if="pagesNum - endPage > 1">···</button>
    <button v-if="pagesNum - endPage > 0">{{ pagesNum }}</button>
    <button @click="goForword">下一页</button>

    <button style="margin-left: 30px">共 {{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["curPage", "pageSize", "continue", "total"],
  computed: {
    pagesNum() {
      return Math.ceil(this.total / this.pageSize);
    },
    startPage() {
      if (this.curPage <= Math.ceil(this.continue / 2)) {
        return 1;
      }
      return this.continue > this.pagesNum
        ? 1
        :( (this.curPage - Math.floor(this.continue / 2) >
          this.pagesNum - this.continue)
        ? this.pagesNum - this.continue + 1
        : this.curPage - Math.floor(this.continue / 2));
    },
    endPage() {
      //当前元素右边超出总长，end = total
      if (this.curPage + Math.floor(this.continue / 2) > this.pagesNum) {
        return this.pagesNum;
      }
      //左侧重叠，continue不超过总长，end设为cngtinue。
      if (
        this.curPage <= Math.ceil(this.continue / 2) &&
        this.continue <= this.pagesNum
      ) {
        return this.continue;
      }
      return this.curPage + Math.floor(this.continue / 2);
    },
  },
  methods: {
    goBack() {
      console.log("back");
      if (this.curPage > 1) {
        this.$emit("reGet", this.curPage - 1);
      }
    },
    goForword() {
      console.log("forword");
      if (this.curPage < this.pagesNum) {
        this.$emit("reGet", this.curPage + 1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>