<template>
  <div class="detail-page">
    <van-nav-bar
      left-text="返回"
      @click-left="$router.back()"
      fixed
      title="面经详细"
    />
    <header class="header">
      <h1>{{ article.stem }}</h1>
      <p>
        创建时间 {{ article.createdAt }} | {{ article.views }} 浏览量 |
        {{ article.likeCount }} 点赞数
      </p>
      <p>
        <img :src="article.avatar" alt />
        <span>{{ article.creator }}</span>
      </p>
    </header>
    <main class="body" v-html="article.content"></main>
    <div class="opt">
      <van-icon
        :class="{ active: article.likeFlag }"
        @click="toggleLike"
        name="like-o"
      />
      <van-icon
        :class="{ active: article.collectFlag }"
        @click="toggleCollect"
        name="star-o"
      />
    </div>
  </div>
</template>

<script>
import { detailAPI, collectAndLikeAPI } from '@/api/article'
export default {
  name: 'detail-page',
  data () {
    return {
      article: {}
    }
  },
  async created () {
    // console.log(this.$route.params.id)
    // this.$route.params.id // 动态传参
    //  this.$route.query.id // 查询参数传参

    const { data: res } = await detailAPI(this.$route.params.id)
    console.log(res)
    this.article = res.data
  },
  methods: {
    // 点击 喜欢 图标
    async toggleLike () {
      this.article.likeFlag = !this.article.likeFlag
      // 调用接口真正修改点赞数据
      await collectAndLikeAPI({
        id: this.article.id,
        optType: 1
      })

      if (this.article.likeFlag) {
        // 点赞成功 点赞数++
        this.article.likeCount++
        this.$toast.success('点赞成功')
      } else {
        // 取消点赞 点赞数--
        this.article.likeCount--
        this.$toast.success('取消点赞')
      }
    },
    // 点击 收藏 图标
    async toggleCollect () {
      this.article.collectFlag = !this.article.collectFlag

      // 调用接口真正修改收藏数据
      await collectAndLikeAPI({
        id: this.article.id,
        optType: 2
      })

      if (this.article.collectFlag) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast.success('取消收藏')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail-page {
  margin-top: 44px;
  overflow: hidden;
  padding: 0 15px;
  .header {
    h1 {
      font-size: 24px;
    }
    p {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .opt {
    position: fixed;
    bottom: 100px;
    right: 0;
    > .van-icon {
      margin-right: 20px;
      background: #fff;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      box-shadow: 2px 2px 10px #ccc;
      font-size: 18px;
      &.active {
        background: #fec635;
        color: #fff;
      }
    }
  }
}
</style>
