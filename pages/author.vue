<template>
  <div class="wrapper">
    <tabs :tabs="tabs" :tab="tab" @changeTab="handleChangeTab" />
    <div v-if="tab === '诗词'" class="poem-list-wrapper">
      <poem-list-com :data="data" :disable-author="true" />
      <pagination :page="page" :total="totalPage" />
    </div>
    <div v-if="tab === '简介'" class="profile">
      <p
        v-for="(item, index) in profile"
        :key="index"
        class="author-profile-para"
      >
        {{ item }}
      </p>
      <p v-if="profile.length === 0" class="no-profile" v-text="'暂无内容'"></p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
    return $axios
      .get(urls.getPoemsByAuthor, {
        params: {
          author: query.author,
          page: query.p,
        },
      })
      .then((res) => {
        const temp = res.data
        return {
          data: temp.data.length ? temp.data : [{ zhaiyao: '暂无内容' }],
          limit: temp.limit,
          total: temp.total,
          profile: temp.authorInfo.jieshao
            .split('\n')
            .filter((item: string) => item),
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
      profile: '',
      page: 1,
      totalPage: 1,
      tabs: [
        {
          name: '诗词',
        },
        {
          name: '简介',
        },
      ],
      tab: '诗词',
    }
  },
  head() {
    return {
      title: `作者--${this.$route.query.author}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.$route.query.author}的诗词`,
        },
      ],
    }
  },
  watchQuery: ['p'],
  methods: {
    handleChangeTab(tab: string) {
      this.tab = tab
    },
  },
})
</script>

<style lang="less" scoped>
.wrapper {
  .profile {
    font-size: 1.4rem;
    white-space: pre-line;
    text-indent: 2em;
    padding: 1rem;
  }
}
</style>
