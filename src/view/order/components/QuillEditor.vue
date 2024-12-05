<template>
  <div>
    <QuillEditor v-model="content" :options="editorOptions" />
  </div>
</template>

<script setup>
import { ref,reactive, defineExpose, onMounted } from 'vue';
// 引入了 Quill 编辑器，以及 QuillEditor 组件，并引入相应的 CSS 样式
import { QuillEditor,Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
  components: {
    QuillEditor
  }
  const content = ref("");//定义content
 // 定义一个响应式的 editorOptions 对象，其中包含了需要配置的选项参数
  const editorOptions = reactive({
    modules: {
      toolbar: [  // 工具栏配置
        ['bold', 'italic', 'underline', 'strike'],  // 粗体、斜体、下划线、删除线
        [{ 'header': 1 }, { 'header': 2 }],  // 标题1和标题2
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],  // 有序列表和无序列表
        [{ 'script': 'sub' }, { 'script': 'super' }],  // 上标和下标
        [{ 'indent': '-1' }, { 'indent': '+1' }],  // 缩进
        [{ 'direction': 'rtl' }],  // 文字方向
        [{ 'size': ['small', false, 'large', 'huge'] }],  // 字号
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  // 标题等级
        [{ 'color': [] }, { 'background': [] }],  // 字体颜色和背景色
        [{ 'font': [] }],  // 字体
        [{ 'align': [] }],  // 对齐方式
        ['clean']  // 清除格式
      ]
    }
  })
</script>
