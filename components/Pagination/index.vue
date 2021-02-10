<template>
  <div class="pagination">
    <nuxt-link v-if="pre" :to="pre">
      <span class="pre" title="上一页">
        <svg-icon icon-class="arrow-down"></svg-icon>
      </span>
    </nuxt-link>
    <span v-else class="pre disabled" title="上一页">
      <svg-icon icon-class="arrow-down"></svg-icon>
    </span>
    <input
      type="number"
      min="1"
      :max="total"
      class="page"
      :value="page"
      @change="handleChange"
      @keyup.enter="jump"
    />
    <span class="split">/</span>
    <span class="total">{{ total }}</span>
    <nuxt-link v-if="next" :to="next">
      <span class="next" title="下一页">
        <svg-icon icon-class="arrow-down"></svg-icon>
      </span>
    </nuxt-link>
    <span v-else class="next disabled" title="下一页">
      <svg-icon icon-class="arrow-down"></svg-icon>
    </span>
  </div>
</template>

<script lang="ts">
import { RouteConfig } from '@nuxt/types/config/router'
import Vue from 'vue'
export default Vue.extend({
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true,
    },
    pageKey: {
      type: String,
      default: 'p'
    }
  },
  data() {
    const temp: {
      page: number | null
      pre: object | null
      next: object | null
      routeTemplte: {
        path: string,
        query: {
          [x: string]: string
        }
      }
    } = {
      page: 1,
      pre: null,
      next: null,
      routeTemplte: {
        path: '',
        query: {}
      }
    }
    return temp
  },
  watch: {
    $route: {
      handler() {
        this.initInfo()
      },
    },
  },
  created() {
    this.initInfo()
  },
  methods: {
    initInfo() {
      const route = {
        path: this.$route.path,
        query: JSON.parse(JSON.stringify(this.$route.query)),
      }

      let pre = JSON.parse(JSON.stringify(route))
      let next = JSON.parse(JSON.stringify(route))
      const tempPage = Number(route.query[this.pageKey])

      pre.query[this.pageKey] = tempPage - 1
      next.query[this.pageKey] = tempPage + 1
      if (pre.query[this.pageKey] < 1) {
        pre = null
      }
      if (next.query[this.pageKey] > this.total) {
        next = null
      }

      this.page = tempPage
      this.pre = pre
      this.next = next
      this.routeTemplte = route
    },
    handleChange(e: InputEvent) {
      let value = (<HTMLInputElement>e.target).value
      value = value.replace(/[^0-9]/g, '')
      this.page = Number(value)
    },
    jump() {
      if (this.page) {
        this.routeTemplte.query[this.pageKey] = this.page > this.total ? this.total.toString() : this.page.toString()
        this.$router.push(this.routeTemplte)
      }
    },
  },
})
</script>

<style lang="less" scoped>
@import url('@/assets/style/variables.less');
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 1rem;
  font-family: heiti;
  span {
    display: inline-block;
  }
  .pre,
  .next {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    opacity: 0.3;
    transform: rotate(-90deg);
    color: @linkColor;
    &:hover {
      opacity: 1;
      background-color: white;
      box-shadow: 0px 0.2rem 0.4rem 0 rgba(210, 210, 210, 1);
    }
    &.disabled {
      cursor: not-allowed;
    }
  }
  .pre {
    transform: rotate(90deg);
  }
  .page {
    width: 4rem;
    font-size: 0.8rem;
    padding: 0.3rem 0.4rem;
    margin-left: 0.5rem;
    border-radius: 0.2rem;
    border: 1px solid rgba(210, 210, 210, 1);
    color: @textColorGray;
    box-shadow: 0 0 0 0 none;
    transition: all 0.5s;
    &:focus {
      outline: none;
      box-shadow: 0px 0.2rem 0.4rem 0 rgba(210, 210, 210, 1);
    }
  }
  .split {
    padding: 0 0.5rem;
  }
  .total {
    margin-right: 0.5rem;
  }
  .nuxt-link-active {
    color: initial;
  }
}
</style>
