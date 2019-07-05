<template>
  <div style="width:95%;margin: 10px auto;">
    <el-row style="margin-left: 15px">
      <div id="tool">
        <el-button title="列表刷新" type="primary" icon="el-icon-refresh" circle @click="refresh()"></el-button>
      </div>
      <div>
        <el-cascader
          style="margin-left:10px;width:26%;"
          :options="options"
          ref="modelSelect"
          v-model="val"
          size="small"
          id="modelSelect"
          @change="handleNodeClick"
        ></el-cascader>
      </div>
    </el-row>
  </div>
</template>

<script>


  export default {
    name: "analyseModel",
    data() {
      return {}
    },
    components: {},
    methods: {

      handleNodeClick(data) {

      },
      refresh: function () {

      },
    },
    mounted: function () {
      this.getModelData();
    },
  }
</script>

<style>
  #tool {
    padding: 0 10px 0 0;
    float: right;
  }

  .el-tree-node__content:hover {
    color: #3a8ee6;
  }
</style>
