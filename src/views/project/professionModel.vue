<template>
  <div style="width:95%;margin: 10px auto;">
    <el-row style="margin-left: 15px">
      <div id="tool">
        <el-button title="注册模型" type="primary" icon="el-icon-plus" circle @click="signDialog()"
        ></el-button>
        <el-button title="列表刷新" type="primary" icon="el-icon-refresh" circle @click="refresh()"></el-button>
      </div>
      <div>
      </div>
    </el-row>
  </div>
</template>

<script>


  export default {
    name: "professionModel",
    data() {
      return {}
    },
    components: {}
    ,
    methods: {

      handleNodeClick(data) {

      }
      ,
      refresh: function () {

      },
      signDialog: function () {
      },
    }
    ,
    mounted: function () {
    }
    ,
  }
</script>

<style>
  #tool {
    padding: 0 10px 0 0;
    float: right;
  }

</style>
