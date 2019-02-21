<template>
    <transition name="slide">
      <music-list v-if="this.songs !== []" :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singers'
import { RES_OK } from 'api/config'
import { createSong } from 'api/song'
import MusicList from 'components/music-list/music-list'
export default {
  name: 'SingerDetail',
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    }
  },
  components: {
    MusicList
  },
  created() {
    this._getDetail(this.singer.id)
  },
  methods: {
    _getDetail(singerId) {
      if (!singerId) {
        this.$router.push({
          path: '/singer'
        })
        return
      }
      var promise = getSingerDetail(singerId)
      promise.then((res) => {
        if (RES_OK === res.code) {
          res = res.data
          res.list.forEach((lis, index) => {
            if (lis.musicData.songid && lis.musicData.albumid) {
              this.songs = [
                ...this.songs,
                createSong(lis.musicData)
              ]
            }
          })
        }
      }, (err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .slide-enter-active,.slide-leave-active
    transition all .3s
  .slide-enter,.slide-leave-to
    transform translate3d(100%,0,0)

</style>