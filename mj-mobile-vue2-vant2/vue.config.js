const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量  可以自己定义自己的颜色变量,如果多了也可以通过文件来修改
            blue: '#FA6D1D' // 将原来蓝色的全改成  #FA6D1D
            // 'text-color': '#111',
            // 'border-color': '#eee'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // hack: 'true; @import "your-less-file-path.less";'
          }
        }
      }
    }
  }
})
