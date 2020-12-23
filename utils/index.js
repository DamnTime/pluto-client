export const throttle = (fn, wait) => {
  let pre = Date.now()
  return function () {
    const context = this
    const args = arguments
    const now = Date.now()
    if (now - pre >= wait) {
      fn.apply(context, args)
      pre = Date.now()
    }
  }
}

export const fixedEncodeURIComponent = (str) => {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16)
  })
}
