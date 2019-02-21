<template>
    <div >
      <scroll :data="datas"
          ref="listview"
          class="listview"
          :monitorSliding="monitorSliding"
          @scroll="scroll"
          :probeType="3"
          >
    <ul>
        <li v-for="(group, index) in datas" class="list-group" ref="listGroup" :key="index">
            <h2 class="list-group-title">{{group.title}}</h2>
            <uL>
                <li @click="selectItem(item)" v-for="(item, index) in group.items" class="list-group-item" :key="index">
                    <img class="avatar" v-lazy="item.avatar">
                    <span class="name">{{item.name}}</span>
                </li>
            </uL>
        </li>
    </ul>
  </scroll>
  <div class="list-fixed" v-show="!show">
    <div ref="fTitle" class="fixed-title">{{fTitle}}</div>
  </div>
    </div>
</template>

<script>
import Scroll from 'base/vue-better-scroll/scroll'
const SELECTED_HEIGHT = 30
export default {
  name: 'ListView',
  components: {
    Scroll
  },
  props: {
    datas: Array,
    alphaIndex: String
  },
  methods: {
    scroll(posi) {
      this.scrollY = posi.y
    },
    selectItem(item) {
      this.$emit('select', item)
    },
    _calculateHeight() {
      this.heights = [...this.heights, 0]
      let height = 0
      const lists = this.$refs.listGroup
      lists.map((element) => {
        height = height + element.clientHeight
        this.heights = [
          ...this.heights,
          height
        ]
      })
    }
  },
  created() {
    this.heights = []
  },
  data() {
    return {
      top: '',
      shotcutList: [],
      monitorSliding: true,
      scrollY: -1,
      currentIndex: 0,
      fTitle: 0,
      diff: 0,
      show: false
    }
  },
  watch: {
    datas(newVal) {
      this.shotcutList = this.datas.map((item) => {
        return item.title.substr(0, 1)
      })
      this.$emit('alphabet', this.shotcutList)
      // 获取每一个listGroup的高度
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
      this.fTitle = newVal[this.fTitle].title
    },
    alphaIndex(newIndex) {
      // alert(this.alphaIndex)
      let ele = this.$refs.listGroup[newIndex]
      this.$refs.listview.scrollToElement(ele, 0)
      this.scrollY = -(this.heights[newIndex] + 100)
    },
    scrollY() {
      // console.log('this.heights:' + JSON.stringify(this.heights))
      let newY = this.scrollY
      for (let i = 0; i < this.heights.length; i++) {
        let currentHeight = this.heights[i]
        let nextHeight = this.heights[i + 1]
        if (newY > 0) {
          console.log(newY)
          this.show = true
        } else {
          this.show = false
        }
        if ((!nextHeight && newY < 0) || (-newY < nextHeight && -newY > currentHeight)) {
          this.currentIndex = i
          this.$emit('currentIndex', this.currentIndex)
          const title = this.datas[this.currentIndex].title
          if (this.datas && title) {
            this.fTitle = title
            this.diff = nextHeight + newY
          }
          return
        }
        this.currentIndex = 0
      }
    },
    diff() {
      if (JSON.parse(this.diff) <= SELECTED_HEIGHT && JSON.parse(this.diff) !== 0) {
        // debugger
        this.$refs.fTitle.style.height = this.diff + 'px'
      } else {
        this.$refs.fTitle.style.height = SELECTED_HEIGHT + 'px'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .listview
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
  .list-fixed
    position: absolute
    top: 1.8rem
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
      overflow hidden
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>