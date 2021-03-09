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
      {{ filterFromWho }}
    </div>
  </div>
</template>

<script>
import { getDailyWords } from '@/api/home'

const FROM_ENMUS = {
  f: '网络原创',
  j: '网易云热评',
  e: '大v原创',
}

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
      return FROM_ENMUS[this.words.type]
    },
    filterFromWho() {
      const who = this.words.creator || this.words.from_who
      return who ? ` | ${who}` : ''
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
