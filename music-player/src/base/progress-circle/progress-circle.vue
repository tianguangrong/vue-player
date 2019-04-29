<template>
    <div class="progress-circle" :click="click">
        <svg width="32" height="32" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMidYMid meet">
            <circle class="progress-background" r="50" cy="50" cx="50" fill="transparent"></circle>
            <circle class="progress-bar" r="50" cy="50" cx="50" fill="transparent" :stroke-dasharray="dasharrayCircle" :stroke-dashoffset="progerssBar"></circle>
        </svg>
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'ProgressCirle',
  props: {
    percent: {
      type: Number,
      default: 0
    },
    dasharrayCircle: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  computed: {
    progerssBar() {
      return (1 - this.percent) * 314
    }
  },
  methods: {
    click(ev) {
      ev.stopPropagation()
      ev.preventDefault()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
    &.icon-pause-mini{
        position relative
        z-z-index 100
    }
    .progress-circle
        position relative
        svg
            position absolute
            top 13px
            circle
                stroke-width 8px
                transform-origin center
                &.progress-background
                    transform scale(0.9)
                    stroke $color-theme-d
                &.progress-bar
                    transform scale(0.9) rotate(-90deg)
                    stroke $color-theme

</style>
