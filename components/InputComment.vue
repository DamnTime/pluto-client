<template>
  <div class="input-comment">
    <div v-if="userInfo" class="input-container">
      <div class="input-area">
        <Icon type="ios-contact" size="35" color="#2d8cf0" class="icon" />
        <Input
          v-model="content"
          type="textarea"
          :maxlength="100"
          placeholder="说点什么吧..."
        />
      </div>
      <div class="btn">
        <Button class="comment-btn" type="primary" @click="handleComment"
          >评论</Button
        >
      </div>
    </div>
    <div v-else class="not-login">
      <Button type="text" @click="handleLogin">登录</Button>后评论
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createComment } from '@/api/home'
export default {
  name: 'InputComment',
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      content: '',
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
  },
  methods: {
    handleLogin() {
      this.$emit('onLogin', true)
    },
    async handleComment() {
      if (!this.content) return
      const params = {
        articleId: this.info.id,
        content: this.content,
        isAuthor: +(this.userInfo.id === this.info.authorId),
      }
      await createComment(params)
      this.$emit('onCommentSuccess')
    },
  },
}
</script>

<style lang="scss" scoped>
.input-comment {
  .icon {
    margin-right: 15px;
  }
  .input-area {
    display: flex;
    justify-content: space-between;
  }
  .not-login {
    display: flex;
    align-items: center;
  }
  .btn {
    margin-top: 20px;
    text-align: right;
  }
}
.input-area /deep/ .ivu-input {
  min-height: 100px;
}
.not-login /deep/ .ivu-btn {
  padding: 0;
  margin-right: 5px;
  color: #2d8cf0;
}
</style>
