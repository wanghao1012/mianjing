<template>
  <div id="app">
    <!-- 表示只缓存主页；layout-page是Home.vue里面的name属性值 -->
    <!-- 只缓存主页，则其他的登录、注册、详情就不会缓存 -->
    <keep-alive :include="['layout-page']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped></style>
