const loadScript = function () {
  let loaded = false
  return function (url, callback) {
    if (!loaded) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      if (typeof callback !== 'undefined') {
        if (script.readyState) {
          script.onreadystatechange = function () {
            if (
              script.readyState === 'loaded' ||
              script.readyState === 'complete'
            ) {
              script.onreadystatechange = null
              typeof callback === 'function' && callback()
            }
          }
        } else {
          script.onload = function () {
            typeof callback === 'function' && callback()
          }
        }
      }
      script.src = url
      document.body.appendChild(script)
      loaded = true
    }
  }
}

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

export const cluserLoadScript = loadScript()
