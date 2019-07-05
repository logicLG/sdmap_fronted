<template>
  <span style="z-index: 11">
    <ceiling style="width: 100%;background: #f6f8fb;height: 60px"></ceiling>
    <!--左侧目录-->
    <div class="left col" :class="{ collapse: isCollapse }">
      <div class="header row " style="text-align: center;height: 50px" :style="{width: isCollapse?'64px':'auto'}">
        <span :class="[isCollapse ? 'text-alight-center' : 'floating-right']" @click="toggleClick">
            <i class="fa fa-bars" style="margin-left: -6px"></i>
        </span>
      </div>
      <div class="body row scroll-y" style="top:45px">
        <sidebar :isCollapse="isCollapse" theme="dark"></sidebar>
      </div>
    </div>
    <!--右侧布局-->
    <div class="right col body" :style="{left: isCollapse?'64px':'200px'}">
      <div class="body row scroll-y" style="padding: 1em">
        <router-view></router-view>
      </div>
    </div>
  </span>
</template>

<script>
  import ceiling from './layout/ceiling.vue'
  import sidebar from './layout/sidebar.vue'

  export default {
    components: {
      sidebar,
      ceiling
    },
    data() {
      return {
        isCollapse: false
      }
    },
    methods: {
      init() {
        this.$store.dispatch('initial', {})
      },
      toggleClick() {
        this.isCollapse = !this.isCollapse
      }
    },
    watch: {},
    mounted() {
      this.init()
    }
  }
</script>

<style>
  @import "./layout/css/layout.css";
  @import "../style/dark.theme.css";

  html, body {
    overflow: hidden;
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .right.col {
    top: 60px;
  }

  .left.col {
    top: 59px;
  }

  .body.row {
    top: 1px;
  }
</style>
