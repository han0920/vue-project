const NETWORK = '';

// 路径分析
const pathAuto = '/pathAuto.json';
const queryPoint = '/queryPoint.json';
export {
  NETWORK,
  pathAuto,
  queryPoint
}
import axios from 'axios'
import jsonp from 'jsonp'
import qs from 'qs'

const pathAnalysisAutoFetch = () => {
  return axios.get(pathAuto, {
    baseURL: './static/json/'
  })
};
const pathAnalysisGetPathsData = (_params, url, callback) => {
  let params = qs.stringify(_params);
  jsonp(NETWORK + url + params, callback)
};
const pathAnalysisQueryPoint = (coordinates) => {
  return axios.get(queryPoint, {
    params: {
      coordinates: coordinates
    },
    baseURL: './static/json/'
  }).then(res => {
    return new Promise(resolve => {
      let $Res = {}
      if (res.data.data) {
        $Res.attributes = res.data.data.attributes
        $Res.geometry = coordinates
      }
      resolve($Res)
    })
  })
};

export {
  pathAnalysisAutoFetch,
  pathAnalysisGetPathsData,
  pathAnalysisQueryPoint
}
