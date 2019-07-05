<template>
  <div style="width:80%;margin: 10px auto">
  </div>
</template>

<script>
  export default {
    name: "vectorTileDisplay",
    methods: {
      jump2vectorConf() {
        window.open(this.$URL.vectorTileDisplayURL, "_target")
      }
    },
    mounted() {
      this.jump2vectorConf();
    }
  }
</script>

<style>
  .el-input--prefix .el-input__inner {
    border-radius: 20px;
  }
</style>
