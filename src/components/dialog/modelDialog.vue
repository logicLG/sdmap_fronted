<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible.v"
      :artifactId="artifactId"
    >
      <h4 style="padding-left:42%;font-size:20px;">模型参数</h4>
      <el-form style="padding-top:20px"
               :model="myform" :rules="rules" ref="myform"
               :label-position="labelPosition" label-width="100px">
        <el-form-item label="任务名称" prop="taskname">
          <el-input v-model="taskname"></el-input>
        </el-form-item>
        <el-form-item v-for="(value,i) in params"

                      :label="params[i].label"
        >
          <el-input v-model="params[i].defaultvalue"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submit">提交</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  //import myForm from '../form/modelForm';

  export default {
    name: "model-dialog",
    data() {
      return {
        myform: {},
        modelparamData: {},
        artifactId: '',
        infoData: {},
        params: [],
        labelPosition: 'left',
        dialogVisible: Object,
        taskname: '',
        baseparam: [],
        modelparam: [],
        rules: {}
      }

    },
    components: {
      //"v_myForm": myForm,
    },
    props: {
      currentPage: String
    },
    methods: {
      initParallelModel() {
        let infoData = {};
        let obj = this;
        this.$axios.get(obj.$URL.publicModelUrl, {"artifactId": this.artifactId})
          .then((res) => {
            if (res.status === 'ok') {
              if (res.result.length === 0) {
                obj.infoData = {};
                return;
              }

              obj.infoData = res.result[0];
              //let modelpara = [];
              let parm = JSON.parse(obj.infoData.parameters);
              obj.baseparam = parm.modelfield.baseParam;
              if (parm.modelfield.modelParam) {
                obj.modelparam = parm.modelfield.modelParam;
              }
              if (!parm.modelfield.modelParam) {
                obj.params = obj.baseparam.concat(obj.modelparam);
              } else obj.params = obj.baseparam;
            }
          }).catch(function (error) {
          console.log(error);
          obj.$message.error('模型参数获取失败!');
        });
        /*if (this.$refs.myform)
            this.$refs.myform.reset();*/
      },
      /*getGMData(data) {
          this.$emit("totalModelParam", data);
      },*/
      submit() {
        this.dialogVisible.v = false;
        let obj = this;
        let modelparamData = {};
        let para = [];
        for (let i = 0; i < obj.baseparam.length; i++) {
          para.push(obj.baseparam[i].defaultvalue)
        }
        let temp = [];
        for (let i = 0; i < obj.modelparam.length; i++) {
          temp.push(obj.modelparam[i].defaultvalue)
        }
        para.push(temp.join(","));
        modelparamData.params = para;
        modelparamData.customname = this.taskname;
        this.$axios.post(obj.$URL.submitURL, {
            "name": modelparamData.customname,
            "mainClass": obj.infoData.mainclass,
            "appResource": obj.infoData.jarpath,
            "args": obj.artifactId + "$" + para.join("$")
          }
        ).then(function (res) {
          if (res.status == "ok") {
            obj.$message({
              type: 'success',
              message: '模型提交成功!请前往模型项目查看运行进度！'
            });
          } else {
            obj.$message.error('模型提交失败!');
          }
        }).catch(function (error) {
          obj.$message.error('模型提交失败!');
        });
      },

      reset() {
        this.$refs["myform"].resetFields();
        //this.$refs["modelparamData"].resetFields();
      },
    },

    mounted() {
      this.$Bus.$on('pop', (dialogVisible, artificatId) => {
        this.dialogVisible = dialogVisible;
        this.artifactId = artificatId;
        //this.currentItemId = currentItemId;
        this.initParallelModel();
      })
    },
  }
</script>
<style>
  .el-dialog__body {
    padding: 10px 30px 10px 20px;
  }
</style>
