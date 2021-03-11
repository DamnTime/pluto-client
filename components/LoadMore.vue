<template>
  <div :style="style">
    <div class="list-wrapper">
      <slot :records="records" />
    </div>
    <loading />
  </div>
</template>

<script>
import reachBottom from '@/mixins/reachBottom'
export default {
  name: 'LoadMore',
  mixins: [reachBottom],
  props: {
    style: {
      type: Object,
      default: () => ({}),
    },
    loadFunction: {
      type: Function,
      default: () => {},
    },
    searchParams: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      records: [],
      current: 1,
      pageSize: 10,
      loadMore: true,
    }
  },
  mounted() {},
  methods: {
    fetchList() {
      if (typeof this.loadFunction === 'function') {
        this.loadMore = true
        this.$nextTick(async () => {
          const params = {
            current: this.current,
            pageSize: this.pageSize,
            ...this.searchParams,
          }
          const res = await this.loadFunction(params)
          this.records = [...this.records, ...(res || [])]
        })
      }
    },
  },
}
</script>

<style lang="less"></style>
