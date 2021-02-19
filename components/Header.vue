<template>
  <div class="header" :class="show ? 'show' : ''">
    <div class="container">
      <p class="title"><nuxt-link to="/">品词轩</nuxt-link></p>
      <div v-if="!$store.state.isMobile" class="right">
        <div class="tabs">
          <p class="tab">
            <nuxt-link to="/poemList?poem=all&p=1">诗词</nuxt-link>
          </p>
          <p class="tab">
            <nuxt-link to="/authorList?author=all&p=1">作者</nuxt-link>
          </p>
          <p class="tab">
            <nuxt-link to="/subject">专题</nuxt-link>
          </p>
          <!-- <p class="tab">
            <nuxt-link to="/collection">收藏</nuxt-link>
          </p> -->
        </div>
        <div class="search">
          <input
            v-model="keyword"
            type="text"
            class="search-input"
            placeholder="作者/标题/内容"
            @keyup.enter="search"
          />
          <svg-icon
            icon-class="search"
            class-name="search-icon"
            @click.native="search"
          ></svg-icon>
        </div>
      </div>
      <div
        v-else
        class="right mobile"
        :class="show ? 'show' : ''"
        @click="toogle"
      >
        <span class="line"></span><span class="line"></span
        ><span class="line"></span>
      </div>
    </div>
    <div ref="dropdown" class="dropdown" :class="show ? 'show' : ''">
      <p class="tab" @click="toogle">
        <nuxt-link to="/poemList?poem=all&p=1">诗词</nuxt-link>
      </p>
      <p class="tab" @click="toogle">
        <nuxt-link to="/authorList?author=all&p=1">作者</nuxt-link>
      </p>
      <p class="tab" @click="toogle">
        <nuxt-link to="/subject">专题</nuxt-link>
      </p>
      <!-- <p class="tab">
        <nuxt-link to="/collection">收藏</nuxt-link>
      </p> -->
      <div class="search">
        <input
          v-model="keyword"
          type="text"
          class="search-input"
          placeholder="作者/标题/内容"
          @keyup.enter="search"
        />
        <svg-icon
          icon-class="search"
          class-name="search-icon"
          @click.native="search"
        ></svg-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      keyword: '',
      show: false,
    }
  },
  methods: {
    search() {
      if (!this.keyword.trim()) return
      const query = {
        keyword: this.keyword.trim(),
        ap: '1',
        tp: '1',
        cp: '1',
        type: 'author',
      }
      this.$router.push({ path: '/search', query })
      if (this.show) {
        this.toogle()
      }
    },
    toogle() {
      this.show = !this.show
    },
  },
})
</script>

<style lang="less">
@import url('@/assets/style/variables.less');

.header {
  width: 100%;
  height: 90px;
  position: fixed;
  box-shadow: 0 0.2rem 1rem 0 whitesmoke;
  &.show {
    box-shadow: none;
  }
  .container {
    width: 100%;
    height: 100%;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.7);
  }
  .title {
    font-size: 3rem;
    color: inherit;
    a {
      color: inherit;
    }
  }
  .right,
  .dropdown {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    .tabs {
      display: flex;
      .tab {
        padding: 0.6rem 1rem;
      }
      margin-right: 3rem;
    }
    .search {
      display: flex;
      align-items: center;
      .search-input {
        font-size: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 1.5rem;
        border: 1px solid rgba(210, 210, 210, 1);
        color: @textColorGray;
        box-shadow: 0 0 0 0 none;
        transition: all 0.5s;
        &:focus {
          outline: none;
          box-shadow: 0px 0.2rem 0.4rem 0 rgba(210, 210, 210, 1);
        }
      }
      .search-icon {
        margin-left: -2rem;
      }
    }
  }
  .mobile {
    position: absolute;
    top: 50%;
    right: 40px;
    width: 2rem;
    height: 2rem;
    margin-top: -1rem;
    cursor: pointer;
    .line {
      display: inline-block;
      width: 100%;
      height: 2px;
      background-color: @textColor;
      position: absolute;
      left: 0;
      top: 0.2rem;
      transform: rotate(0);
      transition: all 0.5s;
      &:nth-child(2) {
        top: 1rem;
        margin-top: -1px;
      }
      &:nth-child(3) {
        top: initial;
        bottom: 0.2rem;
      }
    }
    &.show {
      .line {
        top: 1rem;
        margin-top: -1px;
        &:nth-child(1) {
          transform: rotate(45deg);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          transform: rotate(-45deg);
        }
      }
    }
  }
  .dropdown {
    position: absolute;
    left: 0;
    top: 90px;
    width: 100%;
    height: 0;
    transition: all 0.5s;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.7);
    &.show {
      height: 12rem;
    }
    .tab,
    .search {
      display: flex;
      align-items: center;
      height: 3rem;
    }
  }
}

@media screen and (max-width: 800px) {
  .header {
    height: 70px;
    .dropdown {
      top: 70px;
    }
  }
}
</style>
