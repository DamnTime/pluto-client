<template>
  <h1 class="home-title">{{ currentTitle }}</h1>
</template>

<script>
import { mapGetters } from 'vuex'
import { fixedEncodeURIComponent } from '@/utils'
export default {
  computed: {
    ...mapGetters('navBar', ['cates', 'currentCategory']),
    currentTitle() {
      const [pageName, param] = this.$route.path.substr(1).split('/')
      if (pageName === 'search')
        return `搜索有关于"${fixedEncodeURIComponent(param)}"的文章`
      const current = this.cates.find((c) => c.id === +this.currentCategory)
      return current ? current.name : '最新'
    },
  },
}
</script>

<style lang="less" scoped>
.home-title {
  height: 80px;
  padding-left: 20px;
  line-height: 80px;
  box-sizing: border-box;
  color: #fff;
  background-image: linear-gradient(-45deg, #52caed 10%, #3075b2);
  border-radius: 5px 5px 0 0;
}
</style>
