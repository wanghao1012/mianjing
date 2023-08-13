<template>
  <div class="article-page">
    <nav class="my-nav van-hairline--bottom">
      <a
        :class="{ active: sorter === 'weight_desc' }"
        href="javascript:;"
        @click="changeSorter('weight_desc')"
        >推荐</a
      >
      <!-- 当传递的参数为null或者是undefined时,默认就是没有传参数 -->
      <a
        :class="{ active: sorter === null }"
        href="javascript:;"
        @click="changeSorter(null)"
        >最新</a
      >
      <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
    </nav>

    <!-- 这里放列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
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
import { articleAPI } from '@/api/article'
export default {
  name: 'article-page',
  data () {
    return {
      temp: 0, // 临时记录一下页面滚动出去的距离
      scrollTop: 0, // 真实的几率页面滚动出去的距离
      current: 1,
      sorter: 'weight_desc', // weight_desc  获取推荐的面试题  null 获取最新的面试题
      list: [], // 存储要展示的面经列表数据
      loading: false, // true 表示不允许加载数据(正在加载某一页的数据),false表示此时没有发生请求数据
      finished: false // false 表示还有下一页数据可以加载
    }
  },
  methods: {
    // 获取面经列表数据
    async onLoad () {
      // 会将loading设置为true,表示正在请求数据,此时不能重复加载
      const { data: res } = await articleAPI({
        current: this.current,
        sorter: this.sorter
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
    },

    // 修改sorter
    changeSorter (value) {
      // 修改排序规则
      this.sorter = value

      // 重置数据
      this.list = [] // 清空数据
      this.current = 1 // 页码数重置成1
      this.finished = false // finished重置  可以重新加载数据了

      // 由于我们是自己手动调用的,为了防止他重复加载,所以这里将loading改为true
      // 避免因滚动条问题,自动调用onload;因为下面已经手动调用了
      this.loading = true
      // 根据新的条件渲染数据
      this.onLoad()
    }
  },
  // 组件激活时自动执行
  activated () {
    console.log('article组件激活了')
    // 注册事件，将滚动距离存储到 temp
    window.addEventListener('scroll', () => {
      this.temp = document.documentElement.scrollTop
    })
    // 设置页面滚动距离
    document.documentElement.scrollTop = this.scrollTop
  },
  // 组件失活时制动执行
  deactivated () {
    console.log('article组件失活了')
    // 离开页面时，将临时变量 temp 的值，赋给 scrollTop，下次进入页面时使用
    this.scrollTop = this.temp
  }
  // // 页面刷新自动获取数据
  // created () {
  //   this.articleList()
  // }
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
</style>
