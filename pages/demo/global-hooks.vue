<!--
 * @Author: Claude AI
 * @Date: 2025-05-01
 * @Description: 全局钩子演示页面
 * 
-->
<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="mb-6 flex items-center">
      <button
        class="mr-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded flex items-center"
        @click="router.push('/demo')"
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
      <h1 class="text-2xl font-bold">全局钩子系统</h1>
    </div>

    <!-- 事件总线演示 -->
    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-blue-50">
        <h2 class="text-lg font-semibold text-gray-800">事件总线示例</h2>
      </div>
      <div class="p-6">
        <p class="mb-4 text-gray-700">
          事件总线允许不同组件之间进行通信，而不需要直接的父子关系或属性传递。
        </p>

        <div class="flex space-x-4 mb-6">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            @click="sendEvent"
          >
            发送全局事件
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            @click="triggerError"
          >
            触发全局错误
          </button>
        </div>

        <div class="bg-gray-50 p-4 rounded">
          <h3 class="font-medium text-gray-800 mb-2">事件日志:</h3>
          <div class="h-32 overflow-y-auto border p-2 bg-white">
            <div v-for="(log, index) in eventLogs" :key="index" class="text-sm py-1 border-b">
              <span class="font-medium">[{{ log.time }}]</span>
              <span :class="`mx-1 ${log.type === 'error' ? 'text-red-600' : 'text-blue-600'}`"
                >{{ log.type }}:</span
              >
              <span>{{ log.message }}</span>
            </div>
            <div v-if="!eventLogs.length" class="text-gray-400 text-center py-2">没有事件记录</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全局指令演示 -->
    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-green-50">
        <h2 class="text-lg font-semibold text-gray-800">全局指令示例</h2>
      </div>
      <div class="p-6">
        <p class="mb-4 text-gray-700">全局指令允许对DOM元素进行自定义控制，以下是几个示例：</p>

        <div class="space-y-6">
          <!-- 自动聚焦指令 -->
          <div class="mb-4">
            <h3 class="font-medium text-gray-800 mb-2">v-focus 自动聚焦:</h3>
            <input
              v-focus
              type="text"
              placeholder="我将自动获得焦点"
              class="w-full p-2 border rounded"
            >
          </div>

          <!-- 防抖指令 -->
          <div class="mb-4">
            <h3 class="font-medium text-gray-800 mb-2">v-debounce 防抖点击:</h3>
            <div class="flex items-center space-x-4">
              <button
                v-debounce:1000="handleDebounceClick"
                class="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
              >
                防抖按钮 (1秒)
              </button>
              <span>点击计数: {{ debounceCount }}</span>
            </div>
            <p class="mt-2 text-gray-600 text-sm">连续快速点击按钮，只有最后一次点击会被处理</p>
          </div>

          <!-- 长按指令 -->
          <div class="mb-4">
            <h3 class="font-medium text-gray-800 mb-2">v-longpress 长按触发:</h3>
            <div class="flex items-center space-x-4">
              <button
                v-longpress:2000="handleLongPress"
                class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
              >
                长按按钮 (按住2秒)
              </button>
              <span>长按计数: {{ longpressCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 路由钩子演示 -->
    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-purple-50">
        <h2 class="text-lg font-semibold text-gray-800">路由钩子示例</h2>
      </div>
      <div class="p-6">
        <p class="mb-4 text-gray-700">
          路由钩子可以在路由变化时执行特定操作。导航到其他页面将触发加载效果。
        </p>

        <div class="flex space-x-4 mb-6">
          <button
            v-for="page in demoPages"
            :key="page.path"
            class="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
            @click="router.push(page.path)"
          >
            访问{{ page.name }}
          </button>
        </div>

        <div class="bg-gray-50 p-4 rounded">
          <h3 class="font-medium text-gray-800 mb-2">当前路由信息:</h3>
          <div class="space-y-2">
            <div><strong>路径:</strong> {{ route.path }}</div>
            <div><strong>页面标题:</strong> {{ route.meta.title || '未设置' }}</div>
            <div v-if="parentInfo.parentRoute">
              <strong>父级路由:</strong> {{ parentInfo.parentRoute.path }} ({{
                parentInfo.parentRoute.title
              }})
            </div>
            <div class="mt-2">
              <strong>面包屑导航:</strong>
              <div class="flex items-center space-x-2 mt-1">
                <template v-for="(crumb, index) in breadcrumbInfo.breadcrumbs" :key="crumb.path">
                  <span
                    class="cursor-pointer"
                    :class="
                      crumb.current
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-blue-600'
                    "
                    @click="router.push(crumb.path)"
                  >
                    {{ crumb.name }}
                  </span>
                  <span v-if="index < breadcrumbInfo.breadcrumbs.length - 1" class="text-gray-400"
                    >/</span
                  >
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useBreadcrumbs, useParentRoute } from '~/composables/useRouteInfo';

definePageMeta({
  layout: 'default',
  title: '全局钩子演示',
});

const router = useRouter();
const route = useRoute();
const { $eventBus } = useNuxtApp();

// 面包屑和父级路由
const breadcrumbInfo = useBreadcrumbs();
const parentInfo = useParentRoute();

// 事件日志
const eventLogs = ref([]);
const demoPages = [
  { name: 'API服务示例', path: '/demo/api-service' },
  { name: 'Nuxt特性示例', path: '/demo/nuxt-features' },
];

// 监听事件
function logEvent(type, message) {
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  eventLogs.value.unshift({
    type,
    message,
    time,
  });

  // 限制日志数量
  if (eventLogs.value.length > 50) {
    eventLogs.value = eventLogs.value.slice(0, 50);
  }
}

// 发送全局事件
function sendEvent() {
  $eventBus.emit('demo:event', { message: '这是一个测试事件', timestamp: Date.now() });
  logEvent('event', '发送了测试事件');
}

// 触发全局错误
function triggerError() {
  try {
    // 故意制造一个错误
    const obj = null;
    obj.nonExistentMethod();
  } catch (error) {
    logEvent('error', error.message);
    throw error; // 将被全局错误处理器捕获
  }
}

// 指令测试数据
const debounceCount = ref(0);
const longpressCount = ref(0);

function handleDebounceClick() {
  debounceCount.value++;
  logEvent('event', `防抖点击触发，计数: ${debounceCount.value}`);
}

function handleLongPress() {
  longpressCount.value++;
  logEvent('event', `长按触发，计数: ${longpressCount.value}`);
}

// 事件监听器
function handleGlobalError({ error }) {
  logEvent('error', `全局错误: ${error.message}`);
}

function handlePromiseError(reason) {
  logEvent('error', `Promise错误: ${reason instanceof Error ? reason.message : String(reason)}`);
}

function handleRouteChange({ to, from }) {
  logEvent('event', `路由变化: ${from.path} -> ${to.path}`);
}

function handleApiRequest() {
  logEvent('event', 'API请求开始');
}

function handleApiResponse() {
  logEvent('event', 'API请求完成');
}

// 挂载和卸载事件监听器
onMounted(() => {
  $eventBus.on('error:global', handleGlobalError);
  $eventBus.on('error:promise', handlePromiseError);
  $eventBus.on('router:after-each', handleRouteChange);
  $eventBus.on('api:request-start', handleApiRequest);
  $eventBus.on('api:request-end', handleApiResponse);
  $eventBus.on('demo:event', ({ message }) => {
    logEvent('event', `接收事件: ${message}`);
  });

  logEvent('event', '页面加载完成');
});

onUnmounted(() => {
  $eventBus.off('error:global', handleGlobalError);
  $eventBus.off('error:promise', handlePromiseError);
  $eventBus.off('router:after-each', handleRouteChange);
  $eventBus.off('api:request-start', handleApiRequest);
  $eventBus.off('api:request-end', handleApiResponse);
  $eventBus.off('demo:event');
});
</script>
