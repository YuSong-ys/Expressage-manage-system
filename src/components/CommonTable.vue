<template>
  <div class="common-table">
    <el-table :data="tableData" height="100%" v-loading="config.loading">
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page - 1) * 15 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" :width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      class="pager"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableLabel: Array,
    tableData: Array,
    config: Object
  },
  methods: {
    handleEdit(row) {
      this.$emit('edit', row)
    },
    handleDelete(row) {
      this.$emit('delete', row)
    },
    //   分页触发
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  height: calc(100% - 64px);
  background-color: #fff;
  padding-bottom: 28px;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
