<template>
  <div class="tabs">
    <el-tag
      :key="tag.id"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="changeTab(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    //关闭tag
    handleClose(tag) {
      this.close(tag)
    },
    //辅助函数映射mutations
    ...mapMutations({
      close: 'closeTab'
    }),
    changeTab(item) {
      //点击后跳转到对应的页面
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin: 8px;
    cursor: pointer;
  }
}
</style>
