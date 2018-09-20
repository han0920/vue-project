<template>
  <div class="useManagement">
    <div class="user-content-personal-account">
      <!--账号-->
      <div class="personal-account-title">
        <span class="line"></span>
        <span>账号</span>
        <span @click="returnstep()">返回</span>
      </div>
      <div class="person-account-content">
        <el-form  label-width="0" class="personContent">
          <label>邮箱账号</label>
          <span>{{personalDetail.email}}</span>
          <span @click="changeemail(personalDetail.email)">更换</span>
        </el-form>
      </div>
      <div class="person-account-content two">
        <el-form  label-width="0" class="personContent">
          <label>手机号码</label>
          <span>{{personalDetail.mobilenum}}</span>
          <span @click="changephone(personalDetail.mobilenum)">更换</span>
        </el-form>
      </div>
    </div>

    <!--更换手机号-->
    <div class="change-phone" v-show="changePhone">
      <div class="change-phone-main" v-show="!proofShow">
        <div class="change-phone-middle">
          <el-form class="phone-code">
            <el-form-item>
              <el-col :span="17">
                <div>短信验证码已发，请注意查收。</div>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-button type="primary" :plain="true" :disabled="!phoneBtnBool" @click="getCode()" class="return-btn">重新发送{{phoneBtnText}}</el-button>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-input class="yzm" v-model="verificationCode" placeholder="请输入验证码"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="next-btn"  v-show="!proofBtn">
          <span @click="cancel">取消</span>
          <span @click="next">下一步</span>
        </div>
        <div class="next-btn" v-show="proofBtn">
          <span @click="cancel">取消</span>
          <span @click="sure()">确定</span>
        </div>
      </div>
      <div class="change-phone-main" v-show="proofShow">
        <div class="change-phone-middle">
          <el-form class="phone-code">
            <el-form-item>
              现在请设置新的手机号
            </el-form-item>
            <el-form-item>
              <el-input class="yzm" v-model="newphone" placeholder="请输入新手机号"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="next-btn">
          <span @click="cancel">取消</span>
          <span @click="proof()">验证</span>
        </div>
      </div>
    </div>

    <!--更换邮箱-->
    <div class="change-phone" v-show="changeQQ">
      <div class="change-phone-main" v-show="!proofShow">
        <div class="change-phone-middle">
          <el-form class="phone-code">
            <el-form-item class="change-qq">
              邮箱验证已发送，去<span>查收</span>或<span @click="returnsend">重新发送</span>
            </el-form-item>
            <el-form-item>
              <el-input class="yzm" v-model="verificationCode" placeholder="请输入验证码"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="next-btn">
          <span @click="cancel">取消</span>
          <span @click="nextemail">下一步</span>
        </div>
      </div>
      <div class="change-phone-main" v-show="proofShow">
        <div class="change-phone-middle">
          <el-form class="phone-code">
            <el-form-item>
              现在请设置新的邮箱账号
            </el-form-item>
            <el-form-item>
              <el-input class="yzm" v-model="newEmailaccounts" placeholder="请输入新邮箱账号"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="next-btn">
          <span @click="cancel">取消</span>
          <span @click="sureEmail()">确定</span>
        </div>
      </div>
    </div>

    <!--验证旧密码，更改密码-->
    <div class="user-content-personal-password">
      <!--密码-->
      <div class="personal-account-title">
        <span class="line"></span>
        <span>密码</span>
      </div>
      <div class="personal-password-content">
        <el-form  :model="form"  ref="form" :rules="passwordrules" label-width="0" class="personContent">
          <el-form-item  prop="olduserPwd">
            <el-col :span="3">
              <div class="name">旧密码</div>
            </el-col>
            <el-col :span="8">
              <el-input type="password" v-model="form.olduserPwd" auto-complete="off" class="perInput"></el-input>
            </el-col>
            <el-col :span="2">
              <span class="icon iiconfont iicon-zhengquetishi noticeStatic" :class="[form.zqtsoldpwd === true ? 'sureColor': '']" v-show="form.zqtsoldpwd"></span>
            </el-col>
          </el-form-item>
          <el-form-item  prop="userPwd">
            <el-col :span="3">
              <div class="name">新密码</div>
            </el-col>
            <el-col :span="8">
              <el-input type="password" placeholder="密码 (6-12个字符，包含字母/数字/下划线)" v-model="form.userPwd" auto-complete="off" class="perInput"></el-input>
            </el-col>
            <el-col :span="2">
              <span class="icon iiconfont iicon-zhengquetishi noticeStatic" :class="[form.zqtsuserpwd === true ? 'sureColor': '']" v-show="form.zqtsuserpwd"></span>
            </el-col>
          </el-form-item>
          <el-form-item prop="rePwd">
            <el-col :span="3">
              <div class="name">确认密码</div>
            </el-col>
            <el-col :span="8">
              <el-input type="password" v-model="form.rePwd" auto-complete="off" class="perInput"></el-input>
            </el-col>
            <el-col :span="2">
              <span class="icon iiconfont iicon-zhengquetishi noticeStatic"  :class="[form.zqtsrepwd === true ? 'sureColor': '']" v-show="form.zqtsrepwd"></span>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="3">&nbsp;
            </el-col>
            <el-col :span="8">
              <button class="save" @click="save">保 存</button>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="scss" type="text/scss">
  .useManagement{
    .user-content-personal-account{
      height:400px;
      box-shadow: 0 0 10px #dedede;
      background: #fff;
      .personal-account-title{
        height: 59px;
        line-height: 59px;
        border-bottom: 1px solid #f2f2f2;
        padding: 0 20px;
        position: relative;
        span{
          display: inline-block;
          font-weight: bold;
          font-size: 14px;
          color: #8c8c8c;
          font-family: "Microsoft YaHei";
          &:nth-child(2){
            padding-left:10px;
          }
        }
        .line{
          display: inline-block;
          height: 14px;
          width: 4px;
          /*border-left:2px solid #46aaff;*/
          background: #46aaff;
          position: absolute;
          margin-top: 23px;
        }

      }
      .person-account-content{
        width:965px;
        height: 179px;
        /*margin:auto;*/
        border-bottom: 1px solid #f2f2f2;
        .personContent{
          width: 100%;
          height: 179px;
          line-height: 179px;
          label,span{
            font-family: "Microsoft YaHei";
            font-size: 14px;
          }
          label{
            margin-left: 60px;
            color: #747474;
            margin-right: 46px;
          }
          span{
            &:nth-child(2){
              color: #2a2a2a;
              margin-right: 120px;
            }
            &:nth-child(3){
              display: inline-block;
              width: 46px;
              height: 25px;
              border: 1px solid #46aaff;
              border-radius: 4px;
              text-align: center;
              line-height: 25px;
              color: #46aaff;
              font-size: 13px;
              font-family: "Microsoft YaHei";
              cursor: pointer;
              &:hover{
                background: #46aaff;
                color: #fff;
              }
            }
          }
          /*.el-form-item{*/
          /*margin-bottom: 0 !important;*/
          /*height: 179px;*/
          /*}*/
        }
        .el-form-item__content{
          line-height: 179px!important;
        }
      }
      .two{
        border-bottom:none !important;
      }
    }
    .user-content-personal-password{
      height:400px;
      margin-top:20px;
      box-shadow: 0 0 10px #dedede;
      background: #fff;
      .personal-account-title{
        height: 59px;
        line-height: 59px;
        border-bottom: 1px solid #f2f2f2;
        padding: 0 20px;
        position: relative;
        span{
          display: inline-block;
          font-weight: bold;
          font-size: 14px;
          color: #8c8c8c;
          font-family: "Microsoft YaHei";
          &:nth-child(2){
            padding-left:10px;
          }
        }
        .line{
          display: inline-block;
          height: 14px;
          width: 4px;
          /*border-left:2px solid #46aaff;*/
          background: #46aaff;
          position: absolute;
          margin-top: 23px;
        }

      }
      .personal-password-content{
        .personContent{
          /*width: 500px;*/
          /*text-align: center;*/
        }
        .sureColor{
          color: #46aaff;
        }
        .save{
          width: 100%;
          height:46px;
          color: #fff;
          font-size: 18px;
          margin-left: 30px;
          background: #46aaff;
          border:none;
          border-radius: 4px;
          cursor: pointer;
          &:hover{
            background: #309bf5;
          }
        }
        .el-form-item{
          margin-bottom: 20px!important;
          .el-form-item__error{
            left:150px;
          }
          &:nth-child(1) {
            margin-top: 40px;
          }
          .name{
            text-align: right;
          }
          .perInput{
            margin-left: 30px;
            font-size:13px;
            color:#2a2a2a!important;
            margin-right:20px;
            ::-webkit-input-placeholder { /* WebKit browsers */
              　　color: #bbb!important;
            }
            　　:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              　　color: #bbb!important;
            }
            　　::-moz-placeholder { /* Mozilla Firefox 19+ */
              　　color: #bbb!important;
            }
            　　:-ms-input-placeholder { /* Internet Explorer 10+ */
              　　color: #bbb!important;
            }
          }
          .perInput:focus{
            background: #fff!important;
          }
          .noticeStatic{
            margin-left: 50px;
            font-size: 22px;
          }
        }
      }
    }
    .change-phone{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: rgba(0, 0, 0, 0.22);
      .change-phone-main{
        width: 510px;
        height: 345px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        border-radius: 10px;
        box-shadow: 0 0 24px rgba(0, 0, 0, 0.13);
        .change-phone-middle{
          .phone-code{
            width:290px;
            margin:120px auto;
            .change-qq{
              span{
                color: #46aaff;
              }
            }
            .return-btn{
              padding:0;
              border:none;
            }
            .yzm{
              .el-input__inner{
                height: 46px !important;
              }
            }
          }
        }
        .next-btn{
          position: absolute;
          right: 20px;
          bottom:20px;
          span{
            display: inline-block;
            width:74px;
            height:36px;
            line-height: 36px;
            text-align: center;
            border-radius: 4px;
            &:hover{
              cursor: pointer;
            }
            &:nth-child(2){
              background: #46aaff;
              color: #fff;
              &:hover{
                background: #309bf5;
              }
            }
          }
        }
      }

    }
  }
</style>
<script>
//  import {mapState} from 'vuex'
//  import * as api from '../store/api'
  export default{
    data () {
      var validateolduserPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
          this.form.zqtsoldpwd = false
        } else if (value === this.userDetail.userPwd) {
          callback()
          this.form.zqtsoldpwd = true
        } else {
          callback(new Error('输入密码与原设置密码不符'))
        }
      }

      var validateuserPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
          this.form.zqtsuserpwd = false
        } else if (value === this.form.olduserPwd) {
          callback(new Error('输入的新密码不能与旧密码一样!'))
          this.form.zqtsuserpwd = false
        } else {
          callback()
          this.form.zqtsuserpwd = true
        }
      }

      var validaterePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'))
          this.form.zqtsrepwd = false
        } else if (value !== this.form.userPwd) {
          callback(new Error('两次输入密码不一致!'))
          this.form.zqtsrepwd = false
        } else {
          callback()
          this.form.zqtsrepwd = true
        }
      }
      return {
        input: '',
        verificationCode: '',  // 验证码
        newphone: '',          // 新手机号
        newEmailaccounts: '',  // 新邮箱
        phoneBtnText: '',     // 倒计时数字
        proofShow: false,    // 显示内容 选则
        proofBtn: false,    // 手机号验证之后 按钮显示与隐藏
        phoneBtnBool: true,  // 验证码倒计时显示
        changePhone: false, // 更换手机
        changeQQ: false,   // 更换邮箱
        form: {
          olduserPwd: '',
          userPwd: '',
          rePwd: '',
          zqtsoldpwd: false,     // 旧密码，更改密码等正确提示显示
          zqtsuserpwd: false,
          zqtsrepwd: false
        },
        passwordrules: {
          olduserPwd: [
            {validator: validateolduserPwd, trigger: 'blur'}
          ],
          userPwd: [
            {validator: validateuserPwd, trigger: 'blur'}
          ],
          rePwd: [
            {validator: validaterePwd, trigger: 'blur'}
          ]
        },
        personalDetail: '', // 个人信息
        messageId: '', // 短信key
        mailKey: '' // 邮箱key
      }
    },
    components: {
    },
    computed: {
//      ...mapState({
//        userDetail: state => state.signIn.user
//      })
    },
    mounted () {
      this.perdetails()
    },
    methods: {
      returnstep () {
        this.$router.replace({path: '/home'})
      },
      // 个人信息
      perdetails () {
//        api.getPersonalInfo(this.userDetail.userId).then(res => {
//          this.personalDetail = res.data.returnData[0]
//        })
      },
      cancel () {
        this.changePhone = false
        this.changeQQ = false
        this.proofShow = false
        this.proofBtn = false
        this.verificationCode = ''
      },
      next () {
//        let params = {
//          code: this.verificationCode,
//          messageId: this.messageId
//        }
        // 验证手机号
//        api.checkJsms(params).then(res => {
//          if (res.data.code === 0) {
//            this.proofShow = true
//          }
//        })
      },
      nextemail () {
//        let params = {
//          code: this.verificationCode,
//          mailKey: this.mailKey
//        }
        // 验证邮箱验证码
//        api.checkEmail(params).then(res => {
//          if (res.data.code === 0) {
//            this.proofShow = true
//          }
//        })
      },
      proof () {
        this.proofShow = false
        this.proofBtn = true
        this.getCode()
        // 修改新的手机号
        this.jsmss(this.newphone)
        this.verificationCode = ''
      },
      sure () {
        // 验证手机号
//        let params = {
//          code: this.verificationCode,
//          messageId: this.messageId
//        }
//        api.checkJsms(params).then(res => {
//          if (res.data.code === 0) {
//            let userDetail = {
//              mobileNum: this.newphone,
//              id: this.userDetail.userId
//            }
//            api.updateUser(userDetail).then(res => {
//              if (res.data.code === 0) {
//                this.perdetails()
//                this.changePhone = false
//                this.changeQQ = false
//                this.proofShow = false
//                this.proofBtn = false
//              }
//            })
//          }
//        })
      },
      sureEmail () {
        // 修改新的邮箱
//        let userDetail = {
//          email: this.newEmailaccounts,
//          id: this.userDetail.userId
//        }
//        api.updateUser(userDetail).then(res => {
//          if (res.data.code === 0) {
//            this.perdetails()
//            this.changePhone = false
//            this.changeQQ = false
//            this.proofShow = false
//            this.proofBtn = false
//          }
//        })
      },
      // 手机号验证码
      jsmss (phone) {
//        api.jsms(phone).then(res => {
//          if (res.data.code === 0) {
//            this.messageId = res.data.returnData[0].messageId
//          }
//        })
      },
      // 邮箱验证码
      emailSend (email) {
//        api.emailSend(email).then(res => {
//          if (res.data.code === 0) {
//            this.mailKey = res.data.returnData[0].mailCode
//          }
//        })
      },
      changephone (phone) {
        this.changePhone = true
        this.proofShow = false
        this.getCode()
        // 手机验证码
        this.jsmss(phone)
      },
      changeemail (email) {
        this.changeQQ = true
        this.emailSend(email)
      },
      returnsend () {
        this.emailSend(this.personalDetail.email)
      },
      save () {
        // 表单验证方法
        var self = this
        self.$refs.form.validate(function (result) {
          if (result) {
//            let params = {
//              id: self.userDetail.userId,
//              oldPwd: self.form.olduserPwd,
//              newPwd: self.form.userPwd,
//              rePwd: self.form.rePwd
//            }
//            api.updatePwd(params).then(res => {
//            })
          } else {
          }
        })
      },
      // 60秒 之后可以重新发送验证码信息
      getCode () {
        if (this.phoneBtnBool) {
          this.phoneBtnBool = false
          this.phoneBtnText = 60
          let timer = setInterval(() => {
            this.phoneBtnText = this.phoneBtnText - 1
          }, 1000)
          setTimeout(() => {
            this.phoneBtnBool = true
            this.phoneBtnText = ''
            clearInterval(timer)
          }, 1000 * 60)
        }
      }
    }
  }
</script>
