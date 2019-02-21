<template>
    <div class="list-shortcut"
         @touchstart="AlphabetTouchstart"
         @touchmove.stop.prevent="AlphabetMovestart">
      <ul>
        <li
          :class="{
            item:true,
            current:index == sIndex
          }"
          v-for="(item, index) of shotcutList"
          :data-index="index"
          ref="alphs"
          :key="index">{{item}}</li>
      </ul>
    </div>
</template>

<script>
const ALPHABET_HEIGHT = 18
export default {
  name: 'Alphabet',
  data() {
    return {
      sIndex: 0
    }
  },
  props: {
    shotcutList: Array,
    scrollIndex: Number
  },
  watch: {
    scrollIndex() {
      this.sIndex = this.scrollIndex
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    AlphabetTouchstart(e) {
      const alphabetIndex = e.target.getAttribute('data-index')
      if (alphabetIndex) {
        const firstTouchs = e.touches[0]
        this.touch.pageY1 = firstTouchs.pageY
        this.touch.index = alphabetIndex
        this.$emit('alphaIndex', alphabetIndex)
        this.sIndex = alphabetIndex
      }
    },
    AlphabetMovestart(e) {
      setTimeout(() => {
        const lastTouchs = e.touches[0]
        this.touch.pageY2 = lastTouchs.pageY
        const moveIndex = Math.floor((this.touch.pageY2 - this.touch.pageY1) / ALPHABET_HEIGHT)
        let alphabetIndex = moveIndex + JSON.parse(this.touch.index)
        let alphaLength = this.$refs.alphs.length
        if (!alphabetIndex && alphabetIndex !== 0) {
          return
        }
        if (alphabetIndex < 0) {
          alphabetIndex = 0
        } else if (alphabetIndex > alphaLength - 1) {
          alphabetIndex = alphaLength - 1
        }
        this.$emit('alphaIndex', (alphabetIndex + ''))
      }, 200)
    }
  }
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    .list-shortcut
      position: absolute
      z-index: 30
      right: 3px
      top: 53%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
</style>