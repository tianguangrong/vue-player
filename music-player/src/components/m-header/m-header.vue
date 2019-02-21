<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">Tincanroll Music</h1>
    </div>
</template>

<script>
export default {
  name: 'MHeader'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .m-header
    position: relative
    height: .88rem
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: .6rem
      height: .64rem
      margin-right: .18rem
      bg-image('logo')
      background-size: .6rem .64rem
    .text
      display: inline-block
      vertical-align: top
      line-height: .88rem
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: .24rem
        font-size: .4rem
        color: $color-theme
</style>