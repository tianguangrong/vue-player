<template>
    <div class="tab">
        <router-link tag="div" to="/recommend" class="tab-item">
            <div class="tab-link">推荐</div>
        </router-link>
        <router-link tag="div" to="/singer" class="tab-item">
            <div class="tab-link">歌手</div>
        </router-link>
        <router-link tag="div" to="/rank" class="tab-item">
            <div class="tab-link">排行</div>
        </router-link>
        <router-link tag="div" to="/search" class="tab-item">
            <div class="tab-link">搜索</div>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'Tab'
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .tab
    display: flex
    height: .88rem
    line-height: .88rem
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: .04rem solid $color-theme
</style>