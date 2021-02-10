<template>
  <div class="wrapper">
    <div class="list">
      <div v-for="(item, index) in data" :key="index" class="list-item">
        <nuxt-link
          :to="{
            path: '/author',
            query: {
              author: item.xingming,
              p: '1',
            },
          }"
        >
          <p class="author">{{ item.xingming }}</p>
        </nuxt-link>
      </div>
    </div>
    <pagination :page="page" :total="totalPage" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Pagination from '@/components/Pagination/index.vue'
import urls from '@/services/api'

export default Vue.extend({
  name: 'AuthorList',
  components: {
    Pagination,
  },
  asyncData({ query, $axios }) {
    return $axios
      .get(urls.authorList, {
        params: {
          author: 'all',
          page: query.p,
        },
      })
      .then((res) => {
        const temp = res.data
        return {
          data: temp.data,
          limit: temp.limit,
          total: temp.total,
          totalPage: Math.ceil(temp.total / temp.limit),
          page: Number(query.p || '1'),
        }
      })
  },
  data() {
    return {
      data: [],
      limit: 20,
      total: 0,
      page: 1,
      totalPage: 1,
    }
  },
  head() {
    return {
      title: '作者列表',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '作者列表',
        },
      ],
    }
  },
  watchQuery: ['p'],
})
</script>

<style lang="less" scoped>
.wrapper {
  .list {
    text-align: center;
    .list-item {
      display: inline-block;
      width: 15rem;
      font-size: 1.5rem;
      padding: 1rem 0.4rem;
      .author {
        display: inline-block;
      }
    }
  }
}
</style>
