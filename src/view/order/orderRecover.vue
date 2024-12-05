<template>
  <a-modal
    v-model:open="show"
    title="工单处理"
    @ok="handleOk"
    @cancel="cancel"
    width="100%"
    wrap-class-name="full-modal"
    dialog
    okText="提交回复"
    cancelText="取消"
  >
    <!-- 回复功能 -->
    <div class="reply-section">
      <a-card>
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
      <h3>选择模版</h3>

      <!-- 快捷回复模板选择 -->
      <a-row :gutter="[16, 16]">
        <a-col :span="5">
          <a-select v-model:value="selectedTemplate" placeholder="选择快捷回复模板" style="width: 100%;">
            <a-select-option v-for="template in quickReplyTemplates" :key="template.value" :value="template.value">
              {{ template.text }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="3">
          <a-button type="primary" @click="applyTemplate" block>应用模板</a-button>
        </a-col>
      </a-row>

      <!-- 回复编辑器 -->
      <div class="editor" style="margin-top: 16px;">
        <quill-editor style="height: 300px;" v-model:content="replyContent" contentType="html"></quill-editor>
      </div>

      <!-- 图片上传 -->
      <div class="image-upload" style="margin-top: 66px;">
        <h3>上传图片</h3>

        <a-upload
          name="file"
          list-type="picture-card"
          :multiple="true"
          :before-upload="beforeUpload"
          @change="handleChange"
          :max-count="8"
        >
          <div>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else />
            <div class="ant-upload-text">上传图片</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>

      <!-- 处理结果选择 -->
      <div class="result-selection" style="margin-top: 16px;">
        <h3>处理结果</h3>
        <a-radio-group v-model:value="selectedResult" style="width: 100%;">
          <a-radio value="pending">待处理</a-radio>
          <a-radio value="processing">处理中</a-radio>
          <a-radio value="completed">已完成</a-radio>
        </a-radio-group>
      </div>

    </a-form>
    </a-card>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { ref, defineExpose, onMounted } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import quillEditor from './components/QuillEditor.vue';

const show = ref<boolean>(false);

// 快捷回复模板
const quickReplyTemplates = ref([
  { text: '待处理', value: 'pending' },
  { text: '处理中', value: 'processing' },
  { text: '已完成', value: 'completed' }
]);

let selectedTemplate = ref('');
let replyContent = ref('');
let uploadingImages = ref([]);
let selectedResult = ref('pending');

const previewVisible = ref(false);
const previewImage = ref('');
const loading = ref(false);

let _resolve = () => {}
let _reject = () => {}

// 如果需要从API加载数据，可以这样做：
onMounted(async () => {
  try {
    // const response = await axios.get('/api/ticket/12345'); // 假设这是获取工单详情的API端点
  } catch (error) {
    console.error('Failed to fetch ticket details:', error);
  }
});

const handleOk = () => {
  show.value = true;
  _resolve()
};

const cancel = () => {
  show.value = false;
  _reject()
}

const open = (detail) => {
  show.value = true;

  console.log(detail)

  selectedTemplate = ref('');
  replyContent = ref('');
  uploadingImages = ref([]);
  selectedResult = detail.status;
  
  return new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
}

// 模拟数据，实际应用中应从API获取
let ticket = ref({
  user: {
    id: '12345',
    nickname: '张三',
    email: 'zhangsan@example.com'
  },
  description: '无法登录系统，提示错误代码：403。',
  handlingRecords: [
    { handlerName: '客服A', timestamp: '2024-11-28 10:00', note: '已联系用户确认问题。' },
    { handlerName: '技术B', timestamp: '2024-11-29 14:30', note: '检查日志发现权限不足的问题。' }
  ],
  relatedTickets: [
    { id: '67890', title: '关于权限设置的问题' },
    { id: '54321', title: '账户被锁定后如何解锁' }
  ]
});

// 应用快捷回复模板
const applyTemplate = () => {
  const template = quickReplyTemplates.value.find(t => t.value === selectedTemplate.value);
  if (template) {
    replyContent.value += `\n\n${template.text}`;
  }
};

// 图片上传逻辑
const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG 或 PNG 文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const handleChange = info => {
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, imageUrl => {
      uploadingImages.value.push(imageUrl);
      loading.value = false;
    });
  }
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const handleCancel = () => {
  previewVisible.value = false;
};

// 提交回复
const submitReply = async () => {
  try {
    await axios.post('/api/ticket/reply', {
      ticketId: ticket.value.id,
      content: replyContent.value,
      images: uploadingImages.value,
      result: selectedResult.value
    });
    message.success('回复成功');
  } catch (error) {
    console.error('Failed to submit reply:', error);
    message.error('回复失败，请稍后再试');
  }
};

onMounted(() => {
  // 如果需要从API加载数据，可以这样做：
  // fetchTicketDetails();
});

defineExpose({open})
</script>
<style lang="less">
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}

.user-info, .problem-description, .handling-record, .related-tickets {
  margin-bottom: 20px;
}

h3 {
  margin-top: 0;
}
</style>
