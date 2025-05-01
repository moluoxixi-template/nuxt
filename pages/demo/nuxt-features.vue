<!--
 * @Author: Claude AI
 * @Date: 2025-05-01
 * @Description: Nuxt框架特性示例
 * 
-->
<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="mb-6 flex items-center">
      <button
        class="mr-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded flex items-center"
        @click="router.back()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        返回
      </button>
      <h1 class="text-2xl font-bold">Nuxt特性示例</h1>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-blue-50 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h2 class="text-lg font-semibold text-gray-800">自动导入功能</h2>
      </div>
      <div class="p-6">
        <p class="mb-4">
          Nuxt提供了自动导入功能，无需显式导入Vue的Composition API函数、组件和Nuxt提供的工具函数。
        </p>

        <div class="bg-gray-50 p-4 rounded-lg mb-4">
          <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// 以下函数都无需导入，可直接使用
const counter = ref(0)
const doubled = computed(() => counter.value * 2)
const route = useRoute()
const router = useRouter()
const { data: items } = await useFetch('/api/items')
          </pre>
        </div>

        <div class="mt-4">
          <p class="text-sm text-gray-600 mb-2">当前示例：</p>
          <div class="flex items-center space-x-2 mb-2">
            <button
              class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded"
              @click="decrement"
            >
              -
            </button>
            <span class="text-lg font-semibold">{{ count }}</span>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
              @click="increment"
            >
              +
            </button>
          </div>
          <p class="text-sm text-gray-600">计算属性值 (count × 2): {{ doubleCount }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-green-50 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h2 class="text-lg font-semibold text-gray-800">页面和元数据</h2>
      </div>
      <div class="p-6">
        <p class="mb-4">Nuxt使用基于文件的路由系统，并支持通过definePageMeta设置页面元数据。</p>

        <div class="bg-gray-50 p-4 rounded-lg mb-4">
          <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
&lt;script setup&gt;
// 设置页面元数据
definePageMeta({
  title: '页面标题',
  layout: 'custom', // 使用自定义布局
  middleware: ['auth'] // 应用中间件
})
&lt;/script&gt;
          </pre>
        </div>

        <div class="text-sm text-gray-600 mt-4">
          <p>当前页面元数据示例:</p>
          <ul class="list-disc ml-5 mt-2 space-y-1">
            <li>标题: {{ $route.meta.title }}</li>
            <li>布局: {{ $route.meta.layout || '默认' }}</li>
            <li>路径: {{ $route.path }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-purple-50 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
          />
        </svg>
        <h2 class="text-lg font-semibold text-gray-800">数据获取</h2>
      </div>
      <div class="p-6">
        <p class="mb-4">Nuxt提供了多种数据获取方式，包括useFetch、useAsyncData和服务端API。</p>

        <div class="bg-gray-50 p-4 rounded-lg mb-4">
          <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// 获取外部API数据
const { data: posts, pending, error, refresh } = await useFetch('/api/posts')

// 使用useAsyncData获取自定义数据
const { data } = await useAsyncData('count', () => $fetch('/api/count'))
          </pre>
        </div>

        <div class="mt-4">
          <p class="text-sm text-gray-600 mb-2">当前页面数据获取示例:</p>
          <div v-if="pending" class="text-gray-500">加载中...</div>
          <div v-else-if="error" class="text-red-500">加载失败: {{ error.message }}</div>
          <div v-else-if="posts" class="text-sm">
            <div
              v-for="post in posts.slice(0, 3)"
              :key="post.id"
              class="mb-3 p-3 bg-gray-50 rounded"
            >
              <h3 class="font-medium text-gray-800">{{ post.title }}</h3>
              <p class="text-gray-600 text-xs mt-1">{{ post.body.substring(0, 100) }}...</p>
            </div>
            <button
              class="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded text-sm"
              @click="refresh"
            >
              刷新数据
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-pink-50 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2 text-pink-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
        <h2 class="text-lg font-semibold text-gray-800">布局系统</h2>
      </div>
      <div class="p-6">
        <p class="mb-4">Nuxt提供了灵活的布局系统，可以为不同页面应用不同的布局。</p>

        <div class="bg-gray-50 p-4 rounded-lg mb-4">
          <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// layouts/default.vue - 默认布局
&lt;template&gt;
  &lt;div&gt;
    &lt;header&gt;...&lt;/header&gt;
    &lt;main&gt;
      &lt;slot /&gt; &lt;!-- 页面内容 --&gt;
    &lt;/main&gt;
    &lt;footer&gt;...&lt;/footer&gt;
  &lt;/div&gt;
&lt;/template&gt;

// 在页面中指定布局
definePageMeta({
  layout: 'custom'
})
          </pre>
        </div>

        <div class="mt-4 text-sm text-gray-600">
          <p>当前项目使用的布局:</p>
          <ul class="list-disc ml-5 mt-2 space-y-1">
            <li>默认布局 (default.vue)</li>
            <li>Element Plus布局 (element.vue)</li>
            <li>Shadcn UI布局 (shadcn.vue)</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="p-5 bg-yellow-50 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2 text-yellow-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <h2 class="text-lg font-semibold text-gray-800">中间件与插件</h2>
      </div>
      <div class="p-6">
        <p class="mb-4">Nuxt支持中间件和插件系统，用于扩展应用功能和执行路由跳转前的逻辑。</p>

        <div class="bg-gray-50 p-4 rounded-lg mb-4">
          <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// middleware/auth.js - 认证中间件
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser()
  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})

// plugins/analytics.js - 分析插件
export default defineNuxtPlugin(() => {
  // 初始化分析工具
  return {
    provide: {
      analytics: {
        trackEvent: (name, params) => { /* ... */ }
      }
    }
  }
})
          </pre>
        </div>

        <div class="mt-4">
          <p class="text-sm text-gray-600 mb-2">演示中间件效果:</p>
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm"
            @click="simulateMiddleware"
          >
            模拟认证中间件
          </button>
          <div v-if="middlewareMessage" class="mt-2 p-2 rounded" :class="middlewareClass">
            {{ middlewareMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  layout: '',
  title: 'Nuxt特性示例',
});

// 自动导入示例
const count = ref(0);
const doubleCount = computed(() => count.value * 2);

function increment() {
  count.value++;
}

function decrement() {
  count.value = Math.max(0, count.value - 1);
}

// 数据获取示例
const {
  data: posts,
  pending,
  error,
  refresh,
} = await useFetch('https://jsonplaceholder.typicode.com/posts');

// 中间件模拟示例
const middlewareMessage = ref('');
const middlewareClass = ref('');
const router = useRouter();

function simulateMiddleware() {
  // 模拟认证状态
  const isAuthenticated = Math.random() > 0.5;

  if (isAuthenticated) {
    middlewareMessage.value = '✅ 认证通过，允许访问受保护页面';
    middlewareClass.value = 'bg-green-100 text-green-800';
  } else {
    middlewareMessage.value = '❌ 认证失败，重定向到登录页面';
    middlewareClass.value = 'bg-red-100 text-red-800';
  }
}
</script>
