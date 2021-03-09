<template>
  <div
    v-show="showWords"
    :class="[
      'daily-wrapper',
      'animate__animated',
      showWords ? 'animate__tada' : '',
    ]"
  >
    <div class="content">
      <span class="txt">{{ words.hitokoto }}</span> --来自：{{ filterFrom }}
      {{ words.from_who ? `| ${words.from_who}` : '' }}
    </div>
  </div>
</template>

<script>
import { getDailyWords } from '@/api/home'

export default {
  name: 'DailyWords',
  components: {},
  data() {
    return {
      words: {},
    }
  },
  computed: {
    showWords() {
      return Object.keys(this.words).length > 0
    },
    filterFrom() {
      if (!this.words.from) return ''
      return this.words.from.indexOf('来自')
        ? this.words.from.replace('来自', '')
        : this.words.from
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await getDailyWords()
      this.words = (res || {}).data || {}
    },
  },
}
</script>

<style lang="scss" scoped>
.daily-wrapper {
  .txt {
    background: linear-gradient(90deg, red, blue, red);
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
</style>
