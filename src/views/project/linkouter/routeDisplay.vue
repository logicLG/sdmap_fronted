<template>
  <div style="width:80%;margin: 10px auto">
  </div>
</template>

<script>
  export default {
    name: "routeDisplay",
    methods: {
      jump2vectorConf() {
        window.open(this.$URL.routeDisplayURL, "_target")
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
