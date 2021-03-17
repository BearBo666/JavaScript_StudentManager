<template>
  <div>
    <el-table :data="List" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="学生姓名" prop="name"></el-table-column>
      <el-table-column label="学生学号" prop="stuNum"></el-table-column>
      <el-table-column label="成果名称" prop="achieveName"></el-table-column>
      <el-table-column label="审核状态" width="150">
        <template slot-scope="scope">
          <el-tag type="danger">{{
            scope.row.status == "0" ? "未审核" : "已审核"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column type="expand" label="详情" width="70">
        <template slot-scope="scope">
          <span>学生录入信息</span>
          <div class="attr" v-for="(attr, i) in scope.row.studentAttr" :key="i">
            <span>{{ attr.name }}</span>
            <span>{{ attr.value }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-check"
            @click="pass(scope.row.achieveId, scope.row.stuNum)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            @click="deny(scope.row.achieveId, scope.row.stuNum)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetUnexamined, TeacherExamine } from "../../api/teacher";
export default {
  data() {
    return {
      List: [],
    };
  },
  methods: {
    async fetch() {
      let { data } = await GetUnexamined();
      this.List = data.data;
    },
    async pass(id, stuNum) {
      const { data } = await TeacherExamine({
        achievementId: id,
        stuNum: stuNum,
        newStatus: 1,
      });
      if (data.status == 200) {
        this.$notify({
          title: "审核成功",
          type: "success",
          position: "bottom-right",
          message: `批准${stuNum}的成果！`,
        });
      } else {
        this.$notify({
          title: "审核失败",
          type: "error",
          position: "bottom-right",
          message: `批准失败！`,
        });
      }
      this.fetch();
    },
    async deny(id, stuNum) {
      const { data } = await TeacherExamine({
        achievementId: id,
        stuNum: stuNum,
        newStatus: 2,
      });
      if (data.status == 200) {
        this.$notify({
          title: "审核成功",
          type: "success",
          position: "bottom-right",
          message: `拒绝${stuNum}的成果！`,
        });
      } else {
        this.$notify({
          title: "审核失败",
          type: "error",
          position: "bottom-right",
          message: `批准失败！`,
        });
      }
      this.fetch();
    },
  },
  async mounted() {
    this.fetch();
  },
};
</script>

<style lang="less" scoped>
span {
  display: inline-block;
  margin: 20px;
  font-weight: bolder;
}
</style>
