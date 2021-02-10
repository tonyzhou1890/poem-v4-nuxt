<template>
  <div class="poem-list">
    <poem-item-com
      v-for="item in data"
      :id="item._id"
      :key="item._id"
      :title="item.mingcheng"
      :author="item.zuozhe"
      :summary="item.zhaiyao"
      :disable-author="disableAuthor"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PoemType } from '@/assets/global'
import PoemItemCom from '../PoemItemCom/index.vue'

export default Vue.extend({
  name: 'PoemListCom',
  components: {
    PoemItemCom,
  },
  props: {
    data: {
      type: Array,
      required: true,
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
.poem-list {
  width: 100%;
}
</style>
