<template>
  <div>
    <!-- 步骤条 -->
    <el-steps :active="active" align-center>
      <el-step title="设计基本信息"></el-step>
      <el-step title="完善成果信息"></el-step>
      <el-step title="设计学生信息"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <!-- 第一步 -->
    <div v-if="active == 1" class="step">
      <el-form
        ref="form"
        :inline="true"
        class="demo-form-inline"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="成果名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="成果等级">
          <el-select v-model="form.level" placeholder="请选择等级">
            <el-option label="国家级" value="1"></el-option>
            <el-option label="省级" value="2"></el-option>
            <el-option label="市级" value="3"></el-option>
            <el-option label="校级" value="4"></el-option>
            <el-option label="院级" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <!-- 第二步 -->
    <div v-if="active == 2" class="step">
      <div v-for="(attr, i) in form.attrs" :key="i">
        <el-form :model="attr" :inline="true" class="demo-form-inline">
          <el-form-item label="属性名称">
            <el-input v-model="attr.name"></el-input>
          </el-form-item>
          <el-form-item label="属性值">
            <el-input v-model="attr.value"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button
        type="primary"
        icon="el-icon-minus"
        circle
        @click="form.attrs.pop()"
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-plus"
        circle
        @click="form.attrs.push({})"
      ></el-button>
    </div>

    <!-- 第三步 -->
    <div v-if="active == 3" class="step">
      <div v-for="(attr, i) in form.studentAttr" :key="i + 1000">
        <el-form :model="attr" :inline="true" class="demo-form-inline">
          <el-form-item label="属性名称">
            <el-input v-model="attr.name"></el-input>
          </el-form-item>
          <el-form-item label="是否必填">
            <el-checkbox
              v-model="attr.required"
              border
              label="必填"
            ></el-checkbox>
          </el-form-item>
        </el-form>
      </div>
      <el-button
        type="primary"
        icon="el-icon-minus"
        circle
        @click="form.studentAttr.pop()"
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-plus"
        circle
        @click="form.studentAttr.push({})"
      ></el-button>
    </div>

    <!-- 第四步 -->
    <div v-if="active == 4" class="step">
      <span class="font-weight">{{ form.name }}</span>
      <span class="font-weight">{{ this.level }}</span>
      <div v-for="(attr, i) in form.attrs" :key="i + 20000">
        <span class="font-weight">{{ attr.name + ":" }}</span>
        <span class="font-light">{{ attr.value }}</span>
      </div>
      <span class="font-weight">学生待填项：</span>
      <div v-for="(attr, i) in form.studentAttr" :key="i + 30000">
        <span>{{ attr.name }}</span>
        <span class="font-weight">{{
          attr.required == true ? "必填" : "非必填"
        }}</span>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="btns">
      <el-button type="primary" @click="preStep">上一步</el-button>
      <el-button v-if="active != 4" type="primary" @click="nextStep"
        >下一步</el-button
      >
      <el-button v-else type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { TeacherDesgin } from "../../api/teacher";
export default {
  data() {
    return {
      active: 1,

      form: {
        name: "",
        level: "",
        attrs: [],
        studentAttr: [],
      },
    };
  },
  methods: {
    //上一步
    preStep() {
      if (this.active > 1) {
        this.active--;
      }
    },
    //下一步
    nextStep() {
      if (this.active < 4) {
        this.active++;
      } else {
        this.active = 1;
      }
    },
    //提交设计
    async submit() {
      const { data } = await TeacherDesgin({
        name: this.form.name,
        level: this.form.level,
        attrs: this.attrs,
        studentAttr: this.studentAttr,
      });
      if (data.status == 200) {
        this.$notify({
          title: "成功录入",
          type: "success",
          position: "bottom-right",
          message: `成功录入成果${this.form.name}`,
        });
      } else {
        this.$notify({
          title: "录入失败",
          type: "error",
          position: "bottom-right",
          message: `成果${this.form.name}录入失败,请检查表单是否完整,或者网络是否通畅`,
        });
      }
    },
  },
  computed: {
    level() {
      switch (this.form.level) {
        case "1":
          return "国家级";
        case "2":
          return "省级";
        case "3":
          return "市级";
        case "4":
          return "校级";
        case "5":
          return "院级";
        default:
          return "不确定";
      }
    },
    attrs() {
      return qs.stringify(this.form.attrs);
    },
    studentAttr() {
      return qs.stringify(this.form.studentAttr);
    },
  },
};
</script>

<style lang="less" scoped>
.step {
  margin: 30px auto;
  span {
    display: inline-block;
    margin: 20px;
  }
}
.font-weight {
  font-weight: bolder;
}
.font-light {
  font-weight: lighter;
}
</style>
