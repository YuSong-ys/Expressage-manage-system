<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增订单' : '更新订单'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm"></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增订单</el-button>
      <common-form inline :formLabel="formLabel" :form="searchForm">
        <el-button type="primary" @click="searchUser">搜索</el-button>
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @delete="deleteUser"
    ></common-table>
  </div>
</template>

<script>
import CommonTable from '../../components/CommonTable'
import CommonForm from '../../components/CommonForm'
export default {
  components: {
    CommonTable,
    CommonForm
  },
  data() {
    return {
      isShow: false,
      isReload: false,
      operateType: 'add',
      operateForm: {
        sName: '',
        sAddr: '',
        rName: '',
        rAddr: '',
        orderNum: ''
      },
      // dialog  formlabel
      operateFormLabel: [
        {
          model: 'sName',
          label: '寄件人'
        },
        {
          model: 'sAddr',
          label: '寄件人地址'
        },
        {
          model: 'rName',
          label: '收件人'
        },
        {
          model: 'rAddr',
          label: '收件人地址'
        },
        {
          model: 'orderNum',
          label: '订单号'
        }
      ],
      searchForm: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ],
      tableData: [],
      tableLabel: [
        {
          prop: 'sName',
          label: '寄件人'
        },
        {
          prop: 'sAddr',
          label: '寄件人地址'
        },
        {
          prop: 'rName',
          label: '收件人'
        },
        {
          prop: 'rAddr',
          label: '收件人地址',
          width: 600
        },
        {
          prop: 'orderNum',
          label: '订单号',
          width: 250
        }
      ],
      config: {
        page: 1,
        total: 20,
        loading: false
      }
    }
  },
  watch: {
    searchForm: {
      handler: function(val) {
        if (val.keyword == '' && this.isReload) {
          location.reload()
          this.isReload = false
        }
      },
      deep: true //对象内部的属性监听，也叫深度监听
    }
  },
  methods: {
    searchUser() {
      // console.log(this.searchForm)
      let orderNum = this.searchForm.keyword
      this.$http
        .get('/api/order/search', {
          params: {
            orderNum
          }
        })
        .then(res => {
          let result = res.data.code
          // eslint-disable-next-line no-constant-condition
          let typeCode = result == 20000 ? 'success' : 'warning'
          this.$message({
            type: typeCode,
            message: res.data.message
          })
          if (result == 20000) {
            this.isReload = true
            this.getList()
          }
        })
    },
    getList() {
      this.config.loading = true
      this.$http
        .get('/api/order/getOrder', {
          params: {
            page: this.config.page
          }
        })
        .then(res => {
          this.tableData = res.data.list
          this.config.total = res.data.count
          this.config.loading = false
        })
    },
    // 编辑用户
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      //   将表单中的赋值  展现出来
      this.operateForm = row
    },
    // 新增用户
    addUser() {
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
    // 删除用户
    deleteUser(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let id = row.id

          this.$http
            .get('/api/order/del', {
              params: {
                id
              }
            })
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 点击dialog确认后
    confirm() {
      //编辑用户
      if (this.operateType === 'edit') {
        this.$http.post('/api/order/edit', this.operateForm).then(res => {
          // console.log(res.data)
          this.isShow = false
          this.$message({
            type: 'success',
            message: res.data.data.message
          })
          this.getList()
        })
      }
      //新增用户请求
      if (this.operateType === 'add') {
        this.$http.post('/api/order/add', this.operateForm).then(res => {
          // this.$message.success(res.data.message)
          this.isShow = false
          this.$message({
            type: 'success',
            message: res.data.data.message
          })
          this.getList()
        })
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
</style>
