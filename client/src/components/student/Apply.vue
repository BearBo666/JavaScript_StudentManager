<template>
  <div>
    <!-- 循环行 -->
    <el-row :gutter="20" v-for="o in Math.ceil(List.length / 4)" :key="o">
      <!-- 每行4列 -->
      <el-col :span="6" v-for="i in 4" :key="i">
        <el-card shadow="hover" v-if="List[(o - 1) * 4 + i - 1]">
          <!-- 头部 -->
          <div slot="header" class="clearfix">
            <span>{{ List[(o - 1) * 4 + i - 1].name }}</span>
            <el-tag style="float: right;">
              {{ level(List[(o - 1) * 4 + i - 1].level) }}
            </el-tag>
          </div>
          <!-- body -->
          <div
            v-for="(attr, i) in List[(o - 1) * 4 + i - 1].attribute"
            :key="i"
          >
            <span class="name">{{ attr.name }}</span>
            <span class="value">{{ attr.value }}</span>
          </div>
          <!-- 底部 -->
          <div class="footer">
            <el-button type="primary" round @click="apply((o - 1) * 4 + i - 1)"
              >申请</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="showDialog">
      <el-form :model="form">
        <el-form-item
          v-for="(key, i) in keys"
          :key="i"
          :label="key"
          :rules="[
            {
              required: List[index].studentAttr[key],
              message: '此项必填',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="form2[key]"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">提 交</el-button>
        <el-button type="danger" @click="showDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import { AchieveList, StudentApply } from "../../api/student";
export default {
  data() {
    return {
      //成果列表
      List: [],
      //展示对话框
      showDialog: false,
      //表单
      form: {},
      //学生填写的表单
      form2: {},
      //成果下标
      index: -1,
    };
  },
  methods: {
    async fetch() {
      const { data } = await AchieveList();
      if (data.status == 200) {
        this.List = data.data;
      } else {
        this.$message.error("网络请求失败");
      }
      console.log(this.List[0].level);
    },
    apply(index) {
      //记录申请的成果的数组下标
      this.index = index;
      //记录申请的成果的学生属性
      this.form = this.List[index].studentAttr;
      //展示对话框
      this.showDialog = true;
      //给学生表单赋值
      for (let i = 0; i > this.keys.length; i++) {
        this.form2[this.keys[i]] = "";
      }
    },
    async submit() {
      const { data } = await StudentApply({
        account: window.localStorage.getItem("stuNum"),
        achievementId: this.List[this.index].id,
        attribute: qs.stringify(this.form2),
      });
      if (data.status == 200) {
        this.$notify({
          title: "申请成果",
          type: "success",
          position: "bottom-right",
          message: `已发送给老师`,
        });
        this.showDialog = false;
      } else if (data.status == 201) {
        this.$notify({
          title: "重复申请",
          type: "success",
          position: "bottom-right",
          message: `请勿重复申请`,
        });
        this.showDialog = false;
      } else {
        this.$notify({
          title: "错误",
          type: "error",
          position: "bottom-right",
          message: `请求错误,请检查网络或检查填写的参数`,
        });
      }
    },
  },
  mounted() {
    this.fetch();
  },
  computed: {
    level() {
      return function(value) {
        switch (value) {
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
            return "未设定";
        }
      };
    },
    keys() {
      return Object.keys(this.form);
    },
  },
};
</script>

<style lang="less" scoped>
.name,
.value {
  display: inline-block;
  margin: 5px 20px;
}
.footer {
  margin: 20px auto 0px auto;
  display: flex;
  justify-content: flex-end;
}
</style>
