import PathAnalysisServiceCN from './pathAnalysisServiceCN'
import ExtractPoints from './extractPointService'
import axios from 'axios'
const NETWORK = ''
export default {
  methods: {

    /**
     * 获取查询参数
     * @param _coordinates
     * @returns {{type: string, features: Array, doNotLocateOnRestrictedElements: boolean}}
     * @private
     */
    _getQueryParams (_coordinates) {
      const esriJSON = {
        'type': 'features',
        'features': [],
        'doNotLocateOnRestrictedElements': true
      }
      const _code = this._getMapProj(true)
      _coordinates.forEach(_item => {
        esriJSON.features.push({
          'geometry': {
            'x': _item[0],
            'y': _item[1],
            'spatialReference': {
              'wkid': _code,
              'latestWkid': _code
            }
          }
        })
      })
      return esriJSON
    },

    /**
     * 获取规避点
     * @param barriers
     * @returns {{type: string, features: Array, doNotLocateOnRestrictedElements: boolean}}
     * @private
     */
    _getBarriers (barriers) {
      const esriJSON = {
        'type': 'features',
        'features': [],
        'doNotLocateOnRestrictedElements': true
      }
      const _code = this._getMapProj(true)
      barriers.forEach(_item => {
        esriJSON.features.push({
          'geometry': {
            'x': _item[0],
            'y': _item[1],
            'spatialReference': {
              'wkid': _code,
              'latestWkid': _code
            }
          }
        })
      })
      return esriJSON
    },

    /**
     * 查询数据
     * @param _coordinates
     * @param barriers
     * @param type
     * @private
     */
    _loadPathsData (_coordinates, barriers, type) {
      const params_ = {
        f: 'json',
        returnDirections: true,
        returnRoutes: true,
        returnStops: false,
        outputLines: 'esriNAOutputLineTrueShape',
        directionsLengthUnits: 'esriNAUKilometers',
        directionsLanguage: 'en',
        stops: JSON.stringify(this._getQueryParams(_coordinates))
      }
      if (barriers != null) {
        params_['barriers'] = JSON.stringify(this._getBarriers(barriers))
      }
      const querytype = {'best': '距离最短', 'nothigh': '不走高速', 'short': '距离最短'}
      return axios.get(NETWORK + '/' + querytype[type] + '/solve', {
        params: params_
      }).then(res => {
        return Promise((resolve, reject) => {
          const directions = res.data.directions
          if (directions && directions.length > 0) {
            const feats = directions[0].features
            const newFeats = feats.filter((element) => {
              let compressgeometry = element['compressedGeometry']
              if (compressgeometry !== null && compressgeometry !== '') {
                let frontstr = '+0+1+2'
                let startindex = compressgeometry.indexOf(frontstr)
                if (startindex < 0) {
                  startindex = 0
                } else {
                  startindex = 6
                }
                let lastindex = compressgeometry.indexOf('|')
                if (lastindex < 0) {
                  lastindex = compressgeometry.length
                }
                compressgeometry = compressgeometry.substring(startindex, lastindex)
                let extractPoints = new ExtractPoints()
                let coordArr = extractPoints.getPoints(compressgeometry)
                element['geometry'] = {}
                element['geometry']['paths'] = [coordArr]
                element['attributes'] = element['attributes']
                let pathAnalysisServiceCN = new PathAnalysisServiceCN()
                let translation = pathAnalysisServiceCN.directionTranslation(element['attributes']['text'])
                element['attributes']['text'] = translation['chinese'] || translation['english']
                delete element.compressedGeometry
                return element
              }
            })
            resolve({
              routers: newFeats, // 路段列表
              lines: res.data.routes.features, // 整条线空间数据
              length: directions[0].summary.totalLength.toFixed(3) // 路线长度
            })
          }
        })
      })
    },

    /**
     * 获取地图投影code
     * @param isGetCode
     * @returns {string}
     * @private
     */
    _getMapProj (isGetCode) {
      if (isGetCode) {
        return this.$map.getView().getProjection().getCode().split(':')[1]
      } else {
        return this.$map.getView().getProjection().getCode()
      }
    }
  }
}
