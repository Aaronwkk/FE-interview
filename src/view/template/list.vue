<template>
  <a-card title="工单详情">
    <!-- 用户信息、问题描述、处理记录、相关工单等部分略 -->

    <!-- 回复功能 -->
    <div class="reply-section">
      <h3>回复</h3>

      <!-- 快捷回复模板选择 -->
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-select v-model:value="selectedTemplate" placeholder="选择快捷回复模板" style="width: 100%;">
            <a-select-option v-for="template in quickReplyTemplates" :key="template.value" :value="template.value">
              {{ template.text }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" @click="applyTemplate" block>应用模板</a-button>
        </a-col>
      </a-row>

      <!-- 回复编辑器 -->
      <div class="editor" style="margin-top: 16px;">
        <quill-editor v-model:content="replyContent" contentType="html"></quill-editor>
      </div>

      <!-- 图片上传 -->
      <div class="image-upload" style="margin-top: 16px;">
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
        <a-radio-group v-model:value="selectedResult" style="width: 100%;">
          <a-radio value="pending">待处理</a-radio>
          <a-radio value="processing">处理中</a-radio>
          <a-radio value="completed">已完成</a-radio>
        </a-radio-group>
      </div>

      <!-- 提交按钮 -->
      <div style="text-align: right; margin-top: 16px;">
        <a-button type="primary" @click="submitReply">提交回复</a-button>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { ref } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { QuillEditor } from '@vueup/vue-quill'; 