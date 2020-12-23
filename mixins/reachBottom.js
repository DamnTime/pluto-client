/**
 * 公用触底事件
 */

import { throttle } from '@/utils/index'

export default {
  data() {
    return {
      _scrollingElement: null,
      _isReachBottom: false,
      reachBottomDistance: 30, // 距离底部多远触发
    }
  },
  mounted() {
    this._scrollingElement = document.scrollingElement
    window.addEventListener('scroll', this._windowScrollHandler)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this._windowScrollHandler)
  },
  methods: {
    _windowScrollHandler: throttle(function () {
      const scrollHeight = this._scrollingElement.scrollHeight
      const currentHeight =
        this._scrollingElement.scrollTop +
        this._scrollingElement.clientHeight +
        this.reachBottomDistance
      if (currentHeight < scrollHeight && this._isReachBottom) {
        this._isReachBottom = false
      }
      if (this._isReachBottom) {
        return
      }
      if (currentHeight >= scrollHeight) {
        this._isReachBottom = true
        typeof this.reachBottom === 'function' && this.reachBottom()
      }
    }, 10),
  },
}
