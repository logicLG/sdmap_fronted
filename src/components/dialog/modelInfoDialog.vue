<template>
  <el-dialog :visible.sync="modelInfoVisible.v" :artifactId="artifactId" :infoData="infoData"
             :close-on-click-modal="false">
    <h4 style="padding-left:2%;font-size: 18px;">模型简介</h4>
    <div style="padding-left:2%;padding-top:3%">
      <p>模型ID：{{artifactId}}</p>
      <p>模型名称：{{infoData.name}}</p>
      <p>模型描述：{{infoData.description}}</p>
      <p>模型用途：{{infoData.usagetype}}</p>
      <p>程序类型：{{infoData.frametype}}</p>
      <p>模型关键字：{{infoData.keywords}}</p>
      <p>日期：{{infoData.date}}</p>
      <!--<p>模型版本：{{this.infoData.versionId}}</p>
      <p>作者：{{this.infoData.authorId}}</p>
      <p>联系作者：{{this.infoData.email}}</p>
      <p>模型参数:</p>-->
      <!--<span>
                <el-table :data="infoData.paramData">
                      <el-table-column
                        prop="name"
                        label="参数"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="default"
                        label="默认值"
                        width="80"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="datatype"
                        label="数据类型"
                        width="100"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="description"
                        label="描述">
                      </el-table-column>
                </el-table>
            </span>
      <p style="margin-top: 20px">输入:</p>
      <span>
                <el-table v-for="(table,index) in inputTables"
                          :key="index"
                          border
                          style="margin-top: 5px"
                          :data="table.fields">
                      <el-table-column
                        prop="name"
                        label="参数"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="default"
                        label="默认值"
                        width="80"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="datatype"
                        label="数据类型"
                        width="100"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="description"
                        label="描述">
                      </el-table-column>
                </el-table>
            </span>
      <p style="margin-top: 20px">输出:</p>
      <span>
                <el-table v-for="(table,index) in outTables"
                          :key="index"
                          border
                          style="margin-top: 5px"
                          :data="table.fields">
                      <el-table-column
                        prop="name"
                        label="参数"
                        width="200">
                      </el-table-column>
                      <el-table-column
                        prop="default"
                        label="默认值"
                        width="80"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="datatype"
                        label="数据类型"
                        width="100"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="description"
                        label="描述">
                      </el-table-column>
                </el-table>
            </span>-->
    </div>
  </el-dialog>
</template>

<script>

  export default {
    name: "modelInfoDialog",
    data() {
      return {
        modelInfoVisible: Object,
        artifactId: '',
        infoData: {},
        //inputTables: [],
        //outTables: [],
      }
    },
    computed: {},
    methods: {
      getInfoData: function () {
        let infoData = {};
        let obj = this;
        this.$axios.get(obj.$URL.modelInfoUrl, {"artifactId": this.artifactId})
          .then((res) => {
              if (res.status === 'ok') {
                if (res.result.length === 0) {
                  obj.infoData = {};
                  return;
                }
                obj.infoData = res.result[0];
                //obj.infoData.paramData = JSON.parse(obj.infoData.parameters);
                // obj.inputTables = JSON.parse(obj.infoData.input);
                //obj.outTables = JSON.parse(obj.infoData.out);
                /*if (!obj.infoData.packages || obj.infoData.packages === "[{}]" || obj.infoData.packages === "[]") {
                  obj.infoData.packages = '';
                } else {
                  let pack = JSON.parse(obj.infoData.packages);
                  let packString = ' ';
                  for (let i = 0; i < pack.length; i++) {
                    packString = packString + pack[i].name;
                  }
                  console.log(packString);
                  obj.infoData.packages = packString;
                }*/
              }
            }
          ).catch(function (error) {
          console.log(error);
          obj.$message.error('失败！');
        });

      }
      ,
    }
    ,
    mounted() {
      this.$Bus.$on('pob', (modelInfoVisible, artificatId) => {
        this.modelInfoVisible = modelInfoVisible;
        this.artifactId = artificatId;
        this.getInfoData();
      });
    }
    ,
    created() {

    }
  }
</script>

<style>

</style>


// WEBPACK FOOTER //
// modelInfoDialog.vue
