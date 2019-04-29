<template>
    <div class="player" :ref="'player_posi'" v-show="playlist.length>0">
      <transition
                  @enter="enter"
                  @after-enter="afterEnter"
                  @leave="leave"
                  @after-leave="afterLeave"
                  name="normal">
        <div v-show="fullScreen" class="normal-player">
          <div class="background">
            <img :src="currentSong.image" alt="" width="100%" height="100%">
          </div>
          <div class="top">
            <div class="back" @click="fold">
              <i class="icon-back"></i>
            </div>
            <h1 class="title" v-html="currentSong.name"></h1>
            <h2 class="subtitle" v-html="currentSong.singer"></h2>
          </div>
          <div class="middle">
            <div class="middle-l">
              <div class="cd-wrapper" :ref="'cdWrapper'">
                <div class="cd"  :class="cdCls">
                  <img  :src="currentSong.image" alt="" class="image">
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="progress-wrapper">
              <span class="time time-l">{{formate(currentTime)}}</span>
              <div class="progress-bar-wrapper">
                <progress-bar :percent="percent" @percentChange="percentChange"></progress-bar>
              </div>
              <span class="time time-r">{{formate(currentSong.duration)}}</span>
            </div>
            <div class="operators">
              <div class="icon i-left">
                <i class="icon-sequence"></i>
              </div>
              <div class="icon i-left" @click="prev" :class="disableCls">
                <i class="icon-prev"></i>
              </div>
              <div class="icon i-center"  :class="disableCls">
                <i :class="playIcon" @click="togglePlaying"></i>
              </div>
              <div class="icon i-right" @click="next"  :class="disableCls">
                <i class="icon-next"></i>
              </div>
              <div class="icon i-right">
                <i class="icon-not-favorite"></i>
              </div>
            </div>
          </div>
        </div>
      </transition>
        <transition name="mini">
          <div class="mini-player" v-show="!fullScreen" @click="foldFullScreen">
          <div class="icon">
            <div class="imgWrapper" :class="cdCls">
              <img :src="currentSong.image" alt="" width="40" height="40">
            </div>
          </div>
          <div class="text">
            <h2 class="name" v-html="currentSong.name"></h2>
            <p class="desc" v-html="currentSong.singer"></p>
          </div>
          <div class="control">
            <progress-circle :width="width" :height="height" :percent="percent" :dasharrayCircle="circle">
              <i :class="miniIcon"  @click.stop="togglePlaying"></i>
            </progress-circle>
          </div>
          <div class="control">
            <i class="icon-playlist"></i>
          </div>
        </div>
        </transition>
        <audio ref="audio"
               @canplay="ready"
               @error="error"
               @timeupdate="updateTime"
               src="http://fs.w.kugou.com/201904291529/c2bdac165ea024998c6c8dfac004e995/G085/M07/0B/10/lQ0DAFujV42AK4xpACkHR2d9qTo587.mp3"></audio>
    </div>
</template>

<script>
import ProgressCircle from 'base/progress-circle/progress-circle'
import { mapGetters, mapMutations } from 'vuex'
import animations from 'create-keyframe-animation'
import { prefixStyle } from 'common/js/dom'
import ProgressBar from 'base/progress-bar/progress-bar'
const transform = prefixStyle('transform')
export default {
  name: 'Player',
  data() {
    return {
      songReady: false,
      currentTime: 0,
      circle: 314,
      width:32,
      heigt:32
    }
  },
  components: {
    ProgressBar,
    ProgressCircle
  },
  computed: {
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    disableCls() {
      return this.songReady ? '' : 'disable'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    ...mapGetters([
      'fullScreen',
      'currentIndex',
      'playlist',
      'currentSong',
      'playing',
      'currentIndex'
    ])
  },
  methods: {
    fold() {
      this.setFullScreen(false)
      this.$refs.player_posi.style.position = 'static'
    },
    foldFullScreen() {
      this.$refs.player_posi.style.position = 'absolute'
      this.setFullScreen(true)
    },
    enter(el, done) {
      const {x, y, scale} = this._getPosiAndScale()
      const animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(${1.2})`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(${1})`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, {
        name: 'move'
      }, () => {
        done()
      })
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      const {x, y, scale} = this._getPosiAndScale()
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      const timer = setTimeout(done, 400)
      this.$refs.cdWrapper.addEventListener('transitionend', () => {
        clearTimeout(timer)
        done()
      })
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    togglePlaying() {
      this.setPlayingState(!this.playing)
    },
    prev() {
      if (!this.songReady) {
        return
      }
      var cIndex = this.currentIndex - 1
      if (cIndex === -1) {
        cIndex = this.playlist.length
      }
      this.setCurrentIndex(cIndex)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    next() {
      if (!this.songReady) {
        return
      }
      var cIndex = this.currentIndex + 1
      if (cIndex === this.playlist.length) {
        cIndex = 0
      }
      this.setCurrentIndex(cIndex)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    ready() {
      this.songReady = true
    },
    error() {
      this.songReady = true
    },
    updateTime(time) {
      var seconds = time.target.currentTime
      this.currentTime = seconds
    },
    formate(interval) {
      interval = interval | 0
      let minute = interval / 60 | 0
      let second = this._paddingZero(interval % 60)
      let currentT = `${minute}:${second}`
      return currentT
    },
    percentChange(val) {
      let movingProgress = val * this.currentSong.duration
      this.$refs.audio.currentTime = movingProgress
    },
    _paddingZero(m, n = 2) {
      let len = m.toString().length
      while (len < 2) {
        m = '0' + m
        len++
      }
      return m
    },
    _getPosiAndScale() {
      const normalTop = 80
      const normalWidth = window.innerWidth * 0.8
      const miniWidth = 40
      const miniPaddingleft = 40
      const miniPaddingBottom = 30
      const x = -(window.innerWidth / 2 - miniPaddingleft)
      const scale = miniWidth / normalWidth
      const y = window.innerHeight - normalTop - normalWidth / 2 - miniPaddingBottom
      return {x, y, scale}
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  watch: {
    currentSong() {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        audio.play()
      })
    },
    playing(newVal) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newVal ? audio.play() : audio.pause()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

  .player
    position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #292828;
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            box-sizing: border-box
            height: 100%
            .cd
              width: 100%
              height: 100%
              border-radius: 50%
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                box-sizing: border-box
                border-radius: 50%
                border: 10px solid rgba(255, 255, 255, 0.1)
            .play
              animation: rotate 20s linear infinite
            .pause
              animation-play-state: paused
          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
            .pure-music
              padding-top: 50%
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        height: 40px
        padding: 0 10px 0 20px
        .imgWrapper
          height: 100%
          width: 100%
          img
            border-radius: 50%
        .play
          animation: rotate 10s linear infinite
        .pause
          animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
          position relative
          z-index 100
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>