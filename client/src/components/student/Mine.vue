<template>
  <div>
    <el-table :data="List" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="achieveName" label="成果名称"></el-table-column>
      <el-table-column prop="status" label="审核状态">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.status == 0">
            {{ status(scope.row.status) }}
          </el-tag>
          <el-tag type="success" v-else-if="scope.row.status == 1">
            {{ status(scope.row.status) }}
          </el-tag>
          <el-tag type="danger" v-else>
            {{ status(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column type="expand" label="录入属性" width="200">
        <template slot-scope="scope">
          <span>学生录入信息</span>
          <div class="attr" v-for="(attr, i) in scope.row.studentAttr" :key="i">
            <span>{{ attr.name }}</span>
            <span>{{ attr.value }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { StudentAchieve } from "../../api/student";
export default {
  data() {
    return {
      List: [],
    };
  },
  methods: {
    async fetch() {
      let account = window.localStorage.getItem("stuNum");
      const { data } = await StudentAchieve({ account });
      this.List = data.data;
    },
  },
  mounted() {
    this.fetch();
  },
  computed: {
    status() {
      return function(value) {
        if (value == "0") {
          return "未审核";
        } else if (value == "1") {
          return "审核通过";
        } else {
          return "审核不通过";
        }
      };
    },
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
