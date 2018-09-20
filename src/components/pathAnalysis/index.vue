<template>
  <div class="path-analysis-warp">
    <div class="path-analysis-header">
      <span class="iconfont icon-lujing"></span>
      <span class="title">绕行方案</span>
      <span @click="onClose" class="iconfont close-button icon-guanbi"></span>
    </div>
    <div class="path-analysis-content">
      <ul>
        <li class="origins">
          <span class="iconfont icon-qizhidian"></span>
          <span class="title">起点:</span>
          <el-autocomplete
            v-model="originsValue"
            :fetch-suggestions="querySearchAsync"
            placeholder="输入或者在地图点选"
            @focus="focusInput('origins')"
            @select="handleSelect($event, 'origins')" clearable></el-autocomplete>
        </li>

        <li v-for="(item, index) in avoidItems" class="avoid">
          <span class="iconfont icon-qizhidian"></span>
          <span class="title">途经点:</span>
          <el-autocomplete
            v-model="avoidValues[item.id]"
            :fetch-suggestions="querySearchAsync"
            placeholder="输入或者在地图点选"
            @focus="focusInput('avoid')"
            @select="handleSelect($event, 'avoid')" clearable></el-autocomplete>
          <!--<span v-if="index > 0" class="iconfont icon-iconless" @click.stop="delDirectivePoint('avoidValue', index)"></span>-->
          <span class="iconfont icon-jia" @click.stop="addDirectivePoint('avoidValue', index)"></span>
        </li>
        <li v-for="(item, index) in passItems" class="pass">
          <span class="iconfont icon-qizhidian"></span>
          <span class="title">规避点:</span>
          <el-autocomplete
            v-model="passValues[item.id]"
            :fetch-suggestions="querySearchAsync"
            placeholder="输入或者在地图点选"
            @focus="focusInput('pass')"
            @select="handleSelect($event, 'pass')" clearable></el-autocomplete>
          <span class="iconfont icon-jia" @click.stop="addDirectivePoint('passValues', index)"></span>
        </li>
        <li class="destination">
          <span class="iconfont icon-qizhidian"></span>
          <span class="title">终点:</span>
          <el-autocomplete
            v-model="destinationValue"
            :fetch-suggestions="querySearchAsync"
            placeholder="输入或者在地图点选"
            @focus="focusInput('destination')"
            @select="handleSelect($event, 'destination')" clearable></el-autocomplete>
        </li>
      </ul>
    </div>
    <div class="path-analysis-button">
      <el-button @click="generate()">生成</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>
<style lang="scss" type="text/scss">
  .path-analysis-warp {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 300px;
    background: #fff;
    padding: 10px;
    .path-analysis-header {
      .title {
        font-size: 14px;
      }
      .close-button {
        position: absolute;
        right: 20px;
        &:hover {
          color: #1b9de8;
          cursor: pointer;
        }
      }
    }
    .path-analysis-content {
      margin: 20px;
      ul {
        li {
          border-bottom: 1px solid #ededed;
          &:hover {
            .icon-guanbi, .icon-iconless, .icon-jia {
              display: inline;
            }
          }
          .title {
            display: inline-block;
            width: 50px;
            height: 30px;
            line-height: 30px;
          }

          .icon-guanbi, .icon-iconless, .icon-jia {
            display: none;
            color: #5B5E65!important;
            &:hover {
              color: #1b9de8!important;
              cursor: pointer;
            }
          }
          .el-autocomplete {
            width: 150px !important;
          }
          input {
            border: none;
            padding: 0 !important;
          }
        }
        .origins {
          .iconfont {
            color: #29ae51;
            &:hover {
              cursor: pointer;
            }
          }
        }

        .avoid {
          .iconfont {
            color: #97989B;
            &:hover {
              cursor: pointer;
            }
          }
        }

        .pass {
          .iconfont {
            color: #23aeef;
            &:hover {
              cursor: pointer;
            }
          }
        }

        .destination {
          .iconfont {
            color: #eb4f38;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .path-analysis-button {
      text-align: center;
      margin: 0 20px;
    }
  }
</style>
<script>
  import {mapState} from 'vuex'
  import pathAnalysis from './helper'
  import {pathAnalysisAutoFetch, pathAnalysisQueryPoint} from '../../services';
  const upperFirstChart = (str) => {
    return (str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()))
  };
  const avoidItem = {
    id: ''
  }
  const passItem = {
    id: ''
  }
  export default {
    data () {
      return {
        originsValue: '',
        destinationValue: '',
        passValues: {},
        avoidValues: {},
        avoidItems: [
          {
            id: 'avoid-item-0'
          }
        ],
        passItems: [
          {
            id: 'pass-item-0'
          }
        ]
      }
    },
    mixins: [pathAnalysis],
    computed: {
      ...mapState({
        origins: state => state.pathAnalysis.origins,
        destination: state => state.pathAnalysis.destination,
        pass: state => state.pathAnalysis.pass,
        avoid: state => state.pathAnalysis.avoid
      })
    },
    watch: {
      origins: function (val) {
        if (val && val.value) {
          this.originsValue = val.value
          this.drawPoint('origins', val)
        }
      },
      destination: function (val) {
        if (val && val.value) {
          this.destinationValue = val.value
          this.drawPoint('destination', val)
        }
      },
      pass: function (val) {
        if (val && val.value) {
          this.passValue = val.value
          this.drawPoint('pass', val)
        }
      },
      avoid: function (val) {
        if (val && val.value) {
          this.avoidValue = val.value
          this.drawPoint('avoid', val)
        }
      }
    },
    mounted () {
    },
    components: {
    },
    methods: {
      onClose () {},
      querySearchAsync (queryString, callback) {
        pathAnalysisAutoFetch(queryString).then(res => {
          let data = (typeof res.data === 'string' ? JSON.parse(res.data) : res.data)
          callback(data.data)
        })
      },
      handleMapClick (type, event) {
        pathAnalysisQueryPoint(event.coordinate).then(res => {
          this.handleSelect({
            value: res.attributes.name,
            address: res.geometry
          }, type)
        })
      },
      focusInput (type) {
        this.$map.getMap().un('click', this.handleMapClick.bind(this, type))
        this.$map.getMap().once('click', this.handleMapClick.bind(this, type))
      },
      handleSelect (item, type) {
        this.$map.un('click', this.handleMapClick, this)
        this.$store.dispatch('actionPath' + upperFirstChart(type), {
          value: item.value,
          address: item.address
        })
      },
      drawPoint (type, res) {
        const point = {
          attributes: {
            id: type,
            name: res.value
          },
          geometry: res.address
        }
        this.$map.removeFeatureById(type)
        this.$map.addPoint(point, {
          layerName: 'auto-point-layer',
          style: {
            image: {
              type: 'icon',
              image: {
                imageSrc: './static/images/path/' + type + '.png',
                imageAnchor: (type === 'pass' || type === 'avoid') ? [0.5, 0.5] : [0.5, 1]
              }
            }
          },
          selectStyle: {
            image: {
              type: 'icon',
              image: {
                imageSrc: './static/images/path/' + type + '.png',
                imageAnchor: (type === 'pass' || type === 'avoid') ? [0.5, 0.5] : [0.5, 1]
              }
            }
          }
        })
      },
      addDirectivePoint (type, index) {
        console.log('add', type, index)
        if (index === undefined) index = -1
        if (type === 'avoidValue') {
          avoidItem.id = 'avoid-item-' + (index + 1)
          this.avoidItems[index + 1] = avoidItem
          this.$set(this.avoidValues, avoidItem.id, '')
        } else {
          passItem.id = 'pass-item-' + (index + 1)
          this.passItems[index + 1] = passItem
          this.$set(this.passValues, passItem.id, '')
        }
      },
      generate () {}
    }
  }
</script>
