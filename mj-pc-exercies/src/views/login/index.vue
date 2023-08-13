<template>
  <div class="login-page">
    <el-card>
      <!-- 具名插槽 存放头部 -->
      <template #header>黑马面经运营后台</template>
      <!-- 默认插槽 -->
      <el-form ref="form" :model="user" :rules="rules">
        <el-form-item label="用户" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button @click="resetForm">重置</el-button></el-form-item
        >
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { loginApi } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate(async valid => {
        // 表单内容符合验证规则则返回 true (不判断用户名和密码的正确与否)
        if (valid) {
          try {
            // console.log(this.user)
            const res = await loginApi(this.user)
            // console.log(res)
            this.$message.success('登录成功') // 提示登录成功
            // localStorage.setItem('mj-pc-exercies-token', res.data.token) // 将token存储到本地
            this.$store.commit('user/updateToken', res.data.token)
            this.$router.push('/dashboard') // 跳转到首页
          } catch (error) {
            // console.log(error)
            if (error.response) {
              this.$message.error(error.response.data.message)
            } else {
              this.$message.error('登录失败')
            }
          }
        }
      })
    },
    resetForm () {
      // 重置表单  将表单里的内容重置为初始值
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center;
  background-size: cover;
  .el-card {
    width: 420px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    ::v-deep .el-card__header {
      height: 80px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background: rgba(114, 124, 245, 1);
    }
  }
}
</style>
