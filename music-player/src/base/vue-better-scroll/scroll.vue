<template>
    <div :ref="'wraper'" class="better-scroll" :style="overfStyle">
        <div>
          <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 1.8
    },
    monitorSliding: {
      type: Boolean,
      default: true
    },
    ofStyle: {
      type: String,
      default: 'hidden'
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wraper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wraper, {
        probeType: this.probeType,
        click: this.click
      })
      if (this.monitorSliding) {
        let _this = this
        this.scroll.on('scroll', (posi) => {
          _this.$emit('scroll', posi)
        })
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20)
      this.$refs.wraper.style.top = `${this.top}rem`
    },
    loading() {
      if (!this.check) {
        setTimeout(() => {
          this.refresh()
        }, 20)
        this.check = true
      }
    }
  },
  computed: {
    overfStyle() {
      return `overflow:${this.ofStyle}`
    }
  }
}
</script>

<style lang="stylus" scoped>
  .better-scroll
    position absolute
    left 0
    right 0
    bottom 0
    overflow hidden
</style>