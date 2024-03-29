<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" ref="bgImage" :style="bgStyle">
      <div class="play-wrapper" ref="pWrapper" v-show="songs.length>0">
        <div ref="playBtn"  class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs"
            :top="top"
            :monitorSliding="monitorSliding"
            :probeType="probeType"
            @scroll="scroll"
            :ofStyle="ofStyle"
            class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
      <div class="loading-container">
        <!-- <loading></loading> -->
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/vue-better-scroll/scroll'
import SongList from 'base/vue-song-list/song-list'
import { mapActions } from 'vuex'
import { prefixStyle } from 'common/js/dom'
const TITLE_HEIGHT = 40
const transform = prefixStyle('transform')
export default {
  name: 'MusicList',
  data() {
    return {
      top: 0,
      scrollY: 0
    }
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url("${this.bgImage}");`
    }
  },
  methods: {
    _scrollTop() {
      if (this.bgImage !== '') {
        this.imageHeight = this.$refs.bgImage.clientHeight
        this.minheight = -(this.imageHeight) + TITLE_HEIGHT
        this.top = this.$refs.bgImage.clientHeight / 50
      }
    },
    back() {
      this.$router.back()
    },
    scroll(posi) {
      this.scrollY = posi.y
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  components: {
    Scroll,
    SongList
  },
  mounted() {
    setTimeout(() => {
      this._scrollTop()
    }, 20)
  },
  created() {
    this.monitorSliding = true
    this.probeType = 3
    this.ofStyle = 'inherit'
  },
  watch: {
    scrollY(newY) {
      var maxTransToUp = Math.max(this.minheight, newY)
      var zIndex = 0
      var scale = 1
      if (newY < maxTransToUp) {
        zIndex = 20
        this.$refs.bgImage.style['padding-top'] = 0
        this.$refs.bgImage.style['height'] = TITLE_HEIGHT + 'px'
      } else {
        zIndex = 0
        this.$refs.bgImage.style['padding-top'] = '70%'
        this.$refs.bgImage.style['height'] = 0
      }
      if (newY < 0) {
        if (-newY > 70) {
          this.$refs.pWrapper.style['display'] = 'none'
        } else {
          this.$refs.pWrapper.style['display'] = 'block'
        }
      } else {
        var percent = Math.abs(newY / this.imageHeight)
        scale = 1 + percent
        zIndex = 20
      }
      this.$refs.bgImage.style['z-index'] = zIndex
      this.$refs.layer.style[transform] = `translate3d(0 , ${maxTransToUp}px, 0)`
      this.$refs.bgImage.style[transform] = `scale(${scale})`
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .music-list
    position fixed
    z-index 100
    top 0
    left 0
    bottom 0
    right 0
    background $color-background
    .back
      position absolute
      top 0
      left 6px
      z-index 50
      .icon-back
        display block
        padding 10px
        font-size $font-size-large-x
        color $color-theme
    .title
      position absolute
      top 0
      left 10%
      z-index 40
      width 80%
      no-wrap()
      text-align center
      line-height 40px
      font-size $font-size-large
      color $color-text
    .bg-image
      position relative
      width 100%
      height 0
      padding-top 70%
      transform-origin top
      background-size cover
      .play-wrapper
        position absolute
        bottom 20px
        z-index 50
        width 100%
        .play
          box-sizing border-box
          width 135px
          padding 7px 0
          margin 0 auto
          text-align center
          border 1px solid $color-theme
          color $color-theme
          border-radius 100px
          font-size 0
          .icon-play
            display inline-block
            vertical-align middle
            margin-right 6px
            font-size $font-size-medium-x
          .text
            display inline-block
            vertical-align middle
            font-size $font-size-small
      .filter
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background rgba(7, 17, 27, 0.4)
    .bg-layer
      position relative
      height 100%
      background $color-background
    .list
      position absolute
      top 0
      bottom 0
      width 100%
      background $color-background
      .song-list-wrapper
        padding 20px 30px
      .loading-container
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
</style>