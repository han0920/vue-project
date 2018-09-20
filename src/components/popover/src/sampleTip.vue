<template>
  <div class="popover-tip">
    <div class="popover-tip__content">
      <span :style="{background: color}">{{name}}</span>
    </div>
  </div>
</template>

<script>
  import PopoverAction from '../PopoverAction'
  export default {
    name: "sampleTip",
    props: {
      size: {
        type: [String, Array],
        default: 'medium' // small mini
      },
      padding: {
        type: [String, Number],
        default: '10px'
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeOnHashChange: {
        default: true
      },
      className: {
        type: String,
        default: ''
      }
    },
    mixins: [PopoverAction],
    data () {
      return {
        name: '',
        color: '',
        callback: null,
        dangerouslyUseHTMLString: false
      }
    },
    computed: {},
    watch: {},
    methods: {
    },
    components: {}
  }
</script>

<style scoped lang="scss">
  .popover-tip {
    background-color: #fff;
    padding: 5px 5px 5px 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    .popover-tip__content {
      width: 100%;
      text-align: center;
    }
    &__content {
      span {
        display: inline-block;
        line-height: 20px;
        padding: 0 6px;
        color: #FFF;
        font-size: 12px;
      }
    }
  }
</style>
