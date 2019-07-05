<template>
    <div>
    <!--<el-button style="margin-left: 90%" type="primary" @click="refreshData">-->
      <!--刷新-->
      <!--</el-button>-->
      <el-table ref="mytable"
    :data="task"
    :default-sort="{prop: 'submitTime', order: 'descending'}"
    style="margin:0 auto;">
      <!--prop="remarks"v-bind:projectname width="fit-content"-->
      <el-table-column
    prop="remarks"
    label="项目名称"
    style="width: 25%"
    align="center">
      </el-table-column>
      <el-table-column
    label="进度"
    style="width: 25%"
    align="center">
      <template slot-scope="scope">
      <el-progress
    :percentage="scope.row.progress|toNumber"
    :status="scope.row.status">
      </el-progress>
      </template>
      </el-table-column>

      <el-table-column
    label="终止"
    width="50px"
    align="center">
      <template slot-scope="scope">
      <el-button
    title="终止状态"
    :disabled="scope.row.killCondition"
    icon="fa fa-ban"
    @click="killCondition(scope.$index, scope.row)"
    type="text">
      </el-button>
      </template>
      </el-table-column>

      <el-table-column
    prop="state"
    label="状态"
    style="width: 10%"
    align="center">
      </el-table-column>
      <el-table-column
    prop="submitTime"
    label="提交日期"
    style="width: 15%"
    align="center">
      </el-table-column>
      <el-table-column
    prop="finishTime"
    label="完成日期"
    style="width: 15%"
    align="center">
      </el-table-column>
      <el-table-column
    label="操作"
    style="width: 10%"
    align="center">
      <template slot-scope="scope">
      <!--<el-button-->
      <!--title="结果预览"-->
      <!--:disabled="scope.row.view"-->
      <!--@click="previewData(scope.$index, scope.row)"-->
      <!--type="text">-->
      <!--<i class="fa fa-table"></i>-->
      <!--</el-button>-->
      <!--<el-button-->
      <!--title="图表预览"-->
      <!--v-show="scope.row.chartVisible"-->
      <!--:disabled="scope.row.chart"-->
      <!--@click="previewChart(scope.$index, scope.row)"-->
      <!--type="text">-->
      <!--<i class="fa fa-line-chart"></i>-->
      <!--</el-button>-->
      <!--<el-button-->
      <!--title="结果上图"-->
      <!--v-show="scope.row.mapVisible"-->
      <!--:disabled="scope.row.map"-->
      <!--@click="openDataResourceOnMap(scope.$index, scope.row)"-->
      <!--type="text">-->
      <!--<i class="fa fa-globe"></i>-->
      <!--</el-button>-->
      <el-button
    title="结果下载"
    :disabled="scope.row.download"
    icon="el-icon-download"
    @click="download(scope.$index, scope.row)"
    type="text">
      </el-button>
      <!--<el-button-->
      <!--id="deletepro"-->
      <!--:disabled="scope.row.delete"-->
      <!--icon="el-icon-delete"-->
      <!--@click.native.prevent="deleteRow(scope.$index, scope.row)"-->
      <!--type="text">-->
      <!--</el-button>-->
      </template>
      </el-table-column>
      </el-table>
      <data-pagination ref="dataPagination"></data-pagination>
    </div>
</template>

<script>
    import dataPagination from '../components/pagination/datapagination';

    export default {
        name: "modelProjectTable",
        components: {
          "data-pagination": dataPagination,

        },
        data() {
            return {
                task: [],
                transData: [],
                name:"",
                mountedsuperviseTimer:"",
                pageProps: {
                  pageSize: 10,
                  currentPage: 1
                },
                totalsize:10,

            }
        },
        filters: {
            toNumber: function (value) {
                return parseInt(value)
            }
        },
        methods: {
            killCondition(index, rows){
              let obj = this;
              obj.$axios.post(obj.$URL.killcondition+"?appId="+rows.id).then(function (res){

                  if(res.status === 'ok')obj.getProjectData();
              });
            },
            deleteRow(index, rows) {
                let obj = this;
                //TODO 在数据中删除
                //调用删除数据的方法，再获取数据
                this.$confirm('是否删除该条模型运行记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    obj.$axios.remove(this.$URL.deleteParallelJobUrl + rows.id + '/delete')
                        .then(function (response) {
                            if (response.code === 200) {
                                obj.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                obj.$emit('childrefresh');
                            } else {
                                obj.$message({
                                    type: 'warning',
                                    message: '删除错误!请刷新列表'
                                });
                            }
                        }).catch(function (error) {
                        obj.$message.error("删除失败！");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            download(index, rows) {
                //下载数据
                let obj = this;
                // this.$axios.get(obj.$URL.downloadModel + "?appId=" + rows.id).then(function (res) {
                //
                // })
                window.open(this.$serverUrl + obj.$URL.downloadModel + "?appId=" + rows.id + "&tk=6d0859a912424ae3b41c306a5a1d7022",'_blank');
            },
            //first--one
            getProjectData() {
                let obj = this;
                obj.$axios.get(obj.$URL.userParallelJobUrl+"?"+ "page=" + obj.pageProps.currentPage +"&size=" + obj.pageProps.pageSize)
                  .then(function (res){
                    // this.totalsize = res.result.total;
                    // debugger;
                    obj.$Bus.$emit("totalSize", res.result.total);
                        if (res.status === 'ok') {
                            for (let singleData of res.result.data) {
                                // debugger;
                                let row = singleData;
                                if (row.submitTime != null)
                                {
                                  row.submitTime = obj.$tool.timestampConvert(row.submitTime);
                                }
                                row.remarks = row.name;
                                row.map = true;
                                row.chart = true;

                                let exist = false;
                                let index=-1;

                                for (let item in obj.task) {
                                    if (obj.task[item].id === row.id) {
                                      exist = true;
                                      index=item;
                                      break;

                                    }
                                }
                                //数据本身不在列表中
                                if (!exist) {
                                    row.progress = 0;
                                    row.download = true;
                                    row.view = true;
                                    row.delete = true;
                                    row.killCondition = false;

                                    if (singleData.finalStatus === "FAILED") {
                                        row.progress = 100;
                                        row.status = "exception";
                                        row.delete = false;
                                        row.map = true;
                                        row.chart = true;
                                        row.killCondition = true;
                                        if (row.finishTime)
                                        {
                                          row.finishTime = obj.$tool.timestampConvert(row.finishTime);
                                        }
                                    } else if (singleData.finalStatus === "KILLED")
                                    {
                                        row.progress = 0;
                                        row.status = "exception";
                                        row.delete = false;
                                        row.map = true;
                                        row.chart = true;
                                        if (row.finishTime)
                                        {
                                          row.finishTime = obj.$tool.timestampConvert(row.finishTime);
                                        }
                                        row.killCondition = true;
                                    }
                                    else if(singleData.finalStatus === "SUCCEEDED"){
                                        row.progress = 100;
                                        row.status = "success";
                                        row.download = false;
                                        row.view = false;
                                        row.delete = false;
                                        row.map = false;
                                        row.chart = false;
                                        row.killCondition = true;
                                        if (row.finishTime)
                                        {
                                          row.finishTime = obj.$tool.timestampConvert(row.finishTime);
                                        }
                                    }
                                    else if (singleData.finalStatus === "UNDEFINED" || singleData.finalStatus === "NEW" || singleData.finalStatus === "NEW_SAVING"
                                            || singleData.finalStatus === "SUBMITTED" || singleData.finalStatus === "ACCEPTED")
                                    {
                                          row.state = "RUNNING";
                                    }
                                    else {
                                        row.progress = 0;
                                        row.status = "success";
                                        row.download = false;
                                        row.view = false;
                                        row.delete = false;
                                        row.map = false;
                                        row.chart = false;
                                        row.killCondition = true;
                                        row.state="RUNNING";
                                        if (row.finishTime) {
                                          row.finishTime = obj.$tool.timestampConvert(row.finishTime);
                                        }
                                    }
                                    debugger;
                                    if (obj.task.length == obj.pageProps.pageSize)
                                    {
                                      obj.task.splice(obj.pageProps.pageSize - 1,1);
                                      obj.task.splice(0,0,row);
                                    }
                                    else {
                                      obj.task.push(row);
                                    }

                                }
                                else
                                {
                                  // debugger;
                                  if (singleData.finalStatus === "UNDEFINED") {
                                      obj.$axios.get(obj.$URL.modelMonitorUrl + "?" + "appId=" + singleData.id)
                                        .then(function (response) {
                                            if (response.result.state === "RUNNING") {
                                              if (response.result.progress !== "") {
                                                obj.task[index].progress = response.result.progress*100;
                                              }
                                              obj.task[index].state = "RUNNING";
                                              obj.task[index].finishTime = "";
                                              obj.task[index].download = true;
                                              obj.task[index].killCondition=false;
                                            } else if (response.result.state === "FAILED"
                                              || response.result.state === "KILLED") {
                                              obj.task[index].status = "exception";
                                              obj.task[index].progress = 0;
                                              //没有成功的话，没有完成时间
                                              if (response.result.finishTime != null)
                                              {
                                                obj.task[index].finishTime = obj.$tool.timestampConvert(response.result.finishTime);
                                              }
                                              obj.task[index].state = response.result.state;
                                              obj.task[index].delete = false;
                                              obj.task[index].killCondition=true;
                                            }
                                             else {
                                              obj.task[index].progress = response.result.progress*100;
                                              obj.task[index].status = "success";
                                              obj.task[index].state = "SUCCEEDED";
                                              //成功的话，对完成时间进行赋值
                                              if (response.result.finishTime != null)
                                              {
                                                obj.task[index].finishTime = obj.$tool.timestampConvert(response.result.finishTime);
                                              }
                                              //   row.finishTime = obj.$tool.timestampConvert(response.body.finishedTime);
                                              obj.task[index].download = false;
                                              obj.task[index].view = false;
                                              obj.task[index].delete = false;
                                              obj.task[index].map = false;
                                              obj.task[index].chart = false;
                                              obj.task[index].killCondition=true;
                                            }

                                        })

                                  }

                                }
                            }
                        }
                    }).catch(function (error) {
                    obj.$message.error('获取项目数据失败!');
                });
            },
            //加载所点击的数据到地图上
            openDataResourceOnMap(index, row) {
                this.$Bus.$emit("mapDialogParams", {
                    title: row.remarks,
                    visible: true,
                    queryUrl: this.$URL.previewParallelResultUrl + row.id + "/geojson",
                    // queryUrl: this.$URL.previewParallelResultUrl + "geojsonWithOptionalFields",
                    queryParams: {
                        // offset: 0,
                        size: 300,//TODO:需要设置分页,注意offset要乘以size
                        // jobName:
                        // ordinal:
                        // featureType:
                        //fieldsMap:

                    }
                });
            },
            previewData(index, row) {
                this.$Bus.$emit("dataDialogParams", {
                    title: row.remarks,
                    visible: true,
                    queryUrl: this.$URL.previewParallelResultUrl + row.applicationId,
                    queryParams: {
                        offset: 0,
                        size: 100//TODO:需要设置分页,注意offset要乘以size
                    }
                });
            },
            previewChart(index, row) {
                let that = this;
                let queryUrl = this.$URL.previewParallelResultUrl + row.applicationId + '?size=50000';
                that.$axios.get(queryUrl).then(function (res) {
                    if (res.code == 200) {
                        that.$Bus.$emit('chartParams', res.body);
                        that.$Bus.$emit('chartVisible.v', true);
                    } else {
                        that.$message(res.message);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
            ,refreshData(){
              this.getProjectData();
          }
        },

        mounted() {
          this.$Bus.$on("pageSize", (params) => {
            debugger;
            that.pageProps.pageSize = params;
            this.getProjectData();
          });
          this.$Bus.$on("currentPage", (params) => {
            that.pageProps.currentPage = params;
            this.getProjectData();
          });

          this.getProjectData();
          this.getProjectData();
          let that = this;
          that.mountedsuperviseTimer = setInterval(function () {
            that.getProjectData()
          },5000);

        },
        destroyed() {
          clearInterval(this.mountedsuperviseTimer);
        }
    }
</script>

<style>
    .el-input--prefix .el-input__inner {
        border-radius: 20px;
    }

    .el-table td, .el-table th {
        background-color: #f8f8f9;
    }

    .el-table__empty-block {
        background-color: #f8f8f9;
    }

    .el-el-table-column {
        text-align: center;
    }

    #deletepro:hover {
        color: #fe6970;
    }
</style>
