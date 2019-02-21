<template>
    <div class="swiper-container">
      <swiper :options="swiperOption" :ref="'swiper'" v-if="iswiper">
        <slot
            v-for="slide in swiperSlides"
            :slide=slide></slot>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>

export default {
  name: 'VueSwiper',
  props: {
    swiperSlides: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: {
          delay: 4000
        },
        effect: 'coverflow'
      }
    }
  },
  computed: {
    iswiper() {
      return this.swiperSlides.length
    }
  }
}
</script>

<style lang='stylus' scoped>
.swiper-container >>> .swiper-pagination-bullet-active
  background #ffffff
.swiper-container >>> img
  width 100%
.swiper-container
  width 100%
  overflow hidden
  height 0
  padding-bottom 40%
  margin-top 0.02rem
</style>