// import { options } from './config'
// import jsonp from 'common/js/jsonp'
import axios from 'axios'

// export function getRecommend() {
//   var url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
//   var data = {
//     ...commonParams,
//     platform: 'h5',
//     needNewCode: 1
//   }
//   console.log(data)
//   return jsonp(url, data, options)
// }
export function getRecommend() {
  var url = 'api/recommend-mock.json'
  var achieveAxiosMock = axios.get(url)
  return achieveAxiosMock
}
export function getDiscList() {
  var url = 'api/recommend-list.json'
  var achieveAxiosList = axios.get(url)
  return achieveAxiosList
}