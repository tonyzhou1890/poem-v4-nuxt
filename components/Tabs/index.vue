<template>
  <div class="tabs">
    <div
      v-for="(item, index) in tabs"
      :key="index"
      class="tab"
      :class="tab === item.name ? 'active' : ''"
      @click="changeTab(item.name)"
    >
      <nuxt-link v-if="item.to && tab !== item.name" :to="item.to">
        <span class="tab-text">{{ item.name }}</span>
      </nuxt-link>
      <span v-else class="tab-text">{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    tab: {
      type: [String],
      default: '',
    },
  },
  methods: {
    changeTab(tab: string) {
      if (this.tab !== tab) {
        this.$emit('changeTab', tab)
      }
    },
  },
})
</script>

<style lang="less" scoped>
@import url('@/assets/style/variables.less');
.tabs {
  font-size: 1.6rem;
  text-align: center;
  padding-bottom: 3rem;
  .tab {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    color: @linkColor;
    .nuxt-link-active {
      color: inherit;
    }
    &.active {
      cursor: initial;
      color: @linkColorActive;
    }
  }
}
</style>
