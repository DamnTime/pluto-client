<template>
  <Modal
    v-model="visible"
    title="请登录"
    :mask-closable="false"
    width="400"
    :footer-hide="true"
  >
    <Form ref="loginForm" :model="loginForm" :rules="ruleInline">
      <FormItem prop="account">
        <Input v-model="loginForm.account" type="text" placeholder="请输入账号">
          <Icon slot="prepend" type="ios-person-outline"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="passWord">
        <Input
          v-model="loginForm.passWord"
          type="password"
          placeholder="请输入密码"
        >
          <Icon slot="prepend" type="ios-lock-outline"></Icon>
        </Input>
      </FormItem>
      <div class="login-btns">
        <div class="left-area">
          <span>还没账号？</span>
          <Button type="text" @click="handleRegister">去注册</Button>
        </div>
        <div class="right-area">
          <Button type="text" class="cancle" @click="handleCancel">取消</Button>
          <Button
            id="TencentCaptcha"
            data-appid="2098512370"
            data-cbfn="captchaCallback"
            type="primary"
            >登录</Button
          >
        </div>
      </div>
    </Form>
  </Modal>
</template>

<script>
import { login } from '@/api/home'
import { cluserLoadScript } from '@/utils'
export default {
  name: 'LoginModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loginForm: {
        account: '',
        passWord: '',
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mounted() {
    cluserLoadScript('https://ssl.captcha.qq.com/TCaptcha.js')
    const that = this
    window.captchaCallback = (res) => {
      if (res.ret === 0) {
        that.$refs.loginForm.validate(async (valid) => {
          if (valid) {
            const userInfo = await login(this.loginForm)
            userInfo && this.$store.commit('user/UPDATE_USER_INFO', userInfo)
            that.$emit('update:visible', false)
          }
        })
      }
    }
  },
  methods: {
    handleRegister() {
      this.handleCancel()
      this.$nextTick(() => {
        this.$emit('handleRegister', true)
      })
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    // handleOk(name) {
    //   this.$refs[name].validate((valid) => {
    //     if (valid) {
    //       this.$Message.success('Success!')
    //     } else {
    //       this.$Message.error('Fail!')
    //     }
    //   })
    // },
  },
}
</script>

<style lang="scss" scoped>
.login-btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #ddd;
  .right-area {
    text-align: right;
    .cancle {
      margin-right: 10px;
    }
  }
  .left-area {
    display: flex;
    align-items: center;
  }
  .left-area /deep/ .ivu-btn {
    padding: 0;
    color: #2d8cf0;
  }
}
</style>
