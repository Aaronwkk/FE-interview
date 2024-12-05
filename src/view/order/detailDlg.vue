<template>
  <a-modal
    v-model:open="show"
    title="工单详情"
    @ok="handleOk"
    @cancel="cancel"
    width="100%"
    wrap-class-name="full-modal"
    dialog
  >
    <a-card>
      <!-- 用户信息 -->
      <div class="user-info">
        <h3>用户信息</h3>
        <p><strong>ID:</strong> {{ ticket.user.id }}</p>
        <p><strong>昵称:</strong> {{ ticket.user.nickname }}</p>
        <p><strong>邮箱:</strong> {{ ticket.user.email }}</p>
      </div>

      <!-- 问题描述 -->
      <div class="problem-description">
        <h3>问题描述</h3>
        <p>{{ ticket.description }}</p>
      </div>

      <!-- 处理记录 -->
      <div class="handling-record">
        <h3>处理记录</h3>
        <a-timeline>
          <a-timeline-item v-for="(record, index) in ticket.handlingRecords" :key="index">
            <p><strong>{{ record.handlerName }} 在 {{ record.timestamp }} 更新：</strong></p>
            <p>{{ record.note }}</p>
          </a-timeline-item>
        </a-timeline>
      </div>

      <!-- 相关工单 -->
      <div class="related-tickets">
        <h3>相关工单</h3>
        <a-list item-layout="horizontal" :data-source="ticket.relatedTickets">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta :title="item.title" :description="`ID: ${item.id}`" />
            </a-list-item>
          </template>
        </a-list>
      </div>
    </a-card>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref, defineExpose, onMounted } from 'vue';
const show = ref<boolean>(false);

// 模拟的数据，实际应用中应从API获取
const ticket = ref({
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

let _resolve = () => {}
let _reject = () => {}

// 如果需要从API加载数据，可以这样做：
onMounted(async () => {
  try {
    const response = await axios.get('/api/ticket/12345'); // 假设这是获取工单详情的API端点
    ticket.value = response.data;
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

const open = () => {
  show.value = true;
  return new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
}

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
