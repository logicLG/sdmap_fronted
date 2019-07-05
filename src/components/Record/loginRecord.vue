<template>
  <div style="width:100%;margin: 10px auto">

    <el-date-picker
      v-model="value1"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      :onchange="submitcondition"
      hide-on-single-page
      style="margin-left: 100px">
    </el-date-picker>

    <el-button style="margin: 10px" @click="submitcondition">提交</el-button>

    <el-table
      :data="tableData.data"
      style="width: 100%;margin:10px;padding: 10px;"
      height="750"
      border>

      <el-table-column v-for="item in tableData.columns"
                       :prop="item.name"
                       :label="item.label"
                       :width="item.width"
      >
      </el-table-column>
    </el-table>
    <data-pagination ref="dataPagination"></data-pagination>

  </div>
</template>

<script>
  // import dataPreview from "../../components/dialog/dataPreview"
  // import dbconfiguration from "../../components/dialog/dbconfiguration"
  import dataPagination from '../../components/pagination/datapagination';

  export default {
    name: "loginRecordCom",
    components: {
      "data-pagination": dataPagination,

    },
    data() {
      return {
        dbsource: [],
        selectItem: '',
        jumpChecked: true,
        isHasData: false,
        value1: null,
        pageProps: {
          pageSize: 10,
          loginRecordcurrentPage: 1
        },
        dataPreviewVisible: false,
        dbconDialogVisible: false,
        logintimeRangeVisible:false,
        currentconnId: 0,
        tableData: {
          isSet: false,//是否编辑
          columns: [
            {"name": "timestmp", "label": "timestmp", type: "text",width: 160,height:30},
            {"name": "formattedMessage", "label": "formattedMessage", type: "text",width: 160,height:30},
            {"name": "loggerName", "label": "loggerName", type: "text",width: 160,height:30},
            {"name": "levelString", "label": "levelString", type: "text",width: 160,height:30},
            {"name": "threadName", "label": "threadName", type: "text",width: 160,height:30},
            {"name": "referenceFlag", "label": "referenceFlag", type: "text",width: 160,height:30},
            // {"name": "msg", "label": "错误信息", type: "text",wwidth: 240,height:30},
            // {"name": "arg0", "label": "功能描述", type: "text",width: 160,height:30},
            {"name": "callerFilename", "label": "callerFilename", type: "text",width: 160,height:30},
            {"name": "callerClass", "label": "error", type: "text",width: 160,height:30},
            // {"name": "msg", "label": "错误信息", type: "text",width: 140,height:30},
            {"name": "callerMethod", "label": "callerMethod", type: "text",width: 160,height:30},
            {"name": "callerLine", "label": "callerLine", type: "text",width: 160,height:30},
            // {"name": "callerMethod", "label": "共计", type: "text",width: 160,height:30},
            {"name": "eventId", "label": "eventId", type: "text",width: 160,height:30},
          ],
          dataCancle: {},
          data: []
        },
        value: '0'
      }
    },
    methods: {
      getloginRecordData() {
        // debugger;
        let that = this;
        debugger;
        that.$axios.get(that.$URL.loginURL+"?start="+this.value1[0].getTime() + "&end="+this.value1[1].getTime(),
          {
            // page: that.pageProps.loginRecordcurrentPage,
            page: that.$refs.dataPagination.currentPage,
            size: that.pageProps.pageSize,
          }).then(function (res) {
          if (res.status == "ok") {
            that.tableData.data = res.result;
            length = that.tableData.data.length;

            for(let item of that.tableData.data){

              let date = new Date(item["timestmp"]);

              item["timestmp"] = date.getFullYear() +"年" + date.getUTCMonth() + "月" + date.getUTCDay()+"日" + date.getHours()+"时";
            }

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
        this.logintimeRangeVisible = true;
      },
      submitcondition(){
        if (this.value1==null)
          alert('选择时间数据');

        this.getloginRecordData();
      }
    },
    mounted() {

    }}

</script>
