<template>
  <div class="page-wrapper">
    <Header></Header>
    <div class="main-container">
      <Nuxt keep-alive :keep-alive-props="{ include: ['Home'] }" />
    </div>
    <div class="footer">
      <span class="footer-text">
        build with
        <a href="https://zh.nuxtjs.org/" target="_blank">nuxt</a></span
      >
      <span class="footer-text">
        <a href="https://github.com/tonyzhou1890" target="_blank"
          >tonyzhou1890@github</a
        >
      </span>
    </div>
    <div class="background"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.vue'
export default Vue.extend({
  name: 'Layout',
  components: {
    Header,
  },
  computed: {
    key() {
      return this.$route.fullPath
    },
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      const isMobile = document.body.clientWidth < 800
      this.$store.commit('setDevice', isMobile)
    },
  },
})
</script>

<style lang="less">
@import url('@/assets/style/variables.less');

html {
  font-family: KaiTi;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  min-width: 320px;
  min-height: 100%;
  overflow: auto;
  background-color: rgba(255, 251, 250, 1);
  color: @textColor;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.page-wrapper {
  overflow: auto;
  width: 100%;
}

.main-container {
  margin: 0 auto;
  margin-top: 120px;
  width: 100%;
  max-width: 1400px;
  min-height: calc(100vh - 200px);
}

.footer {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-family: heiti;
  padding: 2rem;
  background-color: #333;
  color: white;
  .footer-text {
    display: inline-block;
    padding: 0 0.5rem;
    border-right: 1px dashed white;
    &:last-child {
      border-right: 0;
    }
  }
  a {
    color: white;
  }
}

.background {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 1000px;
  height: 720px;
  background-image: url('~@/assets/images/background.png');
  background-size: 100% 100%;
  opacity: 0.1;
  z-index: -1;
}
</style>
