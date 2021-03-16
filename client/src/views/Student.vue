<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>学生成果管理系统</span>
      </div>
      <el-button type="primary" @click="logout" class="logoutBtn"
        >退出</el-button
      >
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '100px' : '180px'">
        <!-- 折叠选项 -->
        <div class="toggle">
          <strong style="font-size:18px;margin-left:20px " class="white"
            >菜单</strong
          >
          <i
            :class="isCollapse ? 'el-icon-arrow-down' : 'el-icon-arrow-left'"
            style="font-size:25px; color:white; margin-right:5px"
            @click="toggleCpllapse"
          ></i>
        </div>

        <!-- 菜单 -->
        <el-menu
          unique-opened
          :default-active="activePath"
          background-color="#304156"
          text-color="#FFFFFF"
          router
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <!-- 报名者菜单 -->
          <el-submenu index="/comer">
            <template slot="title">
              <i class="el-icon-user font-mid white"></i>
              <span class="white" style="font-size:16px">成果管理</span>
            </template>
            <el-menu-item index="/mine">我的成果</el-menu-item>
            <el-menu-item index="/apply">申请成果</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //菜单折叠方式，默认不折叠
      isCollapse: true,
      //激活的菜单项
      activePath: "",
    };
  },
  methods: {
    //退出
    logout() {
      this.$router.push("/login");
    },
    //展开隐藏菜单
    toggleCpllapse() {
      this.isCollapse = !this.isCollapse;
    },
    //保存链接的激活状态
    saveNavState(activePath) {
      this.activePath = activePath;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  width: 100%;
  background-color: rgb(48, 65, 86);
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  color: #fff;
  align-self: center;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.logoutBtn {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-aside {
  background-color: rgb(48, 65, 86);
  transition-property: width;
  /*设置过渡时长 */
  transition-duration: 0.5s;
  /* 过渡变化速率 */
  transition-timing-function: linear;
  .el-menu {
    border-right: none;
  }
}
.font-mid {
  font-size: 20px;
}
.font-large {
  font-size: 25px;
}
.white {
  color: white;
}
.toggle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.el-main {
  background-color: rgb(241, 241, 241);
}
</style>
