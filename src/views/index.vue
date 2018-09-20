<template>
  <div class="home">
    <div class="header">
      <span class="title">{{ msg }}</span>
      <ul class="nav-button">
        <li @click="linesClick()">线</li>
        <li @click="subwayClick()">地铁线路图</li>
        <li @click="pathAnalysisClick()">路径分析</li>
      </ul>
      <div  class="user" @click="userheaderClick()">
        <span class="userheader"></span>
      </div>
    </div>
    <div class="index-content-wrap">
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
  .home{
    width:100%;
    height:100%;
    position: relative;
    .header{
      height:60px;
      line-height:60px;
      background: #1b9de8;
      color: #fff;
      padding:0 20px;
      font-size: 18px;
      font-weight: bold;
      font-family: "Microsoft YaHei";
      .title{
        float: left;
      }
      .nav-button {
        float: left;
        margin-left: 400px;
        li {
          width: 100px;
          float: left;
          text-align: center
        }

      }
      .user{
        height: 60px;
        display: inline-block;
        float: right;
      }
      .userheader{
        display: inline-block;
        width: 20px;
        height:20px;
        border-radius: 5px;
        background: #fff;
      }
    }
    .index-content-wrap{
      position: absolute;
      top:60px;
      bottom: 0;
      left: 0;
      width: 100%;
      height:100%;
    }
  }
</style>

<script>
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
    },
    components: {
      // mapShow
    },
    methods: {
      linesClick () {
        this.$router.replace({path: '/lines'})
      },
      subwayClick () {
        this.$router.replace({path: '/subway'})
      },
      pathAnalysisClick () {
        this.$router.replace({path: '/pathAnalysis'})
      },
      userheaderClick () {
        this.$router.replace({path: '/user'})
      }
    }
  }
</script>
