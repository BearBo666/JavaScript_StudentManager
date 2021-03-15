<template>
  <div class="login_container">
    <div class="login_box">
      <!-- Logo区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.jpg" />
      </div>

      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <div class="btns">
            <div>
              <el-switch
                v-model="role"
                active-text="老师"
                inactive-text="学生"
              ></el-switch>
            </div>
            <div>
              <el-button type="primary" @click="login">登录</el-button>
              <el-button type="info" @click="reseLoginForm">重置</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单的数据绑定
      loginForm: {
        username: "liuguangsheng",
        password: "123456",
      },

      // 这是表单验证规则对象
      loginFormRules: {
        // 用户名验证
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        // 密码验证
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },

      role: false,
    };
  },
  methods: {
    //点重置按钮，重置登录菜单
    reseLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //登录
    async login() {
      this.$router.push("/teacher");
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 110px;
    width: 110px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 10px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: space-between;
}
</style>
