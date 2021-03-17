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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { AchieveList } from "../../api/student";
export default {
  data() {
    return {
      List: [],
    };
  },
  methods: {
    async fetch() {
      const { data } = await AchieveList();
      this.List = data.data;
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
  },
};
</script>

<style lang="less" scoped>
.name,
.value {
  display: inline-block;
  margin: 5px 20px;
}
</style>
