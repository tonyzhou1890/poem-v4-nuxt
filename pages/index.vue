<template>
  <div class="wrapper">
    <section class="main">
      <poem-list-com :data="poems" />
    </section>
    <aside class="sidebar">
      <div v-for="item in authors" :key="item.xingming" class="row">
        <p class="text">
          <nuxt-link
            :to="{
              path: '/author',
              query: {
                author: item.xingming,
                p: '1',
              },
            }"
            >{{ item.xingming }}</nuxt-link
          >
        </p>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PoemListCom from '@/components/PoemListCom/index.vue'
import urls from '@/services/api'

export default Vue.extend({
  name: 'Home',
  components: {
    PoemListCom,
  },
  asyncData({ $axios }) {
    return Promise.all([
      $axios.get(urls.home, {
        params: {
          home: true,
        },
      }),
      $axios.get(urls.poemListRandom),
    ]).then((res) => {
      return {
        authors: res[0].data.authors,
        poems: res[1].data,
      }
    })
  },
  data() {
    return {
      poems: [],
      authors: [],
    }
  },
  head() {
    return {
      title: '品词轩',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '在古典中寻得一方宁静',
        },
      ],
    }
  },
  created() {
    if (this.poems.length) return
    this.getData()
  },
  methods: {
    getData() {},
  },
})
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  display: flex;
  .main {
    flex: 7;
  }
  .sidebar {
    flex: 3;
    white-space: nowrap;
    .row {
      font-size: 1.4rem;
      padding: 1rem 0;
    }
  }
}
</style>
