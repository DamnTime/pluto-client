<template>
  <div class="nav-bar-body">
    <img
      src="http://cdn.pluto1811.com/logo.png"
      alt="automan个人技术博客vue、react、node"
      class="nav-bar-logo"
    />
    <client-only>
      <div class="search">
        <div class="input-wrapper">
          <Input
            prefix="ios-search"
            placeholder="不搜点什么吗~"
            @on-enter="handleSearch"
          />
        </div>

        <span v-if="userInfo"
          >欢迎登录 | <strong>{{ userInfo.nickName }}</strong></span
        >
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fixedEncodeURIComponent } from '@/utils'
export default {
  name: 'Search',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
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
    max-height: 56px;
    vertical-align: bottom;
  }
  .search {
    // width: 300px;
    display: flex;
    align-items: center;
    .input-wrapper {
      max-width: 300px;
    }
    span {
      display: inline-block;
      min-width: 100px;
      margin-left: 10px;
    }
  }
}
</style>
