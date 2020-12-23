<template>
  <div v-if="visible" class="picture-wrapper" @click="handleClick">
    <img :src="imgSrc" alt="" :class="{ show: imgShow }" />
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imgShow: false,
    }
  },
  watch: {
    visible(val) {
      setTimeout(() => {
        this.imgShow = val
      }, 100)
    },
  },
  methods: {
    handleClick() {
      this.$emit('hideImgModal')
    },
  },
}
</script>

<style lang="less" scoped>
.picture-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  cursor: zoom-out;
  display: flex;
  align-items: center;
  img {
    width: 100%;
    max-height: 60%;
    transform: scale(0);
    transition: transform 0.3s ease-in-out;
    &.show {
      transform: scale(1);
    }
  }
}
</style>
