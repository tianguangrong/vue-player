<template>
    <div class="loading-container">
        <img class="img" src="./loading.gif" alt="loading">
        <div class="desc">{{title}}</div>
    </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    title: {
      type: String,
      default: '列表加载中...'
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .loading-container
    position absolute
    width 100%
    text-align center
    margin-top .5rem
    .img
      width .5rem
    .desc
      line-height: 20px
      font-size $font-size-small
      color $color-text-l
</style>