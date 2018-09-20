<template>
  <div class="station-popover">
    <div class="station-popover__title">
      <span class="station-name">{{name}}</span>
      <button
        type="button"
        class="sf-popover__headerbtn"
        v-if="showClose"
        @click="handleCloser()"
        @keydown.enter="handleCloser()">
        <i class="sf-popover__close iconfont icon-guanbi"></i>
      </button>
    </div>
    <div class="station-popover__content">
      <div class="time-item" v-for="(item, key) in items" :key="key">
        <div class="time-item-title" :style="{color: item.color}">
          <label class="line-label">地铁</label>
          <span>{{item.stationName}}</span>
        </div>
        <ul class="time-item-main">
          <li class="time-item-detail">
            <div class="train-direct fl">
              <label class="direct-label">开往</label>
              <span class="direct-name">{{item.firstDirectName}}</span>
            </div>
            <div class="train-time fl">
              <div class="start-time time-box fl">
                <label class="time-label">首</label>
                <span class="time">{{item.firstDirectStartTime}}</span>
              </div>
              <div class="last-time time-box fl">
                <label class="time-label">末</label>
                <span class="time">{{item.firstDirectEndTime}}</span>
              </div>
            </div>
          </li>
          <li class="time-item-detail">
            <div class="train-direct fl">
              <label class="direct-label">开往</label>
              <span class="direct-name">{{item.secondDirectName}}</span>
            </div>
            <div class="train-time fl">
              <div class="start-time time-box fl">
                <label class="time-label">首</label>
                <span class="time">{{item.secondDirectStartTime}}</span>
              </div>
              <div class="last-time time-box fl">
                <label class="time-label">末</label>
                <span class="time">{{item.secondDirectEndName}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import PopoverAction from '../PopoverAction'

  export default {
    name: "station",
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
        name: '西二旗',
        color: '',
        items: [
          {
            color: '#BF7E16',
            stationName: '13号线',
            firstDirectName: '东直门',
            firstDirectStartTime: '05:54',
            firstDirectEndTime: '00:04',
            secondDirectName: '西直门',
            secondDirectStartTime: '05:11',
            secondDirectEndName: '23:19'
          }
        ],
        callback: null,
        dangerouslyUseHTMLString: false
      }
    },
    computed: {},
    watch: {},
    methods: {
      handleCloser () {
        window.$map.removeOverlayById(this.properties['id'] + '-popover')
      }
    },
    components: {}
  }
</script>

<style scoped lang="scss">
  .station-popover {
    padding: 0 6px 6px 6px;
    width: 292px;
    background: #008CD6;
    display: inline-block;
    &__title {
      height: 34px;
      padding: 0 5px;
      .station-name {
        display: block;
        float: left;
        height: 34px;
        line-height: 34px;
        color: #fff;
        font-size: 14px;
      }
      .sf-popover__headerbtn {
        position: absolute;
        right: 30px;
        padding: 0;
        top: 7px;
        border: none;
        outline: none;
        background: transparent;
        font-size: 16px;
        cursor: pointer;
        i {
          color: #FFFFFF;
        }
        &:hover {
          i {
            color: #409eff;
          }
        }
      }
    }
    &__content {
      width: 280px;
      background: #fff;
      padding: 0 5px;
      .time-item {
        padding-bottom: 10px;
        .time-item-title {
          height: 24px;
          line-height: 24px;
          font-weight: bold;
        }
        .time-item-main {
          overflow: hidden;
          .time-item-detail {
            line-height: 15px;
            padding: 5px 0;
            overflow: hidden;
            zoom: 1;
            .direct-label {
              display: block;
              float: left;
              width: 26px;
              margin-right: 5px;
            }
            .direct-name {
              display: block;
              float: left;
              width: 49px;
              font-weight: bold;
            }
            .train-time {
              color: #fff;
              float: right;
              .time-box {
                padding: 0 10px;
                width: 80px;
                overflow: hidden;
                .time-label {
                  margin-right: 5px;
                }
              }
              .start-time {
                background: #EF5D42;
              }
              .last-time {
                background: #80B142;
              }
            }
          }
        }
      }
      .fl {
        float: left;
      }
    }
  }
</style>
