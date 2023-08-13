<template>
  <!-- 动态传参 -->
  <van-cell class="article-item" @click="$router.push(`/detail/${item.id}`)">
    <!-- 查询参数传参 -->
    <!-- <van-cell class="article-item" @click="$router.push(`/detail?id=${item.id}`)"> -->
    <template #title>
      <div class="head">
        <img :src="item.avatar" />
        <div class="con">
          <p class="title van-ellipsis">{{ item.stem }}</p>
          <p class="other">{{ item.creator }} | {{ item.createdAt }}</p>
        </div>
      </div>
    </template>
    <template #label>
      <div class="body van-multi-ellipsis--l2">
        {{ delHtmlTag(item.content) }}
      </div>
      <div class="foot">点赞 {{ item.likeCount }} | 浏览 {{ item.views }}</div>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    delHtmlTag (html) {
      return html.replace(/<[^>]+>/g, '')
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .head {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .con {
      flex: 1;
      overflow: hidden;
      padding-left: 10px;
      p {
        margin: 0;
        line-height: 1.5;
        &.title {
          width: 280px;
        }
        &.other {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
  .body {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-top: 10px;
  }
  .foot {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
</style>
