var elementStyle = document.createElement('div').style
// 自执行
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    ms: 'msTransform',
    O: 'OTransform',
    Moz: 'MozTransform',
    standard: 'transform'
  }
  for (const key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  style = vendor + style.charAt(0).toUpperCase() + style.substr(1)
  return style
}