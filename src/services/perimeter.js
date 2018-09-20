import axios from 'axios'

// 图层列表
const getPerimeterLayers = () => {
  return new Promise(resolve => {
    resolve([
      {
        name: '收费站',
        tableName: 'GL_SFZ',
        baseStyle: {
          color: '#4DCE6E',
          selectColor: '#E6301B',
          icon: 'icon-shoufeizhan1'
        }
      },
      {
        name: '服务区',
        tableName: 'GL_FWQ',
        baseStyle: {
          color: '#3bceaa',
          selectColor: '#E6301B',
          icon: 'icon-fuwuqu'
        }
      },
      {
        name: '执法车',
        tableName: 'GL_ZFC',
        baseStyle: {
          color: '#e81356',
          selectColor: '#E6301B',
          icon: 'icon-yunzhengzhifache-kuai'
        }
      },
      {
        name: '摄像机',
        tableName: 'GL_SXJ',
        baseStyle: {
          color: '#1b9de8',
          selectColor: '#E6301B',
          icon: 'icon-shipinjiankongdian'
        }
      },
      {
        name: '情报板',
        tableName: 'GL_QBB',
        baseStyle: {
          color: '#1b9de8',
          selectColor: '#E6301B',
          icon: 'icon-qingbaoban-xian'
        }
      },
      {
        name: '桥梁',
        tableName: 'GL_QL',
        baseStyle: {
          color: '#8DE049',
          selectColor: '#E6301B',
          icon: 'icon-qiaoliang'
        }
      },
      {
        name: '隧道',
        tableName: 'GL_SD',
        baseStyle: {
          color: '#4BD8D7',
          selectColor: '#8DE049',
          icon: 'icon-suidao'
        }
      },
      {
        name: '出入口',
        tableName: 'GL_CRK',
        baseStyle: {
          color: '#a0cec2',
          selectColor: '#E6301B',
          icon: 'icon-churukou'
        }
      },
      {
        name: '气象监测器',
        tableName: 'GL_QXJCQ',
        baseStyle: {
          color: '#937de8',
          selectColor: '#E6301B',
          icon: 'icon-qixiangjiancezhan'
        }
      },
      {
        name: '加油站',
        tableName: 'GL_QCJY',
        baseStyle: {
          color: '#e87935',
          selectColor: '#E6301B',
          icon: 'icon-jiayouzhan2'
        }
      },
      {
        name: '停车区',
        tableName: 'GL_TCQ',
        baseStyle: {
          color: '#e8bd4b',
          selectColor: '#E6301B',
          icon: 'icon-tingchechang'
        }
      },
      {
        name: '急救中心',
        tableName: 'BI_JIJIU',
        baseStyle: {
          color: '#97e86e',
          selectColor: '#E6301B',
          icon: 'icon-yiliao'
        }
      },
      {
        name: '汽车维修',
        tableName: 'BI_QCWX',
        baseStyle: {
          color: '#ac76e8',
          selectColor: '#E6301B',
          icon: 'icon-car-repair'
        }
      },
      {
        name: '车辆检测',
        tableName: 'GL_CLJC',
        baseStyle: {
          color: '#4f89e8',
          selectColor: '#E6301B',
          icon: 'icon-cheliangjianceqi-xian'
        }
      },
      {
        name: '超限站',
        tableName: 'GL_CXZ',
        baseStyle: {
          color: '#13e8af',
          selectColor: '#E6301B',
          icon: 'icon-zhichaozhan1'
        }
      },
      {
        name: '应急物资',
        tableName: 'GL_GOODS',
        baseStyle: {
          color: '#13e8af',
          selectColor: '#E6301B',
          icon: 'icon-wuziku-xian'
        }
      }
    ])
  })
};

/**
 * 获取周边资源列表
 * @param params
 * @returns {*}
 */
const getPerimeterList = (params) => {
  return axios.get('http://58.87.95.84:7300/mock/5b974eaa51241d6b41b178aa/learn-gis/geocoding/circle', {
    params: params,
    baseURL: ''
  }).then(res => {
    let handle_ = {};
    if (res.data && res.data.result && Array.isArray(res.data.result) && res.data.result.length > 0) {
      handle_['count'] = res.data['count']
      handle_['result'] = res.data.result.map(item => {
        let res_ = {
          attributes: item,
          geometry: item['geometry']
        }
        if (res_.attributes.hasOwnProperty('geometry')) {
          delete res_.attributes.geometry
        }
        return res_
      })
    }
    return new Promise(resolve => {
      resolve(handle_)
    })
  })
};

export {
  getPerimeterLayers,
  getPerimeterList
}
