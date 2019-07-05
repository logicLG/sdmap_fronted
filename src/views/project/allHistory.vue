<template>
  <div style="width:100%;margin: 10px auto">

    <!--<el-button style="margin: 10px" @click="selectCondition">查询条件</el-button>-->

    <el-input v-model="connectionName" placeholder="连接名:" style="margin-left: 100px;width: 200px"></el-input>

    <el-input v-model="userName" placeholder="目标用户名:" style="margin-left: 10px;width: 200px"></el-input>

    <el-date-picker
      v-model="value1"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      align="right"
      style="margin-left: 10px">
    </el-date-picker>

    <el-button style="margin: 10px" @click="submitcondition">提交</el-button>

    <el-table
      :data="tableData.data"
      style="width: 100%;margin:10px;padding: 10px"
      height="600"
      border>

      <el-table-column v-for="item in tableData.columns"
                       :prop="item.name"
                       :label="item.label"
                       :width="item.width"
                       >
      </el-table-column>
    </el-table>
    <data-pagination></data-pagination>

    <v-selectHistoryCom :selectHistoryComVisible.sync="selectHistoryComVisible"></v-selectHistoryCom>
  </div>
</template>

<script>
  import dataPreview from "../../components/dialog/dataPreview"
  import dbconfiguration from "../../components/dialog/dbconfiguration"
  import selectHistoryCom from '../../components/pagination/selectHistoryCom'
  import dataPagination from '../../components/pagination/datapagination';

  export default {
    name: "allHistory",
    components: {
      "data-pagination": dataPagination,
      "v-selectHistoryCom":selectHistoryCom
    },
    data() {
      return {
        dbsource: [],
        selectItem: '',
        jumpChecked: true,
        isHasData: false,
        pageProps: {
          pageSize: 10,
          currentPage: 1
        },
        dataPreviewVisible: false,
        dbconDialogVisible: false,
        selectHistoryComVisible:false,
        value1:'',
        connectionName:"",
        userName:null,
        currentconnId: 0,
        tableData: {
          isSet: false,//是否编辑
          columns: [
            {"name": "id", "label": "id", type: "text",width: 160,height:30},
            {"name": "conn", "label": "连接名", type: "text",width: 160,height:30},
            {"name": "user", "label": "用户", type: "text",width: 160,height:30},
            {"name": "startTime", "label": "开始时间", type: "text",width: 160,height:30},
            {"name": "finishTime", "label": "终止时间", type: "text",width: 160,height:30},
            {"name": "error", "label": "错误编号", type: "text",width: 160,height:30},
            // {"name": "msg", "label": "错误信息", type: "text",wwidth: 240,height:30},
            {"name": "func", "label": "功能描述", type: "text",width: 160,height:30},
            {"name": "processed", "label": "完成情况", type: "text",width: 160,height:30},
            {"name": "error", "label": "error", type: "text",width: 160,height:30},
            // {"name": "msg", "label": "错误信息", type: "text",width: 140,height:30},
            {"name": "total", "label": "共计", type: "text",width: 160,height:30},
          ],
          dataCancle: {},
          data: []
        },
        value: '0'
      }
    },
    methods: {
      getconnectionData() {
        // debugger;
        let that = this;
        that.$axios.get(that.$URL.allhistory,
          {
            page: that.pageProps.currentPage,
            size: that.pageProps.pageSize,
          }).then(function (res) {
          if (res.status == "ok") {
            that.tableData.data = res.result.data;
            // debugger;
            that.$Bus.$emit("totalSize", res.result.total);
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      querySearch(queryString, cb) {
        let dbsource = this.dbsource;
        let results = queryString ? dbsource.filter(this.createFilter(queryString)) : dbsource;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      handleSelect(item) {
        // debugger;
        this.currentconnId = item.id;
        this.$store.commit("SET_CURRENTCONNID", item.id);
        // this.isHasData = true;
        // this.getconnectionData();
      },
      createFilter(queryString) {
        return (dbsouce) => {
          return (dbsouce.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      dataPreView() {
        this.dataPreviewVisible = true;
      },
      opendbConf() {
        this.dbconDialogVisible = true;
      },
      saveRowPromise(conf) {
        let that = this;
        return new Promise((resolve, reject) => {
          that.$axios.put(that.$URL.connURL, {
            conf: conf
          }).then(res => {
            resolve(res)
          }), err => {
            reject(err);
          }
        })
      },
      selectCondition(){
        // debugger;
        this.selectHistoryComVisible = true;
      },
      submitcondition(){
        let that = this;
        that.$axios.get(that.$URL.allhistoryfilter+"?start="+this.value1[0].getTime() + "&end="+this.value1[1].getTime() +
          "&conn="+this.connectionName + "&user="+this.userName ,
          {
            page: that.pageProps.currentPage,
            size: that.pageProps.pageSize,
          }).then(function (res) {
          if (res.status == "ok") {
            that.tableData.data = res.result.data;
            // debugger;
            that.$Bus.$emit("totalSize", res.result.total);
          }
        }).catch(function (err) {
          console.log(err);
        })
      }
  },
  mounted() {
      this.getconnectionData();
  }}
</script>
