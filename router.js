// let Vue = null

class HistoryRouter {
  constructor() {
    this.current = null
  }
}

class vueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    this.history = new HistoryRouter
    this.init()
    this.routeMap = this.createMap(this.routes)
  }
  init() {
    if (this.mode === 'hash') {
      location.hash ? '' : location.hash = '/'
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1)
      })
    } else {
      window.addEventListener('load', () => {
        this.history.current = location.pathname
      })
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname
      })
    }
  }
  createMap(routes) {
    return routes.reduce((memo, current) => {
      memo[current.path] = current.component
      return memo
    }, {})
  }
  push(url) {
    if (this.mode === 'hash') {
      location.hash = url
    } else {
      pushState(url)
    }
  }
  replace(url) {
    if (this.mode === 'hash') {
      location.hash = url
    } else {
      pushState(url, true)
    }
  }
}

function pushState(url, replace = false) {
  const history = window.history
  if (replace) {
    history.replaceState({ key: history.state.key }, '', url)
  } else {
    history.pushState({ key: Date.now() }, '', url)
  }
}

vueRouter.install = function (Vue) {
  Vue.mixin({
    beforeCreate() {
      console.log('init', this.$options)
      if (this.$options && this.$options.router) {
        this._root = this
        this._router = this.$options.router
        Vue.util.defineReactive(this, 'current', this._router.history)
      } else {
        this._root = this.$parent._root
      }
      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router
        }
      })
    }
  })
  Vue.component('router-view', {
    render(h) {
      let current = this._self._root._router.history.current
      let routerMap = this._self._root._router.routeMap
      return h(routerMap[current])
    }
  })
  Vue.component('router-link', {
    props: {
      to: {
        type: [Object, String],
        required: true
      },
      tag: {
        type: String,
        default: 'a'
      },
      replace: {
        type: Boolean,
        default: false
      }
    },

    render(h) {
      let data = {}
      if (this.tag === 'a') {
        data.attrs = { href: this.to }
      } else {
        data.on = {
          click: () => {
            if (this.replace) {
              this._self._root._router.replace(this.to)
            } else {
              this._self._root._router.push(this.to)
            }
          }
        }
      }
      return h(this.tag, data, this.$slots.default)
    }
  })
}

export default vueRouter