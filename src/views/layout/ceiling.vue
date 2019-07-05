<template>
  <div>
    <div class="layout-ceiling" style="border-bottom: 1px solid #ddd">
      <v-toolbar height="60px" style="background: #f6f8fb">
        <a style="color: white;size: 40px">
          <v-avatar
            size="35"
            color="grey lighten-4"
            style="margin-top: -20px">
            <img src="../../../src/assets/uulogo.png" alt="avatar">
          </v-avatar>
        </a>
        <v-toolbar-title class="height--text">山东天地图检索可视化管理平台</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat @click="userCenter"><i class="fa fa-user-circle-o fa-md"></i>&nbsp;个人中心
          </v-btn>
          <!--<v-btn flat><i class="fa fa-bell-o fa-md"></i>&nbsp;消息</v-btn>-->
          <!--<v-btn flat><i class="fa fa-question-circle-o fa-md"></i>&nbsp;帮助</v-btn>-->
          <v-btn flat @click="userLogin()" v-show="!state"><i class="fa fa-sign-in fa-md"
                                                              style="color:#409EFF"></i>&nbsp;登录
          </v-btn>
          <v-btn flat @click="userLogout()" v-show="state"><i class="fa fa-sign-out fa-md"
                                                              style="color:#ff3135"></i>&nbsp;退出
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'ceiling',
    components: {},
    data: () => ({
      links: [
        '个人中心',
        '消息',
        '帮助',
        '退出'
      ],
      dialogVisible: {
        v: false,
        clickModalClose: false
      },
      isRegister: false,
      state: false
    }),
    methods: {
      userCenter() {

      },
      userLogin() {

      },
      userLogout() {

      }

    },
    computed: {},
    mounted() {
    },
    created() {
      this.getState;
    }
  }
</script>
<style>
  .layout-ceiling {
    color: #4a4e55;
    background: #f6f8fb;
    /*padding: 0;*/
    height: 60px;
    overflow: hidden;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  }

  .v-avatar {
    top: 10px;
    box-shadow: 0 0 20px 3px hsla(0, 0%, 65%, .36),
    0 0 10px 2px hsla(0, 0%, 82%, .23);
    border-radius: 50%;
  }

</style>
