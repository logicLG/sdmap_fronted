<template>
  <el-dialog
    title="查询条件"
    :visible.sync="selectHistoryComVisible"
    width="40%"
    :before-close="modalClose"
    center>
    <!--<el-button>查询</el-button>-->
    <br>
    连接名称:<br>
    <!--<input type="text" name="firstname" value="Mickey">-->
    <el-input v-model="system" placeholder="请输入内容" style="margin: 10px;"></el-input>
    <br>
    目标用户名:<br>
    <el-input v-model="user" placeholder="请输入内容" style="margin: 10px"></el-input>
    <br>
    起始时间:<br>
    <el-date-picker
      v-model="value1"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
      style="margin: 10px">
    </el-date-picker>
    <br>
    <el-button style="margin: 10px" @click="submitcondition">提交</el-button>

  </el-dialog>
</template>

<!--total:连接管理所有界面
    totalHistory:历史记录所有界面-->

<script>
  export default {
    name: "selectHistoryCom",
    props: {
      selectHistoryComVisible: Boolean
    },
    data() {
      return {
        currentPage: 1,
        //todo 随时变化
        totalSize: 0,
        indexHistorySize:0,
        value1: '',
      }
    },
    methods: {
      modalClose() {
        this.$emit("update:selectHistoryComVisible", false);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.$Bus.$emit("currentPage", this.currentPage);
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.$Bus.$emit("pageSize", this.pageSize);
      },
      submitcondition(){

      }
    },
    created() {
      this.$Bus.$on("totalSize", (params) => {
        this.totalSize = params;
      });
      this.$Bus.$on("indexHistorySize", (params2) => {
        this.totalHistory = params2;
      });
    },
    mounted(){
      // value1=null;
    }
  }
</script>
