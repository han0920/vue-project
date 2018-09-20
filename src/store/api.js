import axios from 'axios'
/**
 * 数据格式转换方法
 */
// import qs from 'qs'

const WEBAPP = 'https://www.easy-mock.com/mock/5966e42b88b970677e524180'
const baseURL = 'http://192.168.0.226:7004/'

const defaults = {
  baseURL: baseURL,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

Object.assign(axios.defaults, defaults)

// 列表页面
export const listName = params => {
  // let _params = qs.stringify(params)
  return axios.get('/API/searchWaterSourcesList', {
    baseURL: WEBAPP
  })
}

export const signIn = params => {
  return axios.get('API/userlogin', {
    baseURL: WEBAPP
  })
}

// 测试点  点的信息
export const point = params => {
  return axios.get('API/point', {
    baseURL: WEBAPP
  })
}

// 验证码
export const getVerificationCode = () => {
  return axios.get('kaptcha/getKaptchaImage', {
    baseURL: baseURL
  })
}

// 修改密码
export const updatePwd = _params => {
  _params = 'id=' + _params.id + '&' + 'oldPwd=' + _params.oldPwd + '&' + 'newPwd=' + _params.newPwd + '&' + 'rePwd=' + _params.rePwd
  return axios.post(`user/updatePwd?${_params}`, '', {
    baseURL: baseURL,
    responseType: 'application/json',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 手机号发送短信验证
export const jsms = phone => {
  return axios.post(`send/jsms?phoneNum=${phone}&tempId=1`, '', {
    baseURL: baseURL,
    responseType: 'application/json',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 验证短信验证码
export const checkJsms = _params => {
  return axios.post(`send/checkJsms?code=${_params.code}&messageId=${_params.messageId}`, '', {
    baseURL: baseURL,
    responseType: 'application/json',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 发送邮件验证码
export const emailSend = email => {
  return axios.post(`send/email?toEmail=${email}`, '', {
    baseURL: baseURL,
    responseType: 'application/json',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 验证发送邮件验证码
export const checkEmail = _params => {
  return axios.post(`send/checkEmail?code=${_params.code}&mailKey=${_params.mailKey}`, '', {
    baseURL: baseURL,
    responseType: 'application/json',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 获取个人信息
export const getPersonalInfo = userId => {
  return axios.post(`user/getPersonalInfo?userId=` + userId, '', {
    baseURL: baseURL,
    responseType: 'application/json',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 更改用户信息
export const updateUser = _params => {
  _params = JSON.stringify(_params)
  return axios.post(`user/update`, _params, {
    baseURL: baseURL,
    responseType: 'application/json',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 获取线的json数据
// export const addFeature = () => {
//   return axios.get('lines.json', {
//     baseURL: './static/json/'
//   })
// }
export const addFeature = () => {
  return axios.get('http://58.87.95.84:7300/mock/5b974eaa51241d6b41b178aa/learn-gis/getpolylines')
}

// arcgis 服务数据
export const arcgis = () => {
  return axios.get('http://211.101.37.251:6080/arcgis/rest/services/HeNan/HNmapNEW16/MapServer?f=pjson')
}
// 获取subway数据
export const subway = () => {
  return axios.get('subway.json', {
    baseURL: './static/json/'
  })
}
