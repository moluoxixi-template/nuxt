<!--
 * @Author: moluoxixi 1983531544@qq.com
 * @Date: 2025-04-29 17:06:11
 * @LastEditors: moluoxixi 1983531544@qq.com
 * @LastEditTime: 2025-05-01 19:43:58
 * @FilePath: \clinicDoctor\app.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { computed } from 'vue';
import routeMiddleware from '~/middleware/redirect';
const route = useRoute();
routeMiddleware(route);

// 动态布局，默认使用element布局
const layout = computed(() => {
  // 如果页面定义了布局，使用页面定义的布局
  if (route.meta.layout) {
    return route.meta.layout;
  }
  // // 否则使用默认布局
  return 'element';
  // return 'shadcn'
});
</script>
