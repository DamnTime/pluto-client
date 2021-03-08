<template>
  <div class="detail-container">
    <div class="author-wrapper">
      <div class="author-info">
        <div class="author-head-img">
          <img :src="info.user.headImg" alt="" />
        </div>
        <div class="info-left">
          <p class="name">{{ info.user.nickName }}</p>
          <p class="time">
            <span>{{ info.publishTime }}</span>
            <span class="read-number">阅读 {{ info.pageView }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="detail-body" v-html="info.content"></div>
    <picture-modal
      :img-src="imgSrc"
      :visible="visible"
      @hideImgModal="hideImgModal"
    />
    <!-- 评论列表 -->
    <comment-list :comment-list="commentList" />
    <!-- 发表评论 -->
    <login-modal
      :visible.sync="loginVisible"
      @handleRegister="handleRegister"
    />
    <input-comment
      :info="info"
      @onLogin="onLogin"
      @onCommentSuccess="onCommentSuccess"
    />
    <register-modal :visible.sync="registerVisible" @goLogin="goLogin" />
  </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'
import {
  fetchArticleDetail,
  getCommentList,
  updateArticlePageNum,
} from '@/api/home'

import 'highlight.js/styles/default.css'

import '@/assets/style/hydrid.less'

highlight.registerLanguage('javascript', javascript)
highlight.registerLanguage('css', css)
highlight.registerLanguage('bash', bash)

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code, lang) {
    return highlight.highlightAuto(code).value
  },
})

export default {
  async asyncData({ params, store }) {
    await store.dispatch('navBar/fetchCatesAction')
    const res = await fetchArticleDetail({ id: params.id })
    const list = await getCommentList({ articleId: res.id })
    res.content = marked(res.content)
    return {
      info: res,
      commentList: list,
    }
  },
  provide() {
    return {
      onCommentSuccess: this.onCommentSuccess,
      onLogin: this.onLogin,
    }
  },
  data() {
    return {
      visible: false,
      imgSrc: '',
      loginVisible: false,
      registerVisible: false,
    }
  },
  async mounted() {
    document.querySelectorAll('.detail-body img').forEach((item) => {
      item.addEventListener('click', () => {
        this.visible = true
        this.imgSrc = item.src
      })
    })
    // 更新文章阅读数
    await updateArticlePageNum({
      id: this.info.id,
      pageView: this.info.pageView + 1,
    })
  },
  methods: {
    goLogin(val) {
      this.$nextTick(() => {
        this.loginVisible = val
      })
    },
    hideImgModal() {
      this.visible = false
    },
    onLogin(val) {
      this.loginVisible = val
    },
    handleRegister(val) {
      this.registerVisible = val
    },
    async onCommentSuccess() {
      const { info } = this
      const list = await getCommentList({ articleId: info.id })
      this.commentList = list
    },
  },
}
</script>

<style lang="less" scoped>
.detail-container {
  background-color: #fff;
  min-height: 300px;
  padding: 25px;
  box-sizing: border-box;
  border-radius: 3px;
  .author-wrapper {
    margin-bottom: 30px;
    .author-info {
      display: flex;
      align-items: center;
      .author-head-img {
        margin-right: 15px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 30px;
          vertical-align: middle;
        }
      }
      .info-left {
        .name {
          font-size: 14px;
          font-weight: 600;
        }
        .time {
          color: #999;
          font-weight: 400;
          .read-number {
            margin-left: 15px;
          }
        }
      }
    }
  }
  .article-img {
    width: 100%;
    height: 300px;
    overflow: hidden;
    margin-bottom: 20px;
    img {
      width: 100%;
      max-height: 100%;
    }
  }
}
.detail-body /deep/ img {
  cursor: zoom-in;
}
</style>
