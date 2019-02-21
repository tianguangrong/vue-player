<template>
    <div>
      <list-view
      :alphaIndex="alphaIndex"
      :datas="singerLists"
      @currentIndex="achieveScrollIndex"
      @select="selcetItem"
      @alphabet="achieveAlphabet"></list-view>
      <alphabet :shotcutList="alphabets" @alphaIndex="achieveIndex" :scrollIndex="scrollIndex"></alphabet>
      <router-view></router-view>
    </div>
</template>

<script>
import { getSingerList } from 'api/singers'
import { RES_OK, Singer } from 'api/config'
import ListView from 'base/vue-singerList-view/listView'
import Alphabet from 'base/vue-alphabet/alphabet'
import { mapMutations } from 'vuex'
const HOT_NAME = '热门'
const HOT_LIST_LENGTH = 10
export default {
  name: 'Singer',
  data() {
    return {
      singerLists: [],
      alphabets: [],
      alphaIndex: null,
      scrollIndex: 0
    }
  },
  components: {
    ListView,
    Alphabet
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        res = res.data
        if (res.code === RES_OK) {
          const list = res.data.list
          this.singerLists = this._sortLists(list)
        }
      })
    },
    selcetItem(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    achieveAlphabet(arr) {
      this.alphabets = arr
    },
    achieveScrollIndex(e) {
      this.scrollIndex = e
    },
    _sortLists(list) {
      var map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.map((lis, index) => {
        // 添加热门数据
        if (index < HOT_LIST_LENGTH) {
          map.hot.items = [...map.hot.items,
            new Singer({id: lis.Fsinger_mid, name: lis.Fother_name})
          ]
        }
        if (!map[lis.Findex]) {
          map[lis.Findex] = {
            title: lis.Findex,
            items: []
          }
        }
        map[lis.Findex].items = [...map[lis.Findex].items,
          new Singer({id: lis.Fsinger_mid, name: lis.Fsinger_name})
        ]
      })
      var hot = []
      var ret = []
      for (const key in map) {
        if (map.hasOwnProperty(key)) {
          const element = map[key]
          if (element.title === HOT_NAME) {
            hot = [...hot, element]
          } else if ((/[a-zA-Z]/).test(element.title)) {
            ret = [...ret, element]
          }
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      var result = hot.concat(ret)
      return result
    },
    achieveIndex(e) {
      this.alphaIndex = e
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>