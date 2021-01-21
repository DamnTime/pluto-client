<template>
  <div class="uploader-container">
    <div v-for="item in uploadList" :key="item.url" class="upload-img-list">
      <template v-if="item.status === 'finished'">
        <img :src="item.url" />
        <div class="upload-img-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          <Icon
            type="ios-trash-outline"
            @click.native="handleRemove(item)"
          ></Icon>
        </div>
      </template>
      <template v-else>
        <Progress
          v-if="item.showProgress"
          :percent="item.percentage"
          hide-info
        ></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['jpg', 'jpeg', 'png']"
      :max-size="2048"
      type="drag"
      :action="actionUrl"
      style="display: inline-block; width: 58px"
    >
      <div style="width: 58px; height: 58px; line-height: 58px">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal v-model="visible" title="图片预览" :footer-hide="true">
      <img v-if="visible" :src="previewFile.url" style="width: 100%" />
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'PicUploader',
  model: {
    prop: 'file',
    event: 'changeFile',
  },
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
    file: {
      type: [Array, String],
      default: () => [],
    },
  },
  data() {
    this.actionUrl = `${process.env.API_URL}/web/common/upload`
    return {
      uploadList: [],
      visible: false,
      previewFile: {},
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    handleSuccess(res, file, fileList) {
      file.url = file.response.content
      // this.$emit('onSuccess', file)
      // this.$emit('changeFile', this.$refs.upload.fileList)
      this.handleChangeFile(file.url)
      // 选择文件后触发验证关闭错误提示
      // this.$refs.add.validate(() => {})
    },
    handleView(file) {
      this.previewFile = file || {}
      this.visible = true
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.handleChangeFile()
    },
    handleChangeFile(changeFile = '') {
      if (Array.isArray(this.file)) {
        this.$emit('changeFile', this.$refs.upload.fileList)
      } else {
        this.$emit('changeFile', changeFile)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.uploader-container {
  display: flex;
  align-items: center;
}

.upload-img-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  margin-right: 4px;
}
.upload-img-list img {
  width: 100%;
  height: 100%;
}
.upload-img-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.upload-img-list:hover .upload-img-list-cover {
  display: block;
}
.upload-img-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
