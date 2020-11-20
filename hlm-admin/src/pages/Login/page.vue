<template>
  <div class="login-page">
    <div class="layer bg" id="login"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img src="./image/logo.png" alt="logo">
      </div>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin">
            <el-form-item  prop="userNum">
              <el-input type="text" v-model="formLogin.userNum" placeholder="用户名">
                <i slot="prepend" class="iconfont icon-user"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="userPassword">
              <el-input type="password" v-model="formLogin.userPassword" placeholder="密码">
                <i slot="prepend" class="iconfont icon-password"></i>
              </el-input>
            </el-form-item>
            <!--<el-form-item prop="code">-->
              <!--<el-input type="text" v-model="formLogin.code" placeholder="- - - -">-->
                <!--<template slot="prepend">验证码</template>-->
                <!--<template slot="append">-->
                  <!--<img class="login-code" src="./image/login-code.png">-->
                <!--</template>-->
              <!--</el-input>-->
            <!--</el-form-item>-->
            <el-button @click="submit" type="primary" class="button-login">登录</el-button>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
require('particles.js')
import config from './config/default'
import { mapActions } from 'vuex'
import util from '@/libs/util.js'
export default {
  data () {
    return {
      // 表单
      formLogin: {
        userNum: '',
        userPassword: '',
        //code: 'v9am'
      },
      // 校验
      rules: {
        userNum: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 初始化粒子插件
    particlesJS('login', config)
  },
  methods: {
    ...mapActions([
      'd2adminLogin'
    ]),
    /**
     * @description 提交表单
     */
    // 提交登陆信息
    submit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 登陆
          this.d2adminLogin({
            vm:this,
            vo:this.formLogin
          });
          //util.cookies.set('token',`${ this.formLogin.userNum}|${ this.formLogin.userNum }`,{expires:null});
          // 设置侧边栏菜单
          // this.$store.commit('d2adminUserInfoSet', {
          //   name:this.formLogin.userNum,
          // })
          //this.$router.push('/');
        } else {
          // 登陆表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
