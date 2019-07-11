<template>
    <el-dialog
      title="索引管理"
      :visible.sync="indexManagementComVisible"
      width="55%"
      heigh="40%"
      :before-close="modalClose"
      align="center">

      <span>
        <el-button v-if="isHasData"
                   @click="changeTable(true)"
                   type="text"
                   size="small"
                   align="right">
            {{tableData.isSet?'保存':"修改"}}
          </el-button>
          <el-button v-if="tableData.isSet"
                     @click.native.prevent="changeTable(false)"
                     type="text"
                     size="small">
            取消
          </el-button>
      </span>

      <el-table
        :data="tableData.data"
        style="width: 100%;margin: 10px"
        height="450"
        >
        <el-table-column v-for="item in tableData.columns"
                         :prop="item.name"
                         :label="item.label"
                         :width="item.width"
        >
          <template slot-scope="scope">
              <span v-if="tableData.isSet">
              <el-input v-if="!item.immutable&&item.type=='text'" size="mini" placeholder="请输入内容"
                        v-model="scope.row[item.name]">
              </el-input>
              <el-checkbox v-else-if="!item.immutable&&item.type=='checkbox'" v-model="scope.row[item.name]">
              </el-checkbox>
              <el-checkbox v-else-if="item.immutable&&item.type=='checkbox'" v-model="scope.row[item.name]">
              </el-checkbox>
              <el-select size="mini" v-else-if="item.type=='select'" v-model="scope.row[item.name]">
              <el-option value=1 label=1>1</el-option>
              <el-option value=2 label=2>2</el-option>
              <el-option value=4 label=4>4</el-option>
              </el-select>
              <span v-else size="mini">{{scope.row[item.name]}}
              </span>
              </span>
              <span v-else>
          <el-checkbox disabled v-if="!item.immutable&&item.type=='checkbox'" v-model="scope.row[item.name]">
          </el-checkbox>
           <el-checkbox disabled v-else-if="item.immutable&&item.type=='checkbox'" v-model="scope.row[item.name]">
          </el-checkbox>
          <span v-else>{{scope.row[item.name]}}</span></span>
          </template>
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
        name: "indexManagementCom",
        props: {
          indexManagementComVisible: Boolean,
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
            tableData: {
              isSet: false,//是否编辑
              columns: [
                {"name": "field", "label": "字段名", type: "text", immutable: true, width: 180},
                {"name": "target", "label": "映射名", type: "text", immutable: false, width: 180},
                {"name": "enable", "label": "是否选用", type: "checkbox", immutable: false, width: 180},
                {"name": "analyzable", "label": "是否可模糊匹配", type: "checkbox", immutable: false, width: 180},
                {"name": "boost", "label": "权重", type: "select", immutable: false, width: 180},
              ],
              dataCancle: {},
              data: []
            },
            value: '0'
          }

        },
        methods: {
          modalClose() {
            this.$emit("update:indexManagementComVisible", false);
          },
          querySearch(queryString, cb) {
            let dbsource = this.dbsource;
            let results = queryString ? dbsource.filter(this.createFilter(queryString)) : dbsource;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
          handleSelect(item) {
             this.currentconnId = item.id;
            // this.currentconnId = that.dbconfForm.name;
            // debugger;

            this.$store.commit("SET_CURRENTCONNID", item.id);
            this.isHasData = true;
            this.readDataFromDB(this.currentconnId);
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
          indexToBase() {
            let that = this;
            this.$axios.post(this.$URL.indexURL + "?connId=" + this.currentconnId).then(res => {
              if (res.status == "ok") {
                that.$message({
                  type: 'success',
                  // message: "数据入库中请前往连接管理中查看!"
                });
              } else {
                that.$message({
                  type: 'error',
                  message: "数据入库请求失败!"
                });
              }
            }).catch(error => {
              //超时之后在这里捕抓错误信息.
              that.$message({
                type: 'error',
                message: "数据入库请求失败!"
              });
            })
          },
          readDataFromDB(id) {
            let that = this;
            this.$axios.get(this.$URL.confURL + "?connId=" + id).then(res => {
              if (res.status == "ok") {
                that.tableData.data = res.result;
              }
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
          //修改
          changeTable(cg) {
            let that = this;
            //是否是取消操作
            if (!cg) {
              this.tableData.data = this.tableData.dataCancle;
              return this.tableData.isSet = !this.tableData.isSet;
            }
            //保存数据
            if (this.tableData.isSet) {
              //项目是模拟请求保存操作 todo
              let that = this;
              // debugger;
              this.saveRowPromise(this.tableData.data).then(res => {
                if (res.status == "ok") {
                  that.$message({
                    type: 'success',
                    message: "保存成功!"
                  });
                  that.readDataFromDB(that.currentconnId);
                } else {
                  that.$message({
                    type: 'error',
                    message: "保存失败!"
                  });
                  this.tableData.data = this.tableData.dataCancle;
                }
              }).catch(res => {
                that.$message({
                  type: 'error',
                  message: "保存失败!"
                });
                console.log(res);
                this.tableData.data = this.tableData.dataCancle;
              })
              //然后这边重新读取表格数据
              that.tableData.isSet = false;
            } else {
              this.tableData.dataCancle = JSON.parse(JSON.stringify(this.tableData.data));
              this.tableData.isSet = true;
            }
            // that.readDataFromDB(that.$parent.currentID);
          }
        },
        mounted() {
          let that = this;
          that.$axios.get(that.$URL.connURL).then(function (res) {
            // that.readDataFromDB(that.currentconnId);
          }).catch(function (err) {
            console.log(err);
          })
      }

    }
</script>

<style scoped>

</style>
