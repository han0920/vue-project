<template>
  <div class="login">
    <div class="elform">
      <div class="elformimg">
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-width="0" class="demo-ruleForm">
        <el-form-item prop="userName">
          <el-input class="insInfo" v-model="form.userName" placeholder="用户名/邮箱/手机号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input class="insInfo" type="password" v-model="form.userPwd" placeholder="密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="11">
            <el-form-item>
              <el-input class="yzm"  placeholder="填写验证码" v-model="form.verificationCode" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item class="yzmImg">
              <img :src="'data:image/jpeg;base64,' + code" @click="reClick()">
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" class="sign-btn">登 录</el-button>
        </el-form-item>
        <el-form-item class="forget">
          <el-col :span="4">
            <el-form-item>
              <el-checkbox class="elCheckbox" v-model="form.isRemeberPwd">记住密码</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="16">&nbsp;</el-col>
          <el-col :span="4">
            <el-form-item>
              <span class="forgetpass">忘记密码</span>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="go-signup">
        还没有账号？<router-link to="/signup">注册新账号</router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" type="text/scss">
  $fontFamily:"Microsoft YaHei"!important;
  .login {
    width: 100%;
    height: 100%;
    .elform {
      /*width: 360px;*/
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .elformimg {
        padding: 30px 0;
      }
      .three-login {
        font-size: 12px;
        margin: auto;
        .three-login-text {
          display: inline-block;
          .line{
            color: #c0c0c0;
            margin-right: 10px;
          }
          .otherLogin{
            font-size: 13px;
            font-family: $fontFamily;
            color: #bbb;
            margin-right: 10px;
          }
        }
      }
      .signupGo{
        text-align: right;
      }
      .go-signup {
        /*margin-top: 12px;*/
        margin-bottom:14px;
        font-size: 13px;
        color: #747474;
        font-family: $fontFamily;
        a {
          color: #46aaff;
          cursor: pointer;
          &:hover{
            color: #309bf5;
            text-decoration: none;
          }
        }
      }
    }
  }
  .el-form-item{
    margin-bottom: 30px!important;
  }
  .insInfo input{
    width: 360px!important;
  }
  .insInfo input,.yzm input,.yzmImg{
    height: 46px!important;
    line-height: 46px!important;
    padding-left: 15px!important;
    color: #2a2a2a;
    border-radius: 4px!important;
    border-color: #b4b4b4!important;
  }
  .yzm input,.yzmImg{
    width: 165px!important;
  }
  .yzmImg{
    margin-left: 30px!important;
    padding-left: 0!important;
    .el-form-item__content{
      width: 100%!important;
      height: 100%!important;
      line-height: 46px!important;
      img{
        text-align: center!important;
        vertical-align: middle!important;
      }
    }
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    font-size: 14px!important;
    font-family: $fontFamily;
    color: #bbbbbb!important;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    font-size: 14px!important;
    font-family: $fontFamily;
    color: #bbbbbb!important;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    font-size: 14px!important;
    font-family: $fontFamily;
    color: #bbbbbb!important;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    font-size: 14px!important;
    font-family: $fontFamily;
    color: #bbbbbb!important;
  }
  .sign-btn{
    width: 360px!important;
    height: 46px!important;
    border-radius: 4px!important;
    background: #46aaff;
    font-size: 16px!important;
    font-family: $fontFamily;
    color: #fff!important;
    &:hover{
      background: #309bf5!important;
    }
  }
  .el-checkbox__label,.forgetpass{
    font-size: 13px!important;
    color: #747474!important;
    cursor: pointer!important;
    font-family: $fontFamily;
    &:hover{
      color: #46aaff!important;
    }
  }
  .el-checkbox__inner{
    width: 14px!important;
    height: 14px!important;
    border-radius: 1px!important;
    &:after{
      left: 3px!important;
      top: 0!important;
    }
  }
  .forget{
    margin-bottom: 0!important;
  }
  .elCheckbox{
    .el-checkbox__label{
      margin-left: 5px!important;
    }
  }
</style>
<script>
  import { mapState } from 'vuex'
  import * as api from '../store/api'
//  import {cookies} from '../assets/js/util/utils'
  //  import ajax from 'ajax'
  export default{
    name: 'singIn',
    data () {
      var validateuser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        img: '',
        code: '',
        form: {
          userName: '',
          userPwd: '',
          verificationCode: '',
          isRemeberPwd: false,
          capSign: ''
        },
        rules: {
          userName: [
            {validator: validateuser, trigger: 'blur'}
          ],
          userPwd: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
        token: 'token'
      }
    },
    mounted () {
      this.reClick()
//      this.form.userName = cookies.get('username')
//      this.form.userPwd = cookies.get('userpwd')
//      this.form.isRemeberPwd = Boolean(cookies.get('isremeberpwd'))
    },
    computed: {
      ...mapState({
        sqUrl: state => state.signIn.sqUrl
      })
    },
    methods: {
      reClick () {
        api.getVerificationCode().then(res => {
          if (res.data.code === 0) {
            this.code = res.data.returnData[0].code
            this.form.capSign = res.data.returnData[0].capSign
          }
        })
      },
      submitForm () {
        // 表单验证方法
        var self = this
        this.$refs.form.validate(function (result) {
          if (result) {
            // 验证通过
//            /* global md5 */
            if (self.form.isRemeberPwd === true) {
              self.form.isRemeberPwd = 1
//              cookies.set('isremeberpwd', true)
//              cookies.set('userpwd', self.form.userPwd, 3)
//              cookies.set('username', self.form.userName, 3)
            } else {
              self.form.isRemeberPwd = 0
//              cookies.delete('userpwd')
//              cookies.delete('username')
//              cookies.delete('isremeberpwd')
            }
            let username = self.form.userName
//            let userpwd = md5(self.form.userPwd)
            let userpwd = self.form.userPwd
            let isremeberpwd = self.form.isRemeberPwd
            let verificationCode = self.form.verificationCode
            let capSign = self.form.capSign
            let params = {
              userName: username,
              userPwd: userpwd,
              isRemeberPwd: isremeberpwd,
              verificationCode: verificationCode,
              capSign: capSign
            }
            api.signIn(params).then(res => {
              self.$router.replace({path: '/index'})
            })
          } else {
          }
        })
      }
    },
    components: {}
  }
</script>
