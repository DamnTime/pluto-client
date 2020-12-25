<template>
  <div class="nav-bar-body">
    <img
      src="http://img.binlive.cn/upload/1525010252092"
      alt="automan个人技术博客vue、react、node"
      class="nav-bar-logo"
    />
    <div class="search">
      <Input
        prefix="ios-search"
        placeholder="不搜点什么吗~"
        @on-enter="handleSearch"
      />
    </div>
  </div>
</template>

<script>
import { fixedEncodeURIComponent } from '@/utils'
export default {
  name: 'Search',
  data() {
    return {}
  },
  methods: {
    handleSearch(e) {
      const { value } = e.target
      if (!value) return
      this.$router.push({
        path: `/search/${fixedEncodeURIComponent(value)}`,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.nav-bar-body {
  height: 64px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid @border-color;
  padding: 0 10px;
  .nav-bar-logo {
    width: 56px;
    height: 56px;
    vertical-align: bottom;
  }
  .search {
    width: 300px;
  }
}
</style>
