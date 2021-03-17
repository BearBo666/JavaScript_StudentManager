<template>
  <div>
    <el-table :data="List" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="stuName" label="学生姓名"></el-table-column>
      <el-table-column prop="stuNum" label="学生学号"></el-table-column>
      <el-table-column prop="achievementNum" label="成果个数"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { StudentRank } from "../../api/teacher";
export default {
  data() {
    return {
      List: [],
    };
  },
  methods: {
    async fetch() {
      const { data } = await StudentRank();
      this.List = data.data;
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>
