<template>
  <transition name="msgbox-fade">
    <div class="sf-popover" :style="computedStyle" :class="className">
      <div class="sf-popover-header clearfix">
        <span class="sf-popover-header-title" v-if="name && code">
          <span class="name">{{name}}</span>
          <span class="code">（{{code}}）</span>
        </span>
        <span class="sf-popover-header-tools">
          <span
            v-for="tool in tools"
            class="tool iconfont"
            @click.stop="handleToolAction(tool)"
            :class="tool.icon"
            :title="tool.name"></span>
        </span>
        <button
          type="button"
          class="sf-popover__headerbtn"
          v-if="showClose"
          @click="close()"
          @keydown.enter="close()">
          <i class="sf-popover__close el-icon-close"></i>
        </button>
      </div>
      <div class="sf-popover-content" v-if="content !== ''">
        <div class="sf-popover-content__body">
          <slot>
            <p v-if="!dangerouslyUseHTMLString">{{ content }}</p>
            <p v-else v-html="content"></p>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import PopoverAction from '../PopoverAction'
  const size = {
    medium: [180, 'auto'],
    small: [],
    mini: []
  }
  export default {
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
        content: '',
        name: '',
        code: '',
        tools: '',
        callback: null,
        dangerouslyUseHTMLString: false
      }
    },
    computed: {
      computedStyle () {
        return {
          width: (typeof this.size === 'string')
            ? size[this.size][0] + 'px'
            : (typeof this.size[0] === 'string' ? this.size[0] : this.size[0] + 'px'),
          height: (typeof this.size === 'string')
            ? size[this.size][1] + 'px'
            : (typeof this.size[1] === 'string' ? this.size[1] : this.size[1] + 'px'),
          padding: typeof this.padding === 'string' ? this.padding : this.padding + 'px'
        }
      }
    },
    watch: {},
    methods: {
      handleToolAction (tool) {
        console.log(tool)
      }
    },
    components: {}
  }
</script>
<style lang="scss">
  .sf-popover {
    border-radius: 4px;
    &-header {
      .sf-popover__headerbtn {
        position: absolute;
        right: 15px;
        padding: 0;
        border: none;
        outline: none;
        background: transparent;
        font-size: 16px;
        cursor: pointer;
        i {
          color: #747474;
        }
        &:hover {
          i {
            color: #409eff;
          }
        }
      }
      &-title {
        color: #292929;
      }
      &-tools {
        position: absolute;
        right: 35px;
        padding: 0;
        border: none;
        outline: none;
        background: transparent;
        font-size: 16px;
        .tool {
          display: inline-block;
          padding: 0px 5px;
          color: #747474;
          &:hover {
            cursor: pointer;
            color: #409eff;
          }
        }
      }
    }
    &-content {
      margin: 15px 10px;
    }
  }
</style>
