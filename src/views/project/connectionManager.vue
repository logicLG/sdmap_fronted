<!--另外一种样式的表格，一次只能修改一行-->
<template>
  <div style="width:100%;">
    <div style="position: relative;height: 40px">
      <el-button class="newConnectionButton" type="primary" @click="addNewConnection">新建连接</el-button>
      <el-input style="width: 10%;margin-left: 45%" placeholder="连接名：" v-model="selectname" clearable></el-input>
      <el-input style="width: 10%;margin-left: 10px" placeholder="主机名：" v-model="selecthost" clearable></el-input>
      <el-input style="width: 10%;margin-left: 10px" placeholder="数据库类型：" v-model="selectdbType" clearable></el-input>
      <el-input style="width: 10%;margin-left: 10px" placeholder="数据库或服务：" v-model="selectdb" clearable></el-input>
      <el-button @click="searchData" style="margin-left: 10px">查询</el-button>
      <el-button class="refreshButton" type="primary" @click="getconnectionData">刷新</el-button>
    </div>

    <el-table
      :data="tableData.data"
      stripe
      border
      style="width: 98%;margin: 10px"
      height="600"
      ref="filterTable">

    <el-table-column v-for="item in tableData.columns"
      :prop="item.name"
      :label="item.label"
      :width="item.width"
      :show-overflow-tooltip="true">

    <template slot-scope="scope">
      <span v-if="scope.row.isSet">

      <el-input v-if="item.type=='text'" width="15%"  size="mini" placeholder="请输入内容" v-model="tableData.sel[item.name]">
      </el-input>
      <el-input show-password v-else-if="item.type=='password'" width="15%"  size="mini" placeholder="请输入内容"
        v-model="tableData.sel[item.name]">
      </el-input>

      <el-select v-else-if="item.type=='select'" width="15%"  v-model="tableData.sel[item.name]" size="mini">
        <el-option value='postgis' label='postgis'>postgis</el-option>
        <el-option value='oracle' label='oracle'>oracle</el-option>
      </el-select>

      <el-checkbox-group v-else-if="item.type=='checkbox-group'" width="15%" v-model="tableData.sel[item.name]" :min="1">
        <el-checkbox label="index">索引</el-checkbox>
        <el-checkbox label="analyze">分析</el-checkbox>
      </el-checkbox-group>

      <span v-else size="mini">{{tableData.sel[item.name]}}
  </span>
  </span>

  <span v-else>
  <el-checkbox-group disabled v-if="item.type=='checkbox-group'" width="15%" v-model="scope.row[item.name]" :min="1">
    <el-checkbox label="index">索引</el-checkbox>
    <el-checkbox label="analyze">分析</el-checkbox>
    </el-checkbox-group>
    <span v-else-if="item.type=='password'">******</span>
    <span v-else>{{scope.row[item.name]}}</span>

  </span>
  </template>
  </el-table-column>


  <el-table-column
  fixed="right"
  label="操作"
  width="200px">
    <template slot-scope="scope">
    <el-button
  @click.native.prevent="changeRow(scope.row, true)"
  type="text"
  size="small">
    {{scope.row.isSet?'保存':"修改"}}
  </el-button>
  <el-button v-if="!scope.row.isSet"
  @click.native.prevent="deleteRow(scope.row.id)"
  type="text"
  size="small">
    删除
    </el-button>
    <el-button v-else="scope.row.isSet"
  @click.native.prevent="changeRow(scope.row, false)"
  type="text"
  size="small">
    取消
    </el-button>
    <el-button v-if="scope.row.id!=null"
                 @click.native.prevent="getIndexStatus(scope.row)"
                 type="text"
                  :class="decidetextColor(scope.row)"
                 size="small">
        状态
    </el-button>

      <!--((scope.row.processed!=100)?((scope.row.processed == 100 && scope.row.error ==0)?'successtext':'errortext'):'warningtext')"-->

    <span></span>
    <el-dropdown size="small">
      <span class="el-dropdown-link">
      <span class="fa fa-ellipsis-h" style="margin:15px"></span>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="indexToBase(scope.row['id'])"
                        :disabled="((scope.row.error ==0)?((scope.row.processed == 100 && scope.row.error ==0)?false:true):false)">入库</el-dropdown-item>
      <el-dropdown-item @click.native="addIndexconnection(scope.row['id'])">索引管理</el-dropdown-item>
      <el-dropdown-item @click.native="singleIndexCon(scope.row['name'])">历史记录</el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>

    </template>

    </el-table-column>

    </el-table>
    <data-pagination></data-pagination>
    <db-configuration :dbconDialogVisible.sync="dbconDialogVisible"></db-configuration>
    <index-ManagementCom ref="indexMan" :currentconnId="currentID" :indexManagementComVisible.sync="indexManagementComVisible"></index-ManagementCom>
    <single-IndexHistory ref="indexHistory" :currentconnId="currentID" :singletonIndexhistoryVisible.sync="singletonIndexhistoryVisible"></single-IndexHistory>
    </div>
</template>

<script>

  import dataPagination from '../../components/pagination/datapagination';
  import dbconfiguration from '../../components/dialog/dbconfiguration';
  import indexManagementCom from '../../components/dialog/indexManagementCom';
  import singleIndexHistory from '../../components/dialog/singleIndexHistory'

  import data from '../../mock/mock.js';

  export default {
    name: "indextoBase",
    components: {
      "data-pagination": dataPagination,
      "db-configuration": dbconfiguration,
      "index-ManagementCom":indexManagementCom,
      "single-IndexHistory":singleIndexHistory
    },
    data() {
      return {
        indexStatuscss: {isWarn: true, isSuccess: false, isError: false},
        total: 5,
        dbconDialogVisible: false,
        indexManagementComVisible:false,
        singletonIndexhistoryVisible:false,
        key:null,
        selectname:"",
        selecthost:"",
        selectdb:"",
        selectdbType:"",
        currentID:1,
        pageProps: {
          pageSize: 10,
          currentPage: 1
        },
        tableData: {
          sel: null,//选中行
          columns: [
            {"name": "name", "label": "连接名", type: "text"},//width:"15%"
            {"name": "host", "label": "主机名", type: "text"},
            {"name": "port", "label": "端口", type: "text"},
            {"name": "dbType", "label": "数据库类型", type: "select"},
            {"name": "db", "label": "数据库或服务", type: "text"},
            {"name": "user", "label": "用户名", type: "text"},
            {"name": "password", "label": "密码", type: "password"},
            {"name": "tableName", "label": "表名", type: "text"},
            {"name": "func", "label": "功能描述", type: "checkbox-group"}
          ],
          data: []
        },
        globalSet: false,//控制只有一行被修改
        value: '0',
      }
    },
    methods: {
      getconnectionData() {
        // debugger;
        let that = this;
        that.$axios.get(that.$URL.connURL,
          {
            page: that.pageProps.currentPage,
            size: that.pageProps.pageSize,
          }).then(function (res) {
          if (res.status == "ok") {
            // alert(res)
            res.result.data.forEach(item => {
              if (item.func) {
                item.func = item.func.split(",")
              }
            });
            // debugger;
            that.tableData.data = res.result.data;
            that.$Bus.$emit("totalSize", res.result.total);
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      getIndexStatus(rowData) {
        this.getconnectionData();
        let msg = "";
        if (rowData.finishTime != null) {
          let error = rowData.error;
          msg = "该数据库连接运行完毕，错误记录数量为" + error;
          if (error == 0) {
            this.$message({
              type: 'success',
              message: msg
            });
          } else {
            this.$message({
              type: 'error',
              message: msg
            });
          }
        } else {
          msg = "该数据库连接运行中"
          this.$message({
            type: 'warning',
            message: msg
          });
        }
      },
      addNewConnection() {
        this.dbconDialogVisible = true;
      },
      addIndexconnection(id){
        // debugger;
        this.currentID = id;
        this.$refs.indexMan.readDataFromDB(this.currentID);
        this.indexManagementComVisible = true;
      },
      singleIndexCon(conn){
        // debugger;
        this.currentID = conn;
        this.$refs.indexHistory.readDataFromDB(this.currentID);
        this.singletonIndexhistoryVisible = true;
      },
      saveRow(conn) {
        let that = this;
        this.$axios.put(this.$URL.connURL, {
              type: 'success',
              conn: conn
            }).then(function (res) {
              if (res.status == "ok") {
                that.$message({
              message: "保存成功!"
            });
          }
        })
      },
      deleteRow(connId) {
        let that = this;
        this.$confirm('此操作将删除该数据库连接, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios.remove(that.$URL.connURL + "?connId=" + connId
          ).then(res => {
            if (res.status == "ok") {
              that.$message({
                type: 'success',
                message: "删除成功!"
              });
              that.getconnectionData();
            } else {
              that.$message({
                type: 'error',
                message: "删除失败!"
              });
            }
          })
        }).catch(() => {
        });
      },
      saveRowPromise(conn) {
        let that = this;
        return new Promise((resolve, reject) => {
          that.$axios.put(that.$URL.connURL, {
            conn: conn
          }).then(res => {
            resolve(res)
          }), err => {
            reject(err);
          }
      })
      },
      //修改
      changeRow(row, cg) {
        //点击修改 判断是否已经保存所有操作
        if (!row.isSet && this.globalSet) {
          this.$message.warning("请先保存当前编辑项");
          return false;
        }
        //是否是取消操作
        if (!cg) {
          debugger;
          if (!this.tableData.sel.id) this.tableData.data.splice(index, 1);
          this.globalSet = false;
          return row.isSet = !row.isSet;
        }
        //提交数据
        if (row.isSet) {
          //项目是模拟请求保存操作 todo
          debugger;
          let temp = JSON.parse(JSON.stringify(this.tableData.sel))
          temp.func = temp.func.toString();
          let that = this;
          this.saveRowPromise(temp).then(res => {
            if (res.status == "ok") {
              that.getconnectionData();
              row.isSet = false;
              that.globalSet = false;
              that.$message({
                type: 'success',
                message: "保存成功!"
              });
            }
          })
          // this.saveRow(temp);
        } else {
          this.tableData.sel = JSON.parse(JSON.stringify(row));
          row.isSet = true;
          this.globalSet = true;
        }
      },
      indexToBase(id) {

        let that = this;
        this.currentID = id;
        this.$axios.post(this.$URL.indexURL + "?connId=" + this.currentID).then(res => {
          // debugger;
          // that.
          if (res.status == "ok" ) {
            that.key = 1,
            that.$message({
              type: 'success',
              message: "数据入库中!",
            });
          } else {
            that.key = 2,
            that.$message({
              type: 'error',
              message: "数据入库请求失败!"
            });
          }
          that.getconnectionData();
        }).catch(error => {
          //超时之后在这里捕抓错误信息.
          that.key = 3,
          that.$message({
            type: 'error',
            message: "数据入库请求失败!"
          });
        })
      },
      searchData() {
        // debugger; + "?dbType="+this.selectMode
        let that = this;
        that.$axios.get(that.$URL.connURL + "?dbType=" + that.selectdbType +"&prefix=" + that.selectname + "&host=" + that.selecthost + "&db=" + that.selectdb,
          {
            offset: that.pageProps.currentPage,
            size: that.pageProps.pageSize,
          }).then(function (res) {
          if (res.status == "ok") {
            // alert(res)
            res.result.data.forEach(item => {
              if (item.func) {
                item.func = item.func.split(",")
              }
            });
            // debugger;
            that.tableData.data = res.result.data;

            that.$Bus.$emit("totalSize", res.result.total);
          }
        }).catch(function (err) {
          console.log(err);
        })

      },
      decidetextColor(row)
      {
        if (row.error != 0)
          return 'errortext';
        else if (row.error ==0 && row.processed == 100)
          return 'successtext';
        else if (row.error ==0 && row.processed != 100)
          return 'runningtext';
        else
          return 'warningtext';
      }

    },
    mounted() {
      this.getconnectionData();
      // this.$refs.indexManagementcom.readDataFromDB(this.tableData.sel.id);
      let that = this;
      this.$Bus.$on("pageSize", (params) => {
        this.globalSet = false;
        that.pageProps.pageSize = params;
        that.getconnectionData();
      });
      this.$Bus.$on("currentPage", (params) => {
        this.globalSet = false;
        that.pageProps.currentPage = params;
        that.getconnectionData();
      });
    },
    created() {
      // let that = this;
      // this.$Bus.$on("pageSize", (params) => {
      //   this.globalSet = false;
      //   that.pageProps.pageSize = params;
      //   that.getconnectionData();
      // });
      // this.$Bus.$on("currentPage", (params) => {
      //   this.globalSet = false;
      //   that.pageProps.currentPage = params;
      //   that.getconnectionData();
      // });
    }
  }
</script>

<style scoped>
  .newConnectionButton {
    position: absolute;
    left: 10px;
  }

  .refreshButton {
    position: absolute;
    right: 25px;
  }

  .errortext {
    color: red;
  }

  .successtext {
    color: green
  }

  .runningtext{
    color: orange;
  }

  .warningtext {
    color: yellow;
  }

  .notindextobase {
    color: gray;
  }

  .ellipsis_h{
    color: aqua;
    position: absolute;
    left: 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .red{

    color: red;
  }
  .blue{

    color:blue;
  }
  .yellow{

    color: yellow;
  }
  .grey {

    color: gray;
  }
</style>
