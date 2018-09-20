<template>
  <div class="subway-warp">
    <div id="subwayMap" class="subwayMap"></div>
  </div>

</template>

<style lang="scss">
  .subway-warp{
    width:100%;
    height:100%;
    .subwayMap {
      .hmap-js-popup {
        padding: 0 21px !important;
        background: none!important;
        border: none !important;
      }
    }
  }
</style>

<script>
  import * as api from '../../store/api'
  import { showPopover, closePopover } from '../../components/popover'

  export default {
    name: 'subway',
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
    watch: {},
    mounted () {
      this.hmap()
    },
    components: {
      // mapShow
    },
    methods: {
      hmap () {
        // 绘制地图
        const that = this;
        this.Maps = new HMap({
          target: 'subwayMap',
          controls: {
            scaleLine: true
          },
          view: {
            center: [116.38108661667874, 40.000112935401226],
            projection: 'EPSG:4326',
            zoom: 10 // resolution
          },
          baseLayers: [
            {
              layerName: 'Google',
              isDefault: true,
              layerType: 'Google',
              layerUrl: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
            }
          ]
        });
        this.Maps.on('loadMapSuccess', (event) => {
          debugger
          if (event) {
            window.$map = that.Maps
            // 获取subway数据源
            api.subway().then(res => {
              if (res) {
                that.addSubway(res.data);
                that.handleMapEvents();
                that.Maps.updateSize();
                // console.log(this.Maps inst)
                that.mouseMoving()
              }
            })
          }
        });
      },
      mouseMoving () {
        var sel = new ol.interaction.PointerEvents()
        this.Maps.getMap().addInteraction(sel)
      },
      addSubway (data) {
        var lineJsons = [];
        var labels = [];
        for (var i = 0; i < data.l.length; i++) {
          var line = data.l[i];
          if (line && Array.isArray(line.st)) {
            var lineJson = {
              attributes: {
                id: line.li,
                geomType: 'GeoJSON',
                name: line.kn,
                color: '#' + line.cl,
                style: {
                  stroke: {
                    strokeColor: '#' + line.cl,
                    strokeWidth: 5
                  }
                },
                selectStyle: {
                  stroke: {
                    strokeColor: '#' + line.cl,
                    strokeWidth: 6
                  }
                }
              },
              geometry: {
                "type": "LineString",
                "coordinates": []
              }
            };
            for (var j = 0; j < line.st.length; j++) {
              var _coordinates = line.st[j]['sl'].split(',');
              _coordinates = _coordinates.map(function (item) {
                return Number(item);
              });
              labels.push({
                attributes: {
                  id: line.st[j].poiid,
                  geomType: 'GeoJSON',
                  name: line.st[j].n,
                  color: '#000000',
                  style: {
                    image: {
                      type: '',
                      image: {
                        points: Infinity,
                        radius: 4,
                        stroke: {
                          strokeColor: '#333333',
                          strokeWidth: 1
                        },
                        fill: {
                          fillColor: '#FFFFFF'
                        }
                      }
                    },
                    text: {
                      text: line.st[j].n,
                      textOverflow: true,
                      placement: 'point',
                      textFont: 'normal normal 1 12px arial',
                      textOffsetX: 15,
                      textOffsetY: -15,
                      textFill: {
                        fillColor: '#' + line.cl
                      }
                    }
                  },
                  selectStyle: {
                    image: {
                      type: '',
                      image: {
                        points: Infinity,
                        radius: 4,
                        stroke: {
                          strokeColor: '#333333',
                          strokeWidth: 2
                        },
                        fill: {
                          fillColor: '#FFFFFF'
                        }
                      }
                    },
                    text: {
                      text: line.st[j].n,
                      textOverflow: true,
                      placement: 'point',
                      textFont: 'normal normal 1 12px arial',
                      textOffsetX: 15,
                      textOffsetY: -15,
                      textFill: {
                        fillColor: '#' + line.cl
                      }
                    }
                  }
                },
                geometry: {
                  "type": "Point",
                  "coordinates": _coordinates
                }
              });
              lineJson.geometry.coordinates.push(_coordinates);
            }
            lineJsons.push(lineJson);
          }
        }
        this.addSubwayLine(lineJsons);
        this.addLabel(labels);
      },
      addSubwayLine (datas) {
        this.Maps.addPolylines(datas, {
          layerName: 'lines',
          geomType: 'GeoJSON',
          zoomToExtent: true,
          selectable: false,
          declutter: false
        })
      },
      addLabel (datas) {
        this.Maps.addPoints(datas, {
          layerName: 'points',
          zoomToExtent: false,
          geomType: 'GeoJSON',
          selectable: true,
          declutter: true
        })
      },
      handleMapClick (event) {
        console.log(event, 1);
        closePopover();
        if (this.Maps.hasFeatureAtPixel(event.pixel, {
          layerFilter: layer => {
            return layer.get('layerName') === 'points'
          },
          hitTolerance: 5 // 容差 查询的范围
        })) {
          const feature = this.Maps.forEachFeatureAtPixel(event.pixel, feature => {
            if (feature && feature.getProperties().params.layerName === 'points') {
              return feature;
            }
          }, {
            layerFilter: layer => {
              return layer.get('layerName') === 'points'
            },
            hitTolerance: 5// 容差 查询的范围
          });
          if (feature) {
            const properties = feature.getProperties();
            const coordinates = feature.getGeometry().getClosestPoint(event.coordinate);
            showPopover('station', this.Maps.getMap(), {
              id: properties['id'],
              layerName: 'station-tip',
              coordinates: coordinates,  // 空间信息
              properties: properties,       // 属性信息
              zoomToExtent: true,
              name: properties.name,
              color: properties.color,
              offset: [0, 50]
            })
          }
        }
      },
      pointerMove (event) {
        if (this.Maps.hasFeatureAtPixel(event.pixel, {
          layerFilter: layer => {
            return layer.get('layerName') === 'lines'
          },
          hitTolerance: 0 // 容差 查询的范围
        })) {
          const feature = this.Maps.forEachFeatureAtPixel(event.pixel, feature => {
            if (feature && feature.getProperties().params.layerName === 'lines') {
              return feature;
            }
          }, {
            layerFilter: layer => {
              return layer.get('layerName') === 'lines'
            },
            hitTolerance: 0 // 容差 查询的范围
          });
          if (feature) {
            const properties = feature.getProperties();
            const coordinates = feature.getGeometry().getClosestPoint(event.coordinate);
            showPopover('sampleTip', this.Maps.getMap(), {
              id: properties['id'],
              layerName: 'sample-tip',
              coordinates: coordinates,  // 空间信息
              properties: properties,       // 属性信息
              zoomToExtent: false,  // 是否把气泡的锚点移动到气泡中央
              name: properties.name,
              color: properties.color,
              offset: [0, 50]
            })
          }
        }
      },
      handleMapEvents () {
        this.Maps.on('click', this.handleMapClick.bind(this), this);
        this.Maps.on('pointermove', this.pointerMove.bind(this), this);
      }
    }
  }
</script>
