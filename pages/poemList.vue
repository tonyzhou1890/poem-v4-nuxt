<template>
  <div class="wrapper">
    <poem-list-com :data="data" />
    <pagination :page="page" :total="totalPage" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PoemListCom from '@/components/PoemListCom/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import urls from '@/services/api'

export default Vue.extend({
  name: 'PoemList',
  components: {
    PoemListCom,
    Pagination,
  },
  asyncData({ query, $axios }) {
    return $axios
      .get(urls.poemList, {
        params: {
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
      title: '诗词列表',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '诗词列表',
        },
      ],
    }
  },
  watchQuery: ['p'],
})
</script>
