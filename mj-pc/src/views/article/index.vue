<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
          <el-button
            @click="openDrawer('add')"
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
          >
            添加面经
          </el-button>
        </div>
      </template>
      <el-table stripe :data="list" style="width: 100%">
        <el-table-column prop="stem" label="标题" width="400">
        </el-table-column>
        <el-table-column prop="creator" label="作者"> </el-table-column>
        <el-table-column prop="likeCount" label="点赞"> </el-table-column>
        <el-table-column prop="views" label="浏览"> </el-table-column>
        <el-table-column prop="createdAt" label="更新日期" width="180">
        </el-table-column>

        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <div class="actions">
              <i class="el-icon-view" @click="openDrawer('view', row.id)"></i>
              <i
                class="el-icon-edit-outline"
                @click="openDrawer('edit', row.id)"
              ></i>
              <i class="el-icon-delete" @click="del(row.id)"></i>
            </div> </template
        ></el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- 表格结束，放分页组件 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!-- 抽屉 -->
      <el-drawer
        :title="drawerTitle"
        :visible.sync="drawer"
        size="50%"
        :before-close="handleClose"
      >
        <!-- 添加,修改操作,抽屉的内容是个表单 -->
        <el-form
          v-if="drawerType !== 'view'"
          label-width="80px"
          :model="form"
          :rules="rules"
          ref="form"
        >
          <!-- 标题 -->
          <el-form-item label="标题" prop="stem">
            <el-input v-model="form.stem"></el-input>
          </el-form-item>
          <!-- 内容 -->
          <el-form-item label="内容" prop="content">
            <!-- @blur="$refs.form.validateField('content')"  失去焦点事件,判断富文本编辑器是否为空 -->
            <!-- validateField  对单个字段进行校验 -->
            <quill-editor
              v-model="form.content"
              @blur="$refs.form.validateField('content')"
            ></quill-editor>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
        <!-- 预览的操作,内容不是表单 是个div-->
        <div v-else class="article-preview">
          <h5>{{ form.stem }}</h5>
          <div v-html="form.content"></div>
        </div>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
// 局部注册
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import {
  ArticleListApi,
  addArticleApi,
  removeArticleApi,
  articleApi,
  updateArticleApi
} from '@/api/article'
export default {
  name: 'article-page',
  components: {
    quillEditor
  },
  data () {
    return {
      current: 1, // 当前页码 默认是第一页
      pageSize: 10, // 每页多少条数据
      list: [], // 存放面经数据
      total: 0, // 共有多少条数据
      drawer: false, // false关闭抽屉 true打开抽屉
      drawerType: '', // add-添加、edit-修改、view-预览等类型
      form: {
        stem: '', // 标题
        content: '' // 内容
      },
      rules: {
        stem: [{ required: true, message: '请输入标题', trigger: 'blur' }], // 校验标题
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }] // 校验内容区
      }
    }
  },
  created () {
    this.initData() // 调用 获取面经列表数据的方法
  },
  methods: {
    // 获取面经列表数据的方法
    async initData () {
      const res = await ArticleListApi({
        current: this.current,
        pageSize: this.pageSize
      })
      this.list = res.data.rows
      this.total = res.data.total
      // console.log(res)
      console.log(this.list)
    },
    // 删除
    async del (id) {
      // console.log(id)
      try {
        await removeArticleApi(id)
        this.initData() // 重新渲染页面
        this.$message.success('删除成功') // 提示添加成功
      } catch (e) {
        if (e.response) {
          this.$message.error(e.response.data.message)
        } else {
          this.$message.error('删除失败')
        }
      }
    },
    // 每页多少条发生变化后触发
    handleSizeChange (val) {
      // console.log('1', val)
      this.pageSize = val // 修改每页几条数据
      this.current = 1 // 每页条数发生改变,自动跳转到第一页
      this.initData() // 重新发送请求
    },
    // 页码发生改变后触发
    handleCurrentChange (val) {
      // console.log(val)
      this.current = val // 修改页码
      this.initData() // 重新发送请求
    },
    // 打开抽屉
    async openDrawer (type, id) {
      this.drawerType = type
      // 打开抽屉
      this.drawer = true

      // 当打开的是修改或者预览时
      const res = await articleApi(id)
      // console.log(res)
      this.form.content = res.data.content
      this.form.stem = res.data.stem
      this.form.id = res.data.id
    },
    // 关闭抽屉前要做什么
    handleClose () {
      // 清空表单
      // ?. 是新语法，ES6语法
      // 前面的表单如果能够找到，不是undefined，则调用后面的 resetFields 方法
      // this.$refs.form?.resetFields() // 有bug点击预览再点击添加会有bug
      this.form = {
        id: undefined,
        stem: '',
        content: ''
      }

      // 关闭抽屉
      this.drawer = false
    },
    // 提交表单  可能是添加或修改
    onSubmit () {
      // 完整校验
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 判断修改还是添加
          // 添加
          if (this.drawerType === 'add') {
            try {
              await addArticleApi(this.form)
              // console.log(res)
              this.handleClose() // 关闭抽屉清空表单
              this.initData() // 重新渲染页面
              this.$message.success('添加成功') // 提示添加成功
            } catch (e) {
              if (e.response) {
                this.$message.error(e.response.data.message)
              } else {
                this.$message.error('添加失败')
              }
            }
          } else {
            // 修改
            try {
              await updateArticleApi(this.form)
              // console.log(res)
              this.handleClose() // 关闭抽屉清空表单
              this.initData() // 重新渲染页面
              this.$message.success('修改成功') // 提示添加成功
            } catch (e) {
              if (e.response) {
                this.$message.error(e.response.data.message)
              } else {
                this.$message.error('修改失败')
              }
            }
          }
        }
      })
    }
  },
  computed: {
    // 修改抽屉的标题
    drawerTitle () {
      let title = '大标题'
      if (this.drawerType === 'add') title = '添加面经'
      if (this.drawerType === 'view') title = '面经预览'
      if (this.drawerType === 'edit') title = '修改面经'
      return title
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
