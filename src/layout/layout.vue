<template>
  <a-layout>
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh' }" v-model:collapsed="collapsed">
      <div class="logo">
        <img src="/vite.svg" class="logo_img" alt="Vite logo" />
        <span class="logo_text" v-show="!collapsed">Ant Design</span>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" :theme="state.theme" mode="inline">
        <a-menu-item key="1">
          <UserOutlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <VideoCameraOutlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <UploadOutlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; height: 50px;">
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '12px 10px', padding: '18px', background: '#fff', minHeight: '280px', borderRadius: '4px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const selectedKeys = ref(['1']);
const collapsed = ref(false);

const state = ref({
  theme: 'dark'
})

import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  DeleteOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  UploadOutlined,
  VideoCameraOutlined,
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
