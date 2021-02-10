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
  name: 'SubjectPoem',
  components: {
    PoemListCom,
    Pagination,
  },
  asyncData({ query, $axios }) {
    return $axios
      .get(urls.poemListByTag, {
        params: {
          tag:
            query.type === 'congshu' && typeof query.tag === 'string'
              ? query.tag.replace(/[《》]/g, '')
              : query.tag,
          field: query.type,
          page: query.p,
        },
      })
      .then((res) => {
        interface ListByTagType {
          data: []
          limit: number
          total: number
        }
        const temp = (res as unknown) as ListByTagType
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
      title: `专题--${this.$route.query.tag}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.$route.query.tag}相关诗词`,
        },
      ],
    }
  },
  watchQuery: ['p'],
})
</script>
