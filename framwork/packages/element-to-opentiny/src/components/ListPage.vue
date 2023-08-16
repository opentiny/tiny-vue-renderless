<template>
  <div>
    <div class="filter-bar">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker v-model="value1" type="daterange"> </el-date-picker>
      <el-input
        v-model="search"
        placeholder="输入关键字搜索"
        style="width: 300px"
      />
      <el-button>搜索</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      options: [
        {
          value: '选项1',
          label: '王小虎'
        },
        {
          value: '选项2',
          label: '张三'
        },
        {
          value: '选项3',
          label: '李小萌'
        },
        {
          value: '选项4',
          label: '令狐冲'
        }
      ],
      value: '',
      search: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '张三',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '李小萌',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '令狐冲',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.filter-bar {
  display: flex;

  & > * {
    margin-right: 20px;
  }
}
</style>
