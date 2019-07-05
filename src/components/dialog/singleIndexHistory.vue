<template>
  <el-dialog
  title="单条入库历史"
  :visible.sync="singletonIndexhistoryVisible"
  width="70%"
  heigh="40%"
  :before-close="modalClose"
  align="center">

    <el-table
  :data="tableData.data"
  style="width: 100%;margin: 10px"
  height="450">
    <el-table-column v-for="item in tableData.columns"
    :prop="item.name"
  :label="item.label"
  :width="item.width">

    </el-table-column>
    </el-table>

    <v-dataPreview :dataPreviewVisible.sync="dataPreviewVisible"></v-dataPreview>
    <v-dbconfiguration :dbconDialogVisible.sync="dbconDialogVisible"></v-dbconfiguration>

    </el-dialog>
</template>

<script>
  import dataPreview from "../../components/dialog/dataPreview"
  import dbconfiguration from "../../components/dialog/dbconfiguration"

    export default {
        name: "singleIndexHistory",
        props: {
          singletonIndexhistoryVisible: Boolean,
          currentconnId:Number
        },
        components: {
          "v-dataPreview": dataPreview,
          "v-dbconfiguration": dbconfiguration
        },
        data()
        {
          return {
            dbsource: [],
            selectItem: '',
            jumpChecked: true,
            isHasData: true,
            dataPreviewVisible: false,
            dbconDialogVisible: false,
            pageProps: {
              pageSize: 10,
              currentPage: 1
            },
            tableData: {
              columns: [
                {"name": "id", "label": "id", type: "text",  width: 140},
                {"name": "user", "label": "用户", type: "text",  width: 140},
                {"name": "conn", "label": "连接名", type: "text", width: 140},
                {"name": "startTime", "label": "开始时间", type: "text",  width: 140},
                {"name": "finishTime", "label": "结束时间", type: "text", width: 140},
                {"name": "func", "label": "功能描述", type: "text",width: 140},
                {"name": "total", "label": "统计", type: "text",  width: 140},
                {"name": "processed", "label": "处理进度", type: "text", width: 140},
                {"name": "error", "label": "error", type: "text", width: 140},
              ],
              dataCancle: {},
              data: []
            },
            value: '0'
          }
        },
        methods: {
          modalClose() {
            this.$emit("update:singletonIndexhistoryVisible", false);
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
          readDataFromDB(id) {
            let that = this;
            that.$axios.get(that.$URL.singlehistory + "?conn=" + id,
              {
                page: that.pageProps.currentPage,
                size: that.pageProps.pageSize,
              }).then(function (res) {
              if (res.status == "ok") {
                that.tableData.data = res.result.data;

                length = that.tableData.data.length;
                // debugger;
                for(let item of that.tableData.data){
                  // item["timestmp"]= formatDate(item["timestmp"],'yyyy-MM-dd hh:mm');
                  let date_s = new Date(item["startTime"]);
                  let date_e = new Date(item["finishTime"]);

                  if (date_s != 0)
                    item["startTime"] = that.$tool.timestampConvert(date_s);
                  if (date_e != null)
                  {
                    item["finishTime"] = that.$tool.timestampConvert(date_e);
                      // date_e.getFullYear() +"年" + date_e.getUTCMonth() + "月" + date_e.getUTCDay()+"日"+ date_e.getHours()+"时";
                  }
                }

                // that.$Bus.$emit("totalSize", res.result.total);
                that.$Bus.$emit("totalHistory", res.result.total);
              }
            }).catch(function (err) {
              console.log(err);
            })
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
        },
        mounted() {

      }

    }
</script>

<style scoped>

</style>
