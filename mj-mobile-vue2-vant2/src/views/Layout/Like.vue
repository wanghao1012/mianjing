<template>
  <div class="like-page">
    <!-- 标题 -->
    <van-nav-bar title="俺滴喜欢" class="navbar" />

    <!-- 这里放列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="nav"
    >
      <ArticleItem
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import { collectLikeListAPI } from '@/api/article'
export default {
  name: 'like-page',
  data () {
    return {
      current: 1,
      list: [], // 存储要展示的面经列表数据
      loading: false, // true 表示不允许加载数据(正在加载某一页的数据),false表示此时没有发生请求数据
      finished: false // false 表示还有下一页数据可以加载
    }
  },
  methods: {
    // 获取面经列表数据
    async onLoad () {
      // 会将loading设置为true,表示正在请求数据,此时不能重复加载
      const { data: res } = await collectLikeListAPI({
        optType: 1,
        page: this.current // 要求的页码
      })
      console.log(res)
      // 拿到之后,不是赋值给list,而是添加给list
      // this.list = res.data.rows
      // 通过展开运算符将获取到的数组展开,在将值赋值给list

      this.list.push(...res.data.rows)
      // console.log(this.list)
      this.loading = false
      this.current++ // 将页码+1

      // 判断 当数据全部加载完毕后
      if (this.current > res.data.pageTotal) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.like-page {
  margin-bottom: 50px;
  // margin-top: 44px;
  .navbar {
    position: fixed;
    width: 100%;
  }
  .nav {
    padding-top: 47px;
  }
}
</style>
