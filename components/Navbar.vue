<template>
  <div class="nav-container">
    <Tabs :value="currentCategory + ''" @on-click="handleClickTab">
      <TabPane
        v-for="cate in cates"
        :key="cate.id"
        :label="cate.name"
        :name="cate.id + ''"
      ></TabPane>
    </Tabs>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Navbar',
  computed: {
    ...mapGetters('navBar', ['currentCategory', 'cates']),
  },
  methods: {
    ...mapMutations('homeTitle', ['UPDATE_TITLE']),
    handleClickTab(id) {
      const isNew = id < 0
      this.$router.push({ path: isNew ? '/' : `/${id}` })
      let title = ''
      if (isNew) {
        title = '最新'
      } else {
        const currentItem = this.cates.find((cate) => cate.id === +id) || {}
        title = currentItem.name
      }
      this.UPDATE_TITLE(title)
    },
  },
}
</script>

<style lang="less" scoped>
.nav-container /deep/ .ivu-tabs-bar {
  border-bottom: 0;
  margin-bottom: 0;
}
.nav-container /deep/ .ivu-tabs-tab {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
