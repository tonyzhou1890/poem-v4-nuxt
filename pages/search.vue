<template>
  <div class="wrapper">
    <tabs :tabs="tabs" :tab="tab" :to="to" />
    <div v-if="tab === '作者'" class="poem-list-wrapper">
      <poem-list-com :data="data" :disable-author="true" />
      <pagination :page="page" page-key="ap" :total="totalPage" />
    </div>
    <div v-if="tab === '标题'" class="poem-list-wrapper">
      <poem-list-com :data="data" :disable-author="true" />
      <pagination :page="page" page-key="tp" :total="totalPage" />
    </div>
    <div v-if="tab === '诗词'" class="poem-list-wrapper">
      <poem-list-com :data="data" :disable-author="true" />
      <pagination :page="page" page-key="cp" :total="totalPage" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PoemType } from '@/assets/global.ts'
import PoemListCom from '@/components/PoemListCom/index.vue'
import Tabs from '@/components/Tabs/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import urls from '@/services/api'

export default Vue.extend({
  name: 'Author',
  components: {
    PoemListCom,
    Tabs,
    Pagination,
  },
  asyncData({ query, $axios }) {
    let page = '1'
    let tab = '作者'
    switch (query.type) {
      case 'author':
        page = query.ap as string
        tab = '作者'
        break
      case 'title':
        page = query.tp as string
        tab = '标题'
        break
      case 'content':
        page = query.cp as string
        tab = '诗词'
        break
    }
    return $axios
      .get(urls.search, {
        params: {
          keyword: query.keyword,
          type: query.type,
          page,
        },
      })
      .then((res) => {
        const temp = (res as { [x: string]: any })[query.type as string]

        temp.data.map((item: PoemType) => {
          const keyword = query.keyword as string
          const reg = new RegExp(keyword, 'g')
          switch (query.type) {
            case 'author':
              item.zuozhe = item.zuozhe.replace(
                reg,
                `<span class="highlight">${keyword}</span>`
              )
              break
            case 'title':
              item.mingcheng = item.mingcheng.replace(
                reg,
                `<span class="highlight">${keyword}</span>`
              )
              break
            case 'content':
              item.zhaiyao = item.zhaiyao.replace(
                reg,
                `<span class="highlight">${keyword}</span>`
              )
              break
            default:
              break
          }
          item.mingcheng = item.mingcheng.replace(/。/g, '·')
          return null
        })
        return {
          data: temp.data.length ? temp.data : [{ zhaiyao: '暂无内容' }],
          limit: temp.limit,
          total: temp.total,
          totalPage: Math.ceil(temp.total / temp.limit),
          page: Number(query.p || '1'),
          tab,
        }
      })
  },
  data() {
    const commonQuery = {
      keyword: this.$route.query.keyword,
      ap: '1',
      tp: '1',
      cp: '1',
    }
    return {
      data: [],
      limit: 20,
      total: 0,
      profile: '',
      page: 1,
      totalPage: 1,
      tabs: [
        {
          name: '作者',
          to: {
            path: '/search',
            query: {
              ...commonQuery,
              type: 'author',
            },
          },
        },
        {
          name: '标题',
          to: {
            path: '/search',
            query: {
              ...commonQuery,
              type: 'title',
            },
          },
        },
        {
          name: '诗词',
          to: {
            path: '/search',
            query: {
              ...commonQuery,
              type: 'content',
            },
          },
        },
      ],
      tab: '作者',
      to: {},
    }
  },
  head() {
    return {
      title: `搜索--${this.$route.query.keyword}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `搜索--${this.$route.query.keyword}`,
        },
      ],
    }
  },
  watchQuery: ['ap', 'tp', 'cp', 'type', 'keyword'],
})
</script>

<style lang="less" scoped></style>
