<template>
    <div class="rec-list-container">
        <div class="hot-song-share">热门歌曲分享</div>
        <ul class="hot-song-recom">
            <li v-for="(item,index) of list.v_hot" :key="index" class="hot-song-box">
                <div class="img-box"><img @load="loadImg" v-lazy="item.cover" alt=""></div>
                <div class="img-detail">
                    <span v-html="item.title"></span>
                    <span v-html="'点击量:'+item.listen_num" class="desc"></span>
                </div>
            </li>
        </ul>
        <loading v-show="!list.v_hot"></loading>
    </div>
</template>

<script>
import Loading from 'base/vue-loading/loading'
export default {
  name: 'RecommendList',
  props: {
    recomPlaylist: Object
  },
  components: {
    Loading
  },
  data() {
    return {}
  },
  computed: {
    list() {
      var list = []
      if (this.recomPlaylist.data) {
        list = this.recomPlaylist.data
      }
      return list
    }
  },
  methods: {
    loadImg() {
      this.$emit('loaded')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .rec-list-container
    position relative
    font-size $font-size-medium
    .hot-song-share
        width 100%
        display flex
        flex-direction row
        justify-content center
        align-items center
        font-size .3rem
        padding 0.2rem 0
        background $color-background-d
    .hot-song-recom
        .hot-song-box
            display flex
            .img-box
                padding .2rem
                img
                    width 1.5rem
            .img-detail
                display flex
                flex-direction column
                margin .2rem
                span
                    margin-top .2rem
                    color $color-text
                .desc
                    color $color-text-d
                    margin-top .3rem
</style>