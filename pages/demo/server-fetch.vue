<!--
 * @Author: Claude AI
 * @Date: 2025-05-01
 * @Description: 服务端数据获取示例
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
      <h1 class="text-2xl font-bold">服务端数据获取</h1>
    </div>

    <!-- useFetch示例 -->
    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-blue-50">
        <h2 class="text-lg font-semibold text-gray-800">useFetch 示例</h2>
        <p class="text-sm text-gray-600 mt-1">在服务端和客户端都可使用的数据获取方法</p>
      </div>
      <div class="p-6">
        <div class="mb-4">
          <p class="mb-2 text-gray-700">
            useFetch是Nuxt提供的一个强大函数，能够在服务端渲染期间获取数据，并自动将数据在客户端进行补水(hydration)。
          </p>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// 基本用法
const { data, pending, error, refresh } = await useFetch('/api/users')

// 带参数的请求
const { data } = await useFetch('/api/users', {
  method: 'POST',
  body: { name: 'John' }
})

// 请求选项
const { data } = await useFetch('/api/users', {
  key: 'users', // 唯一键，用于缓存
  lazy: true,   // 懒加载
  server: false // 仅在客户端获取
})
            </pre>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <h3 class="font-medium text-gray-800 mb-3">实时示例：获取用户列表</h3>

          <div v-if="usersPending" class="flex items-center justify-center p-4">
            <svg
              class="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span class="ml-2 text-gray-600">加载中...</span>
          </div>

          <div v-else-if="usersError" class="p-4 bg-red-50 rounded text-red-600">
            加载失败：{{ usersError.message }}
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="user in users" :key="user.id" class="border rounded p-3 bg-gray-50">
              <div class="font-medium">{{ user.name }}</div>
              <div class="text-sm text-gray-600">{{ user.email }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ user.company.name }}</div>
            </div>
          </div>

          <div class="mt-4 flex items-center">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm flex items-center"
              @click="refreshUsers"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              刷新数据
            </button>
            <span v-if="refreshing" class="ml-2 text-sm text-gray-600">刷新中...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- useAsyncData示例 -->
    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-green-50">
        <h2 class="text-lg font-semibold text-gray-800">useAsyncData 示例</h2>
        <p class="text-sm text-gray-600 mt-1">更灵活的异步数据获取方法</p>
      </div>
      <div class="p-6">
        <div class="mb-4">
          <p class="mb-2 text-gray-700">
            useAsyncData提供了更大的灵活性，可以执行任何异步操作，不仅限于API请求。
          </p>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// 基本用法
const { data, pending, error } = await useAsyncData('key', async () => {
  return await myAsyncFunction()
})

// 带选项
const { data } = await useAsyncData(
  'key',
  () => myAsyncFunction(),
  {
    lazy: true,
    server: false,
    transform: (result) => result.map(item => ({ ...item, modified: true }))
  }
)
            </pre>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <h3 class="font-medium text-gray-800 mb-3">实时示例：获取与处理文章数据</h3>

          <div v-if="postsPending" class="flex items-center justify-center p-4">
            <svg
              class="animate-spin h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span class="ml-2 text-gray-600">加载中...</span>
          </div>

          <div v-else-if="postsError" class="p-4 bg-red-50 rounded text-red-600">
            加载失败：{{ postsError.message }}
          </div>

          <div v-else class="space-y-4">
            <div v-for="post in processedPosts" :key="post.id" class="border rounded p-4">
              <div class="font-medium text-lg">{{ post.title }}</div>
              <div class="text-gray-600 mt-1">{{ post.summary }}</div>
              <div class="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>文章ID: {{ post.id }}</span>
                <span>字数: {{ post.wordCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务端API示例 -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="p-5 bg-purple-50">
        <h2 class="text-lg font-semibold text-gray-800">服务端API路由</h2>
        <p class="text-sm text-gray-600 mt-1">在Nuxt中创建API端点</p>
      </div>
      <div class="p-6">
        <div class="mb-4">
          <p class="mb-2 text-gray-700">
            Nuxt允许在server/api目录下创建服务端API路由，这些路由可以处理HTTP请求并返回数据。
          </p>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// server/api/todos.get.ts
export default defineEventHandler(async (event) => {
  // 获取查询参数
  const query = getQuery(event)
  
  // 返回数据
  return {
    todos: [
      { id: 1, text: '学习Nuxt', completed: false },
      { id: 2, text: '构建应用', completed: true }
    ],
    filter: query.filter || 'all'
  }
})
            </pre>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <h3 class="font-medium text-gray-800 mb-3">模拟服务端API示例</h3>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2"> 筛选待办事项 </label>
            <select
              v-model="todoFilter"
              class="block w-full p-2 border rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
              @change="fetchFilteredTodos"
            >
              <option value="all">全部</option>
              <option value="completed">已完成</option>
              <option value="active">未完成</option>
            </select>
          </div>

          <div v-if="todosPending" class="flex items-center justify-center p-4">
            <svg
              class="animate-spin h-5 w-5 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span class="ml-2 text-gray-600">加载中...</span>
          </div>

          <div v-else class="border rounded-md divide-y">
            <div
              v-for="todo in filteredTodos"
              :key="todo.id"
              class="p-3 flex items-center"
              :class="{ 'bg-gray-50': todo.completed }"
            >
              <input
                type="checkbox"
                :checked="todo.completed"
                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                @change="toggleTodo(todo)"
              >
              <span
                class="ml-3 text-gray-700"
                :class="{ 'line-through text-gray-400': todo.completed }"
              >
                {{ todo.text }}
              </span>
            </div>
          </div>

          <div class="mt-4 text-sm text-gray-600">
            <p>
              <span class="font-medium">注意：</span>
              这是一个模拟的API示例。在实际应用中，应该通过server/api/目录创建真实的API端点。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: '',
  title: '服务端数据获取',
});

const router = useRouter();
const refreshing = ref(false);

// useFetch示例 - 获取用户列表
const {
  data: users,
  pending: usersPending,
  error: usersError,
  refresh: usersRefresh,
} = await useFetch('https://jsonplaceholder.typicode.com/users');

async function refreshUsers() {
  refreshing.value = true;
  await usersRefresh();
  refreshing.value = false;
}

// useAsyncData示例 - 获取文章并转换
const {
  data: processedPosts,
  pending: postsPending,
  error: postsError,
} = await useAsyncData('posts', async () => {
  // 获取原始文章数据
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();

  // 转换数据
  return posts.slice(0, 3).map((post) => ({
    id: post.id,
    title: post.title.charAt(0).toUpperCase() + post.title.slice(1),
    summary: post.body.substring(0, 100) + '...',
    wordCount: post.body.split(' ').length,
  }));
});

// 服务端API示例 - 待办事项
const todoFilter = ref('all');
const todosPending = ref(false);
const todos = ref([
  { id: 1, text: '学习Nuxt 3基础', completed: true },
  { id: 2, text: '掌握数据获取方法', completed: false },
  { id: 3, text: '构建服务端API', completed: false },
  { id: 4, text: '实现SSR功能', completed: false },
  { id: 5, text: '部署应用', completed: false },
]);
const filteredTodos = ref([]);

// 模拟API调用
async function fetchFilteredTodos() {
  todosPending.value = true;

  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 根据筛选条件过滤
  if (todoFilter.value === 'all') {
    filteredTodos.value = [...todos.value];
  } else if (todoFilter.value === 'completed') {
    filteredTodos.value = todos.value.filter((todo) => todo.completed);
  } else {
    filteredTodos.value = todos.value.filter((todo) => !todo.completed);
  }

  todosPending.value = false;
}

// 切换待办事项状态
function toggleTodo(todo) {
  todo.completed = !todo.completed;
  // 在实际应用中，这里应该调用API更新服务器上的数据
}

// 初始加载
fetchFilteredTodos();
</script>
