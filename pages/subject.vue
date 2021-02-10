<template>
  <div class="wrapper">
    <section v-for="(item, index) in types" :key="index" class="section">
      <h1 class="section-title">{{ item.title }}</h1>
      <div class="section-content">
        <span v-for="(tag, tIdx) in data[index]" :key="tIdx" class="tag">
          <nuxt-link
            :to="{
              path: '/subjectPoem',
              query: {
                tag: tag.text,
                type: item.type,
                p: '1',
              },
            }"
            ><span>{{ tag.text }}</span>
          </nuxt-link></span
        >
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import urls from '@/services/api'
export default Vue.extend({
  name: 'Subject',
  asyncData({ $axios }) {
    const types = [
      {
        type: 'fenlei',
        title: '分类',
      },
      {
        type: 'chaodai',
        title: '朝代',
      },
      {
        type: 'congshu',
        title: '丛书',
      },
    ]
    return Promise.all(
      types.map((item) => {
        return $axios.get(urls.tagsByType, {
          params: {
            type: item.type,
          },
        })
      })
    ).then((res) => {
      const data = [[]]
      types.map((item, index) => {
        if (item.type === 'congshu') {
          res[index].data.map((tag: { [x: string]: string }) => {
            tag.text = `《${tag.text}》`
            return null
          })
        }
        data[index] = res[index].data
        return null
      })
      return {
        types,
        data,
      }
    })
  },
  data() {
    return {
      data: [],
      types: [],
    }
  },
  head() {
    return {
      title: `专题`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `品词轩-专题`,
        },
      ],
    }
  },
})
</script>

<style lang="less" scoped>
.wrapper {
  .section {
    line-height: 2;
    .section-title {
      font-size: 2rem;
      text-align: center;
    }
    .tag {
      font-size: 1.6rem;
      padding: 0.2rem 1rem;
      display: inline-block;
    }
  }
}
</style>
