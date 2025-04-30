<!-- pages/index.vue -->
<template>
  <div class="max-w-4xl mx-auto py-8">
    <h1 class="text-4xl font-bold mb-6 text-gray-800">欢迎来到我的主页</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">最新文章</h2>
        <!-- 添加文章列表 -->
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">关于我</h2>
        <!-- 添加关于内容 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default'
}
</script>
