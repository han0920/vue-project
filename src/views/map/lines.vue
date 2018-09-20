<template>
  <div class="line-warp">
    <div  class="line-warp-button">
      <button class="base-button" id="addFeature" @click="addFeature(clickOnShow)">单线</button>
      <button class="base-button" id="addFeatures" @click="addFeatures()">多线</button>

      <button class="base-button" id="highLightFeatureById" @click="highLightFeatureById()">通过id高亮线</button>
      <button class="base-button" id="unHighLightFeatureById" @click="unHighLightFeatureById()">通过id取消高亮线</button>
    </div>
    <!-- 地图展示 -->
    <!--<map-show></map-show>-->
    <div id="map"></div>
  </div>
</template>

<style lang="scss">
  .line-warp{
    width:100%;
    height:100%;
    .line-warp-button {
      position: absolute;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      z-index: 2;
    }
  }
</style>

<script>
  import HMap from '../../../static/js/hmap-js/hmap'
  import * as api from '../../store/api'
  export default {
    name: 'home',
    data () {
      return {
        msg: 'vue学习开发实践-学习1.0',
        Maps: '',
        lines: [],
        clickOnShow: true,
        extent: [],
        origin: [],
        resolutions: []
      }
    },
    watch: {
    },
    mounted () {
      this.hmap()
    },
    components: {
      // mapShow
    },
    methods: {
      linesClick () {
        debugger
        this.$router.replace({path: '/lines'})
      },
      userheaderClick () {
        this.$router.replace({path: '/user'})
      },
      hmap () {
        /***
         * 天地图影像
         * @type {Buffer}
         */
        // this.Maps = new HMap({
        //   target: 'map',
        //   view: {
        //     center: [113.53450137499999, 34.44104525],
        //     projection: 'EPSG:4326',
        //     zoom: 5 // resolution
        //   },
        //   baseLayers: [
        //     {
        //       layerName: 'tianditu',
        //       isDefault: true,
        //       layerType: 'TileWMTS',
        //       projection: 'EPSG:4326',
        //       levels: 19,
        //       layer: 'img',
        //       format: 'tiles',
        //       matrixSet: 'w',
        //       layerUrl: 'http://t{0-6}.tianditu.com/img_w/wmts'
        //     }
        //   ]
        // });

        /****
         * 天地图
         * @type {Buffer}
         */
        // this.Maps = new HMap({
        //   target: 'map',
        //   view: {
        //     center: [113.53450137499999, 34.44104525],  // 中心点
        //     projection: 'EPSG:4326',   // 投影
        //     zoom: 5 // resolution  放大级别
        //   },
        //   baseLayers: [    // 基础图层
        //     {
        //       layerName: 'tianditu',
        //       isDefault: true,          // 默认
        //       layerType: 'TileWMTS',    // 图层类型
        //       projection: 'EPSG:4326',  // 投影
        //       levels: 19,               // 水平
        //       layer: 'vec',             // 图层
        //       format: 'tiles',          // 格式
        //       matrixSet: 'c',           // 矩阵组
        //       layerUrl: 'http://t{0-6}.tianditu.com/vec_c/wmts'   // 图层地址
        //     }
        //   ]
        // });

        /***
         * Google
         * @type {Buffer}
         */
        // this.Maps = new HMap({
        //   target: 'map',
        //   controls: {
        //     scaleLine: true
        //   },
        //   view: {
        //     center: [113.53450137499999, 34.44104525],
        //     projection: 'EPSG:4326',
        //     zoom: 5  // resolution
        //   },
        //   baseLayers: [
        //     {
        //       layerName: 'Google',
        //       isDefault: true,
        //       layerType: 'Google',
        //       layerUrl: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
        //     }
        //   ]
        // })

        /***
         * arcgis数据
         * @type {Buffer}
         */
        this.arcGis()
        // 调用线的数据
        this.addFeatureData()
        // 鼠标移入 显示线高亮
        // this.mouseMoving()
      },
      // arcgis 底图渲染
      arcGis () {
        let l = this
        api.arcgis().then(res => {
          // extent
          var extent = res.data.initialExtent  // 最初默认的
          l.extent[0] = extent.xmin
          l.extent[1] = extent.ymin
          l.extent[2] = extent.xmax
          l.extent[3] = extent.ymax
          // origin
          var origin = res.data.tileInfo.origin
          l.origin[0] = origin.x
          l.origin[1] = origin.y
          // resolutions
          var resolutions = res.data.tileInfo.lods
          for (var s = 0; s < resolutions.length; s++) {
            l.resolutions.push(resolutions[s].resolution)
          }

          this.Maps = new HMap({
            target: 'map',
            view: {
              center: [113.53450137499999, 34.44104525],
              projection: 'EPSG:4326',
              zoom: 5  // resolution
            },
            baseLayers: [
              {
                layerName: 'ArcGIS',
                isDefault: true,
                layerType: 'TileXYZ',
                tileGrid: {
                  tileSize: 256,
                  extent: this.extent,
                  origin: this.origin,
                  resolutions: this.resolutions
                },
                layerUrl: 'http://211.101.37.251:6080/arcgis/rest/services/HeNan/HNmapNEW16/MapServer/tile/{z}/{y}/{x}'
              }
            ]
          })

          // 鼠标移入 显示线高亮
          this.mouseMoving()
        })
      },
      // 初始化完成后添加鼠标移入交互
      mouseMoving () {
        var sel = new ol.interaction.PointerEvents()
        this.Maps.addInteraction(sel)
      },
      // 调用线的数据
      addFeatureData () {
        api.addFeature().then(res => {
          console.log(res, 1)
          // this.lines = res.data['data']['features']
          this.lines = res.data.data
        })
      },
      // 添加单线
      addFeature (clickOnShow) {
        if (clickOnShow) {
          this.Maps.addPolyline(this.lines[0], {
            layerName: 'line',
            zoomToExtent: true,
            selectable: true,
            style: {
              stroke: {
                strokeColor: '#1b9de8',
                strokeWidth: 3
              }
            },
            selectStyle: {
              stroke: {
                strokeColor: '#D81E06',
                strokeWidth: 3
              }
            }
          })
          this.clickOnShow = false
        } else {
          /**
           * 通过layerName移除线
           */
          this.Maps.removeFeatureByLayerNames(['line', 'lines'])
          /***
           * 通过id 移除线
           * @type {boolean}
           */
          // this.Maps.removeFeatureById('{344F08BA-61CA-49B8-B949-01FFCAE5153F}')
          this.clickOnShow = true
        }
      },
      // 添加多线
      addFeatures () {
        this.Maps.addPolylines(this.lines, {
          layerName: 'lines',
          zoomToExtent: true,
          selectable: true,
          style: {
            stroke: {
              strokeColor: '#1b9de8',
              strokeWidth: 3
            }
          },
          selectStyle: {
            stroke: {
              strokeColor: '#D81E06',
              strokeWidth: 3
            }
          }
        })
      },
      // 高亮线
      highLightFeatureById () {
        this.Maps.highLightFeature('{344F08BA-61CA-49B8-B949-01FFCAE5153F}')
      },
      // 取消高亮线
      unHighLightFeatureById () {
        this.Maps.unHighLightFeature('{344F08BA-61CA-49B8-B949-01FFCAE5153F}')
      }
    }
  }
</script>
