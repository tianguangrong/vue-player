import axios from 'axios'
import { options, commonParams } from './config'
import jsonp from 'common/js/jsonp'

// export function getSingerList() {
//   var url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
//   var data = {
//     ...commonParams,
//     channel: 'singer',
//     page: 'list',
//     key: 'all_all_all',
//     pagesize: 100,
//     pagenum: 1,
//     hostUin: 0,
//     needNewCode: 0,
//     platform: 'yqq'
//   }
//   const result = jsonp(url, data, options)
//   return result
// }

export function getSingerList() {
  var url = 'api/singer-lists.json'
  var singerlistsReq = axios.get(url)
  return singerlistsReq
}

// 歌手详情
export function getSingerDetail(singerId) {
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  var data = {
    ...commonParams,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  }
  const result = jsonp(url, data, options)
  return result
}