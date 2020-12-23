<template>
  <h1 class="home-title">{{ currentTitle }}</h1>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('homeTitle', ['currentTitle']),
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
  background-image: linear-gradient(-45deg, #f3a76c 10%, #dd701f);
  border-radius: 5px 5px 0 0;
}
</style>
