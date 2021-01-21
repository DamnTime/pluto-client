<template>
  <div class="item-wrapper">
    <div class="comment-item">
      <div class="item-left">
        <img :src="info.headImg" alt="" />
      </div>
      <div class="item-right">
        <p class="comment-user">
          <span class="comment-name">{{ info.nickName }}</span>
          <span class="comment-time">{{ info.createdAt }}</span>
        </p>
        <p class="content">{{ info.content }}</p>
        <div class="comment-handler">
          <Button v-if="replay" type="text" @click="handleReplay">回复</Button>
          <div v-else class="replay">
            <Input
              v-model="replayContent"
              type="textarea"
              class="replay-input"
              :rows="4"
              placeholder="请输入内容"
            />
            <div class="btns">
              <Button type="primary" @click="submitReplay(info)">确定</Button>
              <Button @click="replay = true">取消</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hasChild" class="child">
      <comment-item v-for="item in info.children" :key="item.id" :info="item" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createComment } from '@/api/home'
export default {
  name: 'CommentItem',
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  inject: ['onCommentSuccess', 'onLogin'],
  data() {
    return {
      replay: true,
      replayContent: '',
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    hasChild() {
      return this.info.children && this.info.children.length
    },
  },
  methods: {
    handleReplay() {
      if (!this.userInfo) {
        this.onLogin && this.onLogin(true)
        return
      }
      this.replay = false
    },
    async submitReplay(info) {
      if (!this.replayContent) return
      const params = {
        articleId: info.article.id,
        content: this.replayContent,
        isAuthor: +(this.userInfo.id === info.article.authorId),
        pId: info.id,
      }
      await createComment(params)
      this.replayContent = ''
      this.replay = true
      this.onCommentSuccess && this.onCommentSuccess()
    },
  },
}
</script>

<style lang="scss" scoped>
.item-wrapper {
  border-bottom: 1px solid #f5f5f5;
}
.child {
  margin-left: 20px;
  border-top: 1px solid #f5f5f5;
  .item-wrapper {
    border-bottom: 0;
  }
}
.comment-item {
  display: flex;
  padding: 15px 0;
  .item-left {
    margin-right: 15px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 30px;
    }
  }
  .item-right {
    flex: 1;
    .comment-user {
      margin-bottom: 10px;
    }
    .comment-name {
      font-weight: 500;
      margin-right: 6px;
    }
    .content {
      margin-bottom: 15px;
    }
    .comment-handler {
      text-align: right;
      min-height: 32px;
      line-height: 32px;
      .replay {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
      }
      .replay-input {
        width: 80%;
      }
      .btns {
        color: #fff;
      }
    }
  }
}
.comment-handler /deep/ .ivu-btn {
  padding: 4px 10px;
  margin-right: 5px;
  vertical-align: top;
  height: 32px;
}
.comment-handler /deep/ .ivu-btn-text {
  padding: 0;
  color: #dd701f;
}
.comment-handler /deep/ textarea.ivu-input {
  height: 30px;
}
</style>
