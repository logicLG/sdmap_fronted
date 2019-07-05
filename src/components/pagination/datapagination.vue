<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10]"
      :page-size="10"
      background
      layout="sizes, total, prev, pager, next, jumper"
      :total="totalSize"
      :totalHistory="indexHistorySize"
      >
    </el-pagination>
    <!--<v-loginRecordcurrendPage ref="loginRecordcurrendPage"></v-loginRecordcurrendPage>-->
  </div>
</template>

<!--total:连接管理所有界面
    totalHistory:历史记录所有界面
    modelprojectTabletotalSize:-->

<script>
  export default {
    name: "dataPagination",
    data() {
      return {
        currentPage: 1,
        //todo 随时变化
        totalSize: 0,
        indexHistorySize:0,
        modelprojectTabletotalSize:0
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
        this.$Bus.$emit("currentPage", this.currentPage);
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.$Bus.$emit("pageSize", this.pageSize);
      },
    },
    created() {
      this.$Bus.$on("totalSize", (params) => {
        this.totalSize = params;
      });
      // this.$Bus.$on("indexHistorySize", (params2) => {
      //   this.totalHistory = params2;
      // });
      // this.$Bus.$on("modelprojectTabletotalSize", (params3) => {
      //   this.modelprojectTabletotalSize = params3;
      // });

    }
  }
</script>

<style>
  .block {
    padding: 10px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    box-sizing: border-box;
  }
</style>
