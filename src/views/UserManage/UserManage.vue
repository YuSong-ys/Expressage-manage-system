<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm"></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增用户</el-button>
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
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: 1
      },
      // dialog  formlabel
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名'
        },
        {
          model: 'age',
          label: '年龄'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址'
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
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 250
        },
        {
          prop: 'addr',
          label: '地址',
          width: 600
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
          // this.$http.get('/api/user/reloadUser').then(() => {
          //   this.getList()
          // })
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
      let name = this.searchForm.keyword
      this.$http
        .get('/api/user/search', {
          params: {
            name
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
        .get('/api/user/getUser', {
          params: {
            page: this.config.page
          }
        })
        .then(res => {
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
          })
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
            .get('/api/user/del', {
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
        this.$http.post('/api/user/edit', this.operateForm).then(res => {
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
        this.$http.post('/api/user/add', this.operateForm).then(res => {
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
