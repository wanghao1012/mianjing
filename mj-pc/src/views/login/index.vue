<template>
  <div class="login-page">
    <el-card>
      <!-- 卡片标题,使用具名插槽 -->
      <template #header>黑马面经后台管理系统</template>
      <!-- 卡片内容,默认插槽,不用嵌套template -->
      <!-- :model="user" 如果没有这个的话即便输入框有内容也会被判定为内容为空 -->
      <!-- :rules="rules" 这个是做表单验证的 -->
      <!-- 在这段代码中， :model="user"是将表单的数据绑定到 Vue 实例中的 user对象上。通过这种绑定，当用户在输入框中输入内容时， user.username的值也会自动更新。 而 prop="username"
           则是用于表单验证的属性。它指定了表单项的验证规则和错误提示信息。通过指定 prop属性为 "username"，你可以在 rules对象中定义针对该表单项的验证规则。这样，当用户提交表单时，Vue 会根据这些规则进行验证，并在验证失败时显示相应的错误提示信息。
           综上所述， :model="user"是用于绑定表单数据的，而 prop="username"则是用于表单验证的属性，指定了该表单项的验证规则。 -->
      <el-form ref="form" :model="user" :rules="rules">
        <!-- 这里的 prop="username" prop="password" 是文字前面的星-->
        <el-form-item label="用户" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
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
      //
      user: {
        username: 'admin',
        password: 'admin'
      },
      // 验证规则
      rules: {
        // required 表示必填项   message 表示验证不通过时的提示    trigger表示触发条件
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3,
            max: 6,
            message: '长度在 3 到 6 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 6,
            message: '长度在 3 到 6 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 完整校验
      this.$refs.form.validate(async valid => {
        console.log(valid) // 验证通过  true   验证不通过  false
        if (valid) {
          try {
            // 验证通过,提交数据
            // console.log(this.user)
            const res = await loginApi(this.user)
            console.log(res)
            this.$message.success('登录成功') // 轻提示
            // 存token
            // localStorage.setItem('mj-pc-token', res.data.token)
            // 将token存到vuex组件中
            this.$store.commit('user/upDateToken', res.data.token)
            // 跳转
            this.$router.push('/dashboard')
          } catch (e) {
            // console.log(error)
            if (e.response) {
              this.$message.error(e.response.data.message)
            } else {
              this.$message.error('登录错误')
            }
          }
        }
      })
    },
    reset () {
      // 重置表单   恢复初始值
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center;
  background-size: cover; //铺满整个屏幕
  //使用element-ui  组件名就是类名
  .el-card {
    width: 420px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    // 样式穿透,用于修改子组件的样式
    ::v-deep.el-card__header {
      text-align: center;
      background-color: #727cf5;
      color: #fff;
      height: 80px;
      line-height: 40px;
    }
    .el-form {
      padding: 0 20px;
    }
    .button {
      text-align: center;
    }
  }
}
</style>
