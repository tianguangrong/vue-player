<template>
    <div class="progress-bar" ref="progressBar" @click="clickProgress">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper"
                 @touchstart.stop="touchStart"
                 @touchmove.stop="touchMove"
                 @touchend="touchEnd"
                 ref="progressBtn">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefixStyle } from 'common/js/dom'
const transform = prefixStyle('transform')
const BTN_LENGTH = 16
export default {
  name: 'ProgressBar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newPerc) {
      if (newPerc >= 0 && !this.touch.initiate) {
        const barWidth = this.$refs.progressBar.clientWidth - BTN_LENGTH
        var progressWidth = newPerc * barWidth
        this._move(progressWidth)
      }
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    touchStart(e) {
      this.touch.initiate = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    touchMove(e) {
      if (!this.touch.initiate) {
        return
      }
      var deltaX = e.touches[0].pageX - this.touch.startX
      var currentProgress = Math.min(this.$refs.progressBar.clientWidth - BTN_LENGTH, Math.max(0, this.touch.left + deltaX))
      this._move(currentProgress)
    },
    touchEnd(e) {
      this.touch.initiate = false
      this._triggerPercent()
    },
    clickProgress(e) {
      let progressWidth = e.offsetX
      this._move(progressWidth)
      this._triggerPercent()
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - BTN_LENGTH
      var curWidth = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', curWidth)
    },
    _move(progressWidth) {
      this.$refs.progress.style.width = `${progressWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${progressWidth}px, 0, 0)`
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>