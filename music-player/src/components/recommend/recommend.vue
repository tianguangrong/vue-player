<template>
    <scroll :data="swiperSlides" :loading="loading" :top="top">
      <vue-swiper :swiperSlides=swiperSlides>
        <template slot-scope="slide">
          <swiper-slide>
            <a :href="slide.slide.linkUrl">
              <img class="needclick" :src="slide.slide.picUrl" alt="">
            </a>
          </swiper-slide>
        </template>
      </vue-swiper>
      <recommend-list :recomPlaylist="recomPlaylist" @loaded="loaded"></recommend-list>
    </scroll>
</template>

<script>
import VueSwiper from 'base/vue-owesome-swiper/swiper'
import { getRecommend, getDiscList } from 'api/recommend'
import { RES_OK } from 'api/config'
import RecommendList from './components/recommend-list'
import Scroll from 'base/vue-better-scroll/scroll'

export default {
  name: 'Recommend',
  components: {
    VueSwiper,
    RecommendList,
    Scroll
  },
  data() {
    return {
      swiperSlides: [],
      recomPlaylist: {},
      loading: false,
      top: 1.8
    }
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        res = res.data
        if (res.code === RES_OK) {
          const slides = res.data.slider
          this.swiperSlides = slides
        }
      })
    },
    _getDiscList() {
      getDiscList().then(res => {
        res = res.data
        if (res.code === RES_OK) {
          this.recomPlaylist = res.recomPlaylist
        }
      })
    },
    loaded() {
      this.loading = true
    }
  },
  created() {
    this._getRecommend()
    setTimeout(() => {
      this._getDiscList()
    }, 1000)
  }
}
</script>

<style lang='stylus' scoped>

</style>