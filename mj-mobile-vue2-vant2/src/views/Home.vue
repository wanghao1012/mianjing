<template>
  <div class="layout-page">
    <!-- 表示只缓存主页；article-page是Home.vue里面的name属性值 -->
    <!-- 只缓存 面经列表页，则其他的收藏、喜欢、我的页面就不会缓存 -->
    <!-- 不会缓存滚动条的位置 -->
    <keep-alive :include="['article-page']">
      <router-view></router-view>
    </keep-alive>

    <van-tabbar route>
      <van-tabbar-item to="/home/article" icon="fire-o">面经</van-tabbar-item>
      <van-tabbar-item to="/home/collect" icon="star-o">收藏</van-tabbar-item>
      <van-tabbar-item to="/home/like" icon="like-o">喜欢</van-tabbar-item>
      <van-tabbar-item to="/home/user" icon="user-o">用户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout-page'
}
</script>

<style lang="less" scoped></style>
