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
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  computed: {
    ...mapGetters('navBar', ['currentCategory', 'cates']),
  },
  methods: {
    handleClickTab(id) {
      const isNew = id < 0
      this.$router.push({ path: isNew ? '/' : `/${id}` })
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
  font-size: 15px;
  font-weight: 400;
}
</style>
