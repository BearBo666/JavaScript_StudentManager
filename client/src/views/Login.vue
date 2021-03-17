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
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.account"
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
import { StudentLogin } from "../api/student";
import { TeacherLogin } from "../api/teacher";
export default {
  data() {
    return {
      // 登录表单的数据绑定
      loginForm: {
        account: "",
        password: "wust123456",
      },
      //平台使用人身份,true老师,false学生
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
      console.log("111");
      if (this.role) {
        const { data } = await TeacherLogin(this.loginForm);
        console.log(data);
        if (data.status == 200) {
          this.$message.success("登录成功！");
          this.$router.push("/teacher");
        } else {
          this.$message.error("登录失败,请检查账号或网络！");
        }
      } else {
        const { data } = await StudentLogin(this.loginForm);
        console.log(data);
        if (data.status == 200) {
          this.$message.success("登录成功！");
          window.localStorage.setItem("stuNum", this.loginForm.account);
          this.$router.push("/student");
        } else {
          this.$message.error("登录失败,请检查账号或网络！");
        }
      }
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
