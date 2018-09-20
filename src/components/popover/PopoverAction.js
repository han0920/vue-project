export default {
  props: {
    closeOnHashChange: {
      default: true
    }
  },
  data () {
    return {
      action: '',
      beforeClose: null
    }
  },
  methods: {
    close () {
      this.$map.removeOverlayById(this.properties['id'] + '-popover')
    },
    getSafeClose () {
      return () => {
        this.$nextTick(() => {
          this.doClose()
        })
      }
    },
    doClose () {
      setTimeout(() => {
        if (this.action) this.callback(this.action, this)
      })
    },
    closePopup (action) {
      this.action = action
      if (typeof this.beforeClose === 'function') {
        this.close = this.getSafeClose()
        this.beforeClose(action, this, this.close)
      } else {
        this.doClose()
      }
    }
  },
  mounted () {
    if (this.closeOnHashChange) {
      window.addEventListener('hashchange', this.close)
    }
  },
  beforeDestroy () {
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.close)
    }
  }
}
