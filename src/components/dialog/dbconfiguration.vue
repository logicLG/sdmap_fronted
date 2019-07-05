<template>
  <el-dialog
    title="数据库连接配置"
    :visible.sync="dbconDialogVisible"
    width="40%"
    :before-close="modalClose"
    center>
    <el-form label-position="left" :rules="rules" label-width="110px" size="mini" :model="dbconfForm">
      <el-form-item label="目录" prop="name">
        <el-input v-model="dbconfForm.catalog"></el-input>
      </el-form-item>
      <el-form-item label="连接名称" prop="name">
        <el-input v-model="dbconfForm.name"></el-input>
      </el-form-item>
      <el-form-item label="主机名" prop="host">
        <el-input v-model="dbconfForm.host"></el-input>
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model="dbconfForm.port"></el-input>
      </el-form-item>
      <el-form-item label="数据库或服务" prop="db">
        <el-input v-model="dbconfForm.db"></el-input>
      </el-form-item>
      <el-form-item label="数据库类型" prop="dbType">
        <el-select v-model="dbconfForm.dbType">
          <el-option value='postgis' label='postgis'>postgis</el-option>
          <el-option value='oracle' label='oracle'>oracle</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" prop="user">
        <el-input v-model="dbconfForm.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="dbconfForm.password"></el-input>
      </el-form-item>
      <el-form-item label="表名" prop="tableName">
        <el-input v-model="dbconfForm.tableName"></el-input>
      </el-form-item>
      <el-form-item label="功能描述">
        <el-checkbox-group v-model="dbconfForm.func" :min="1">
          <el-checkbox label="index">索引</el-checkbox>
          <el-checkbox label="analyze">分析</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitConnection">确 定</el-button>
    <el-button @click="modalClose">取 消</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "dbconfiguration",
    props: {
      dbconDialogVisible: Boolean
    },
    data() {
      return {
        dbconfForm: {
          catalog:"",
          name: "",
          host: "",
          port: "1521",
          user: "",
          password: "",
          db: "",
          dbType: "oracle",
          tableName: "",
          func: ["index"]
        },
        rules: {
          catalog: [
            {required: true, message: '请输入目录名称', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入连接名称', trigger: 'blur'}
          ],
          host: [
            {required: true, message: '请输入主机', trigger: 'blur'}
          ],
          port: [
            {required: true, message: '请输入端口', trigger: 'blur'}
          ],
          db: [
            {required: true, message: '请输入数据库或服务名', trigger: 'blur'}
          ],
          user: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          tableName: [
            {required: true, message: '请输入表名', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      modalClose() {
        this.$emit("update:dbconDialogVisible", false);
      },
      submitConnection() {
        let that = this;
        let backgroundfunc = this.dbconfForm.func.toString();
        that.modalClose();
        this.$axios.post(that.$URL.connURL, {
          // "catalog":that.dbconfForm.catalog,
          "name": that.dbconfForm.name+"-"+that.dbconfForm.catalog,
          "host": that.dbconfForm.host,
          "port": that.dbconfForm.port,
          "db": that.dbconfForm.db,
          "func": backgroundfunc,
          "dbType": that.dbconfForm.dbType,
          "user": that.dbconfForm.user,
          "password": that.dbconfForm.password,
          "tableName": that.dbconfForm.tableName
        }).then(function (res) {

          if (res.status == "ok") {
            that.$message.success("添加连接成功");
            that.$parent.getconnectionData();
          } else {
            that.$message.error("添加连接失败");
          }
        }).catch(function (err) {
          that.$message.error("添加连接失败");
          that.modalClose();
        });
      }
    }
    ,
    mounted(){
      console.log(1)
    }
  }
</script>

