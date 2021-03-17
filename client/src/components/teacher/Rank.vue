<template>
  <div>
    <el-table :data="List" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="level" label="等级">
        <template slot-scope="scope">
          <el-tag>{{ level(scope.row.level) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="申请人数"></el-table-column>
      <el-table-column prop="createdAt" label="录入时间">
        <template slot-scope="scope">
          {{ createdAt(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column type="expand" label="属性" width="150">
        <template slot-scope="scope">
          <span>属性</span>
          <div v-for="(attr, i) in scope.row.attribute" :key="i">
            <span>{{ attr.name }}</span>
            <span>{{ attr.value }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { AchieveRank } from "../../api/teacher";
import Day from "dayjs";
export default {
  data() {
    return {
      List: [],
    };
  },
  methods: {
    async fetch() {
      const { data } = await AchieveRank();
      this.List = data.data;
      console.log(data);
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
    createdAt() {
      return function(time) {
        return new Day(time).format("YYYY-MM-DD");
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
