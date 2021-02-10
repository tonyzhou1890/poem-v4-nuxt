/* eslint-disable vue/no-v-html */
<template>
  <div class="poem-item">
    <p class="title">
      <nuxt-link
        :to="{
          path: '/article',
          query: {
            id: id.toString(),
          },
        }"
        v-html="title"
      ></nuxt-link>
    </p>
    <p class="author">
      <nuxt-link
        v-if="!disableAuthor"
        :to="{
          path: '/author',
          query: {
            author: author,
            p: '1',
          },
        }"
        v-html="author"
      ></nuxt-link>
      <span v-else v-html="author"></span>
    </p>
    <pre class="summary" v-html="summary"></pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PoemType } from '@/assets/global'
export default Vue.extend({
  name: 'PoemItemCom',
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    hasDelete: {
      type: Boolean,
      default: false,
    },
    disableAuthor: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleDelete(item: PoemType) {
      this.$emit('delete-item', item)
    },
  },
})
</script>

<style lang="less" scoped>
.poem-item {
  width: 100%;
  line-height: 2;
  padding-bottom: 2rem;
  text-align: center;
  .title {
    font-size: 2rem;
    font-weight: bold;
  }
  .author {
    font-size: 1.2rem;
    .nuxt-link-active {
      color: initial;
    }
  }
  .summary {
    font-size: 1.5rem;
    font-family: kaiti;
    white-space: pre-wrap;
  }
}
</style>

<style lang="less">
.poem-item {
  .highlight {
    color: red;
  }
}
</style>
