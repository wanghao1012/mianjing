<template>
  <div class="login-page">
    <!-- 标题 -->
    <van-nav-bar title="面经登录" />
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
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- 超链接 -->
    <router-link to="/register" class="link">注册账号</router-link>
  </div>
</template>

<script>
import { loginAPI } from '@/api/user'
export default {
  name: 'login-page',
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
    async onSubmit (values) {
      // console.log('submit', values)
      try {
        const { data: res } = await loginAPI(values)
        // this.$toast('登录成功')
        // console.log(data)

        // 将token存储到本地
        localStorage.setItem('mobile-token', res.data.token) // 存储tojen

        this.$toast('登录成功') // 提示
        setTimeout(() => {
          this.username = this.password = ''
          this.$router.push('/home')
        }, 1000)
      } catch (err) {
        // console.log(err)
        if (err.response) {
          this.$toast(err.response.data.message)
        } else {
          this.$toast('登录失败')
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
