<template>
  <a-layout>
    <!-- 左侧部分开始 -->
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh' }" v-model:collapsed="collapsed">
      <!-- 左侧logo开始 -->
      <div class="logo">
        <img src="/vite.svg" class="logo_img" alt="Vite logo" />
        <span class="logo_text" v-show="!collapsed">Ant Design</span>
      </div>
      <!-- 左侧logo结束 -->

      <!-- 左侧菜单开始 -->
      <a-menu v-model:selectedKeys="selectedKeys" :theme="state.theme" :items="menu" mode="inline" @click="menuClicked"/>
      <!-- 左侧菜单结束 -->
    </a-layout-sider>
    <!-- 左侧部分结束 -->

    <!-- 右侧部分开始 -->
    <a-layout>
      <!-- 右侧header开始 -->
      <a-layout-header style="background: #fff; padding: 0; height: 50px;">
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <!-- 右侧header结束 -->

      <!-- 右侧页面主体开始 -->
      <a-layout-content
        :style="{ margin: '12px 10px', padding: '18px', background: '#fff', minHeight: '280px', borderRadius: '4px' }"
      >
        <router-view></router-view>
      </a-layout-content>
      <!-- 右侧页面主体结束 -->

    </a-layout>
    <!-- 右侧部分结束 -->
  </a-layout>
</template>
<script setup lang="ts">
import { ref, h } from 'vue';
import { useRouter } from 'vue-router'

const selectedKeys = ref(['1']);
const collapsed = ref(false);

const router = useRouter()
const state = ref({
  theme: 'dark'
})

// 菜单
const menu = ref([
  {
    key: 'dashboard',
    icon: () => h(DashboardOutlined),
    label: '仪表盘',
    title: '仪表盘',
    path: '/dashboard'
  },
  {
    key: 'sub1',
    icon: () => h(SettingOutlined),
    label: '系统设置',
    title: '系统设置',
    children: [
      {
        key: 'user_list',
        label: '用户管理',
        icon: () => h(AppstoreOutlined),
        path: '/user/list'
      },
    ],
  },
]);

// 菜单点击事件
const menuClicked = ({item, key}) => {
  console.log(item, key)
  // 跳转到菜单配置的path地址取
  router.push({ path: item.path })
}

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  SettingOutlined,
  DashboardOutlined
} from '@ant-design/icons-vue'

</script>
<style>
 .trigger {
  display: block;
  font-size: 18px;
  width: 40px;
  line-height: 50px;
  padding: 2px 16px 0 16px;
  cursor: pointer;
  transition: color 0.3s;
}

 .trigger:hover {
  color: #1890ff;
}

 .logo {
  height: 32px;
  margin: 9px;
  overflow: hidden;
}
.logo_img {
  margin-left: 12px;
  display: block;
  width: 32px;
  height: 32px;
  float: left;
}

.logo_text {
  display: block;
  float: left;
  line-height: 32px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  margin-left: 8px;
  font-weight: 900;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
