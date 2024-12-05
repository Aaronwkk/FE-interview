<template>
  <a-layout-content class="page" style="height: 100vw; overflow: hidden; ">
    <a-form layout="inline" :model="searchForm">
      <a-form-item label="状态">
        <a-select v-model="searchForm.status" placeholder="请选择状态">
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="pending">待处理</a-select-option>
          <a-select-option value="processing">处理中</a-select-option>
          <a-select-option value="completed">已完成</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="关键词">
        <a-input v-model="searchForm.keyword" placeholder="请输入关键词"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSearch">搜索</a-button>
      </a-form-item>
    </a-form>
        <!-- a-table 需要设置视口内滚动，但是设置100% 没效果，这个组件可能存在bug需要fix掉，一般会抽成组件，时间有限没找到解决方案-->
      <a-table
        :columns="columns"
        :data-source="filteredData"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :scroll="{ y: 500 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'priority'">
            <span>
              <a-tag :color="getColor(record.priority, 'priority')">{{ getValue(record.priority, 'priority') }}</a-tag>
            </span>
          </template>
          <template v-if="column.key === 'status'">
            <span>
              <a-tag :color="getColor(record.status, 'status')">{{ getValue(record.status, 'status') }}</a-tag>
            </span>
          </template>
          <template v-if="column.key === 'warn'">
            <span>
              <Countdown :deadline="record.deadline"/>
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <span>
              <a-button size="small" type="primary" @click="handleOpenForm(record)">详情</a-button>
              <a-divider type="vertical" />
              <a-button size="small" v-if="record.status !== 'completed'" @click="handleRecover(record)">回复</a-button>
            </span>
          </template>
        </template>
      </a-table>
  <handle-form ref="handleForm"/>
  <order-recover ref="orderRecover"/>
  </a-layout-content>
</template>

<script>
import {orderList} from '@/api/order'
import handleForm from './detailDlg.vue'
import orderRecover from './orderRecover.vue'
import Countdown from './components/Countdown.vue'

const status = {
  priority: { high: 'red', medium: 'blue', low: 'green' },
  status: { pending: 'pink', processing: 'blue', completed: 'green'}
}

const statusMap = {
  status: { pending: '待处理', processing: '处理中', completed: '已完成'},
  priority: { high: '高', medium: '中等', low: '低' },
}

export default {
  components: {handleForm, orderRecover, Countdown},
  data() {
    return {
      searchForm: {
        status: '',
        keyword: ''
      },
      loading: false,
      columns: [
        {
          title: '名称',
          dataIndex: 'title',
          key: 'title',
          sorter: true,
          ellipsis: true,
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: '优先级',
          dataIndex: 'priority',
          key: 'priority',
          scopedSlots: { customRender: 'status' },
          sorter: true,
        },
        {
          title: '处理时限提醒',
          dataIndex: 'warn',
          key: 'warn',
          sorter: true,
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
        }
      ],
      dataSource: [], // 假设这是从后端获取的数据源
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total) => `共 ${total} 条`,
      },
      filteredData: [],
    };
  },
  methods: {
    async handleOpenForm(detail){
      await this.$refs.handleForm.open(detail)
    },
    async handleRecover(detail){
      await this.$refs.orderRecover.open(detail)
    },
    getColor(value, type) {
      const colors = status[type];
      return colors[value.toLowerCase()] || 'default';
    },
    getValue(value, type) {
      const colors = statusMap[type];
      return colors[value.toLowerCase()] || 'default';
    },
    async loadData(page = 1, pageSize = 20) {
      this.loading = true;
      // 模拟数据
      const {data} = await orderList()
      this.dataSource = data.list
      this.pagination.total = this.dataSource.length;
      this.handleTableChange({ current: page, pageSize });
      this.loading = false;
  },
    handleSearch() {
      this.pagination.current = 1; // 搜索时重置到第一页
      this.handleTableChange();
    },
    handleTableChange(pagination) {
      const { current, pageSize } = pagination;
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;

      let filteredDataSource = this.dataSource.filter(record => {
        const matchesStatus = !this.searchForm.status || record.status === this.searchForm.status;
        const matchesKeyword = !this.searchForm.keyword || record.name.includes(this.searchForm.keyword);
        return matchesStatus && matchesKeyword;
      });

      this.filteredData = filteredDataSource.slice((current - 1) * pageSize, current * pageSize);
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style scoped lang="less">
.page{
  display: flex;
  flex-direction: column;;
}
.main-content{
  flex: 1;
  overflow: hidden;
}
.custom-antd-table-wrapper {
  height: 100%;
  ::v-deep(.ant-table-wrapper) {
    height: 100%;
    .ant-spin-nested-loading {
      height: 100%;
    }
    .ant-spin-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      .ant-table {
        flex: 1;
        height: 0;
      }
      .ant-pagination {
        flex-shrink: 0;
      }
    }
    .ant-table-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      > .ant-table-header {
        flex-shrink: 0;
      }
      > .ant-table-body {
        flex: 1;
        height: 0;
      }
    }
  }
}
</style>
