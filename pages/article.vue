<template>
  <div class="wrapper">
    <h1 class="title">{{ data.mingcheng }}</h1>
    <p class="author">{{ data.zuozhe }}</p>
    <p class="content">{{ data.yuanwen }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import urls from '@/services/api'
export default Vue.extend({
  name: 'Article',
  asyncData({ $axios, query }) {
    return $axios
      .get(urls.getById, {
        params: query,
      })
      .then((res) => {
        res.data.mingcheng = res.data.mingcheng.replace(/。/g, '·')
        return { data: res.data }
      })
  },
  data() {
    return {
      data: {
        mingcheng: '',
        zuozhe: '',
        yuanwen: '',
      },
    }
  },
  head() {
    const temp = (this as any).data
    return {
      title: temp.mingcheng,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `《${temp.mingcheng}》的内容`,
        },
      ],
    }
  },
})
</script>

<style lang="less" scoped>
.wrapper {
  padding: 1rem;
  text-align: center;
  line-height: 2;
  .title {
    font-size: 2rem;
    font-weight: bold;
  }
  .author {
    font-size: 1.2rem;
  }
  .content {
    font-size: 1.5rem;
    white-space: pre-wrap;
  }
}
</style>
