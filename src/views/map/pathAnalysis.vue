<template>
  <div class="path-analysis">
    <!-- 地图展示 -->
    <div id="map" ref="map">
      <path-analysis></path-analysis>
    </div>
  </div>
</template>

<style lang="scss">
  .path-analysis{
    width:100%;
    height:100%;
  }
</style>

<script>
  import Vue from 'vue'
  import pathAnalysis from '../../components/pathAnalysis'
  export default {
    name: 'home',
    data () {
      return {
      }
    },
    watch: {},
    mounted () {
      this.hmap()
    },
    components: {
      pathAnalysis
    },
    methods: {
      hmap () {
        const map = new HMap(this.$refs.map, {
          target: 'map',
          controls: {
            scaleLine: true
          },
          view: {
            center: [113.53450137499999, 34.44104525],
            projection: 'EPSG:4326',
            zoom: 8 // resolution
          },
          baseLayers: [
            {
              layerName: 'Google',
              isDefault: true,
              layerType: 'Google',
              layerUrl: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
            },
            {
              layerName: 'BaiDu',
              isDefault: false,
              layerType: 'BaiDu',
              origin: [43.88955327932, 12.590178885765],
              label: [
                {
                  layerName: 'BaiDuLabel',
                  isDefault: false,
                  layerType: 'BaiDu',
                  alias: 'BaiDu', // 关联的父集图层
                  origin: [43.88955327932, 12.590178885765],
                  layerUrl: 'http://online{0-3}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=sl&p=0&v=083&udt=20170926'
                }
              ],
              layerUrl: 'http://shangetu{0-3}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&app=webearth2&v=009&udt=20170926'
            },
            {
              layerName: 'cartodb',
              isDefault: false,
              layerType: 'OSM',
              layerUrl: 'https://cartodb-basemaps-{a-d}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
            }
          ]
        })
        map.on('loadMapSuccess', (event) => {
          if (event) {
            Vue.prototype.$map = map;
            map.updateSize();
            const sel = new ol.interaction.PointerEvents();
            map.addInteraction(sel);
          }
        })
      }
    }
  }
</script>
