<template>
  <div id="app">
    <div id="top" class="top">
      <Row>
        <Col class="content-area" span="22">
          <search />
          <navbar />
        </Col>
      </Row>
    </div>
    <div class="content">
      <Row>
        <Col class="content-area" span="22">
          <Nuxt />
        </Col>
      </Row>
    </div>
    <footer class="footer">
      <p>pluto1818.com 已稳定运行1000天</p>
      <div>
        © 2020
        <a href="//beian.miit.gov.cn" target="_blank">蜀ICP备20002779号-1</a>
      </div>
    </footer>
  </div>
</template>

<style lang="less" scoped>
#app {
  background: url(//cdn.pluto1811.com/veer-302182224.jpg) no-repeat center/cover;
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-bottom: 1px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1), 0 1px rgba(66, 66, 66, 0.1);
  z-index: 99;
  background-color: #fff;
  min-height: 104px;
  max-height: 106px;
  overflow: hidden;
}
.content {
  padding-top: 120px;
  min-height: calc(100vh - 100px);
  box-sizing: border-box;
}
.footer {
  min-height: 100px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  font-size: 12px;
}
</style>
