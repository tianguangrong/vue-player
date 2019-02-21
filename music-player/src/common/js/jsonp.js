import jsonpPlug from 'jsonp'

export default function jsonp(url, data, option) {
  var promise = new Promise(function(resolve, reject) {
    url += (url.indexOf('?') > 0) ? '&' : '?' + urlParam(data)
    jsonpPlug(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
  return promise
}

function urlParam(data) {
  var param = ''
  for (const key in data) {
    var value
    if (data[key]) {
      value = encodeURIComponent(data[key])
    } else {
      value = ''
    }
    param += `&${key}=${value}`
  }
  var result = param ? param.substring(1) : ''
  return result
}