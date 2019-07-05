<template>
  <span id="sidebar">
    <!--侧边栏颜色-->
    <el-menu
      router
      :default-active="$router.name"
      :default-openeds="openedMenuList"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      text-color="#4a4e55"
      active-text-color="#2d8cf0"
      background-color="#f6f8fb"
      :collapse="isCollapse">
      <template v-for="item in menuList">
        <el-submenu v-if="item.children" :index="item.name" :route="item" :key="item.path">
          <template slot="title" :index="item.name">
            <i :class="item.icon"></i>
            <span class="sidebar-menu-text" slot="title">{{ item.meta.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="groupItem in item.children" :index="groupItem.name" :key="groupItem.path"
                          :route="groupItem">
              <i :class="groupItem.icon" :key="groupItem.path" style="width:24px"></i>
              <span class="sidebar-menu-text" slot="title">{{ groupItem.meta.title }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-if="!item.children" :index="item.name" :route="item" :key="item.path">
          <i :class="item.icon"></i>
          <span class="sidebar-menu-text" slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </span>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>
<script>
  import {appRouter} from '../../router'

  export default {
    name: 'sidebar',
    props: {
      theme: {type: String, default: 'dark'},
      isCollapse: {type: Boolean, default: false}
    },
    data() {
      return {
        currentPageName: null,
        openedMenuList: []
      }
    },
    computed: {
      menuList() {
        return this.$store.state.layout.menuList.slice()
      }
    },
    watch: {},
    methods: {
      init() {
        this.currentPageName = this.$route.name;
      },
      handleOpen(key, keyPath) {
      },//打开下拉选项事件的响应函数
      handleClose(key, keyPath) {
      },//关闭下拉选项事件的响应函数
      handleSelect(menuName) {
        this.currentPageName = menuName;
        this.$router.push({
          name: menuName
        })
      }
    },
    mounted() {
      this.init();
    }
  }
</script>
