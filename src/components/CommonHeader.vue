<template>
  <header>
    <div class="l_content">
      <el-button type="primary" icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r_content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link"> <img :src="userImg" alt="" class="userImg" /> </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  //面包屑导航
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  data() {
    return {
      userImg: require('../assets/images/user.png')
    }
  },
  methods: {
    collapseMenu() {
      this.$store.commit('collapseMenu')
    },
    loginOut() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.l_content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r_content {
  .userImg {
    height: 45px;
    width: 45px;
    border-radius: 50%;
  }
}
</style>
<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #666666;
    font-weight: normal;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #fff;
      cursor: pointer !important;
    }
  }
}
</style>
