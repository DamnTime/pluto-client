<template>
  <Drawer v-model="visible" title="注册" :closable="false" width="50%">
    <Form ref="registerForm" :model="formItem" :label-width="80" :rules="rules">
      <FormItem label="账号" prop="account">
        <Input v-model="formItem.account" placeholder="请输入账号"></Input>
      </FormItem>
      <FormItem label="昵称" prop="nickName">
        <Input v-model="formItem.nickName" placeholder="请输入昵称"></Input>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input v-model="formItem.email" placeholder="请输入邮箱"></Input>
      </FormItem>
      <FormItem label="标签" prop="userTags">
        <CheckboxGroup v-model="formItem.userTags">
          <Checkbox v-for="item in tags" :key="item.id" :label="item.id">{{
            item.tagName
          }}</Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="爱好" prop="hobby">
        <Input v-model="formItem.hobby" placeholder="请输入爱好"></Input>
      </FormItem>
      <FormItem label="性别" prop="sex">
        <RadioGroup v-model="formItem.sex">
          <Radio label="0">男</Radio>
          <Radio label="1">女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="简介" prop="introduce">
        <Input
          v-model="formItem.introduce"
          type="textarea"
          :rows="4"
          placeholder="Enter something..."
        />
      </FormItem>
      <FormItem label="头像" prop="headImg">
        <pic-uploader v-model="formItem.headImg" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">注册</Button>
        <Button style="margin-left: 8px" @click="handleCancel">取消</Button>
      </FormItem>
    </Form>
  </Drawer>
</template>

<script>
import { fetchUserTags, register } from '@/api/home'
export default {
  name: 'RegisterModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    this.actionUrl = `${process.env.API_URL}/web/common/upload`
    const validateUpload = (rule, value, callback) => {
      if (!this.formItem.headImg) {
        callback(new Error('请选择要上传的文件'))
      } else {
        callback()
      }
    }
    return {
      uploadList: [],
      tags: [],
      rules: {
        account: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          },
        ],
        nickName: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
          },
        ],
        userTags: [
          {
            required: true,
            type: 'array',
            min: 1,
            message: '请选择标签',
            trigger: 'change',
          },
        ],
        headImg: [
          {
            required: true,
            validator: validateUpload,
            trigger: 'change',
          },
        ],
      },
      formItem: {
        nickName: '',
        account: '',
        email: '',
        hobby: '',
        introduce: '',
        userTags: [],
        sex: '0',
        headImg: '',
      },
    }
  },
  mounted() {
    this.getUserTags()
  },
  methods: {
    async getUserTags() {
      const res = await fetchUserTags()
      this.tags = res
    },
    onSuccess(file) {
      this.formItem.headImg = file.url
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    handleSubmit() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          const params = {
            ...this.formItem,
            userTags: this.tags.filter((t) =>
              this.formItem.userTags.includes(t.id)
            ),
          }
          await register(params)
          this.handleCancel()
          this.$nextTick(() => {
            this.$Modal.success({
              title: '系统提示',
              content: '注册成功，默认密码为 123456',
              okText: '去登录',
              onOk: () => {
                this.$emit('goLogin', true)
              },
            })
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
