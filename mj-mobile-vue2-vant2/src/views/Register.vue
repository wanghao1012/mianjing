<template>
  <div class="register-page">
    <!-- 标题 -->
    <van-nav-bar title="面经注册" />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="请输入用户名"
        :rules="userRules"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^\S{6,20}$/, message: '请输入6~20位的密码' }
        ]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <!-- 超链接 -->
    <router-link to="/login" class="link">已有账号,去登录</router-link>
  </div>
</template>

<script>
// 导入配置好的request.js
// import request from '@/utils/request'

// 导入API方法
import { registerAPI } from '@/api/user'
export default {
  name: 'register-page',
  data () {
    return {
      username: '',
      password: '',
      userRules: [
        // required 必须表示用户名必填
        { required: true, message: '请填写用户名' },
        // 使用正则验证,验证用户名6~10位的数字字母下划线的组合
        { pattern: /^\w{6,10}$/, message: '请输入6~10位的用户名' }
      ]
    }
  },
  methods: {
    // 点击注册时  执行   values 就是收集到的表单结果username 和 password
    async onSubmit (values) {
      try {
        // console.log('submit', values)
        await registerAPI(values)
        // request({
        //   method: 'post',
        //   url: '/h5/user/register',
        //   data: values
        // })
        // console.log(res)
        this.$toast('注册成功') // 提示
        setTimeout(() => {
          this.username = this.password = '' // 重置表单
          this.$router.push('/login') // 通过编程式导航   注册成功跳转
        }, 2000)
      } catch (err) {
        // console.log(err)
        if (err.response) {
          this.$toast(err.response.data.message) // 当有响应的结果时,提示响应中的信息
        } else {
          this.$toast('注册失败') // 当没有响应结果时提示注册失败
        }
      }
    }
  }
  // mounted () {
  //   // this.$toast('登录成功')
  //   // this.$toast.success('登录成功')
  //   this.$toast.fail('登录失败')
  // }
}
</script>

<style lang="less" scoped>
.link {
  float: right;
  margin-right: 20px;
  font-size: 14px;
}
</style>
