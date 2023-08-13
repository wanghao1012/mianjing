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

      <!-- 表格 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="stem" label="标题" width="400"></el-table-column>
        <el-table-column prop="creator" label="作者"></el-table-column>
        <el-table-column prop="likeCount" label="点赞"></el-table-column>
        <el-table-column prop="views" label="浏览数"></el-table-column>
        <el-table-column
          prop="createdAt"
          label="更新时间"
          width="200"
        ></el-table-column>
        <el-table-column label="操作" width="120px">
          <template #default="{ row }">
            <div class="actions">
              <i class="el-icon-view" @click="openDrawer('view', row.id)"></i>
              <i
                class="el-icon-edit-outline"
                @click="openDrawer('edit', row.id)"
              ></i>
              <i class="el-icon-delete" @click="del(row.id)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 抽屉 -->
      <el-drawer
        size="50%"
        :title="drawerTitle"
        :visible.sync="drawer"
        :before-close="handleClose"
      >
        <!-- 添加和修改 -->
        <el-form
          v-if="drawerType !== 'view'"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="标题" prop="stem">
            <el-input v-model="form.stem"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <!-- <el-input v-model="form.content"></el-input> -->
            <quill-editor
              v-model="form.content"
              @blur="$refs.form.validateField('content')"
            ></quill-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
        <!-- 预览 -->
        <div v-else class="article-preview">
          <h5>{{ form.stem }}</h5>
          <div v-html="form.content"></div>
        </div>
      </el-drawer>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import {
  getListApi,
  addArticleApi,
  delArticleApi,
  articleApi,
  changeArticleApi
} from '@/api/article'
export default {
  name: 'article-page',
  components: {
    quillEditor
  },
  data () {
    return {
      current: 1, // 当前页码
      pageSize: 10, // 每页多少条数据
      list: [], // 存放数据列表
      total: 0, // 总条数
      drawer: false, // 控制抽屉的打开和关闭
      drawerType: '', // 通过这个判断用户点击的四添加还是预览还是修改
      form: {
        stem: '',
        content: ''
      },
      rules: {
        stem: [{ required: true, message: '请输入面经标题', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入面经内容', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    // 面经列表
    async initData () {
      const { data } = await getListApi({
        current: this.current,
        pageSize: this.pageSize
      })
      this.list = data.rows
      this.total = data.total
      console.log(data)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.current = 1
      // 重新发送请求渲染页面
      this.initData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.current = val
      // 重新发送请求渲染页面
      this.initData()
    },
    // 删除
    async del (id) {
      try {
        // console.log(id)
        await delArticleApi(id)
        // console.log(res)
        this.initData() // 重新渲染页面
        this.$message.success('删除成功')
      } catch (e) {
        if (e.response) {
          this.$message.error(e.response.data.error)
        } else {
          this.$message.error('删除失败')
        }
      }
    },
    // 打开抽屉
    async openDrawer (type, id) {
      this.drawerType = type
      this.drawer = true

      if (type !== 'add') {
        const res = await articleApi(id)
        // console.log(res)
        this.form.stem = res.data.stem
        this.form.content = res.data.content
        this.form.id = res.data.id
      }
    },
    // 关闭抽屉
    handleClose () {
      this.form = {
        stem: '',
        content: '',
        id: undefined
      }
      this.drawer = false
    },
    // 添加和修改面经
    onSubmit () {
      // 完整非空校验
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.drawerType === 'add') {
            try {
              await addArticleApi({
                stem: this.form.stem,
                content: this.form.content
              })
              // console.log(res)
              this.initData() // 刷新页面
              this.handleClose() // 清空表单数据 关闭抽屉
              this.$message.success('添加成功')
            } catch (e) {
              if (e.response) {
                this.$message.error(e.response.data.error)
              } else {
                this.$message.error('添加失败')
              }
            }
          } else {
            try {
              await changeArticleApi(this.form)
              // console.log(res)
              this.initData() // 刷新页面
              this.handleClose() // 清空表单数据 关闭抽屉
              this.$message.success('修改成功')
            } catch (e) {
              if (e.response) {
                this.$message.error(e.response.data.error)
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
    // 判断点击的是添加还是修改还是预览
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
