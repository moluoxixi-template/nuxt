<!--
 * @Author: Claude AI
 * @Date: 2025-05-01
 * @Description: 状态管理示例
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
      <h1 class="text-2xl font-bold">状态管理</h1>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-blue-50">
        <h2 class="text-lg font-semibold text-gray-800">Vue组合式API状态管理</h2>
      </div>
      <div class="p-6">
        <p class="mb-4 text-gray-700">
          在Vue 3中，我们可以使用组合式API (Composition API)
          实现简单的状态管理，比如使用ref、reactive和provide/inject。
        </p>

        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <p class="text-sm font-medium text-gray-700 mb-2">使用响应式API:</p>
          <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// composables/useCounter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  return {
    count,
    increment,
    decrement
  }
}
          </pre>
        </div>

        <div class="mt-6">
          <h3 class="font-medium text-gray-800 mb-3">本地计数器示例</h3>
          <div class="flex items-center space-x-4">
            <button
              class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded"
              @click="decrementLocal"
            >
              -
            </button>
            <span class="text-2xl font-bold text-gray-800">{{ localCount }}</span>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              @click="incrementLocal"
            >
              +
            </button>
          </div>
          <p class="text-sm text-gray-600 mt-2">
            这是一个使用本地响应式状态的计数器。每次刷新页面，计数会重置。
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-green-50">
        <h2 class="text-lg font-semibold text-gray-800">Pinia状态管理</h2>
      </div>
      <div class="p-6">
        <p class="mb-4 text-gray-700">
          Pinia是Vue官方推荐的状态管理库，它提供了更强大的状态管理功能，包括状态持久化、模块化和开发者工具集成。
        </p>

        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <p class="text-sm font-medium text-gray-700 mb-2">定义Pinia Store:</p>
          <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // 状态
  state: () => ({
    count: 0,
    history: []
  }),
  
  // 计算属性
  getters: {
    doubleCount: (state) => state.count * 2,
    lastActions: (state) => state.history.slice(-5)
  },
  
  // 方法/动作
  actions: {
    increment() {
      this.count++
      this.history.push({ type: 'increment', timestamp: new Date() })
    },
    decrement() {
      this.count--
      this.history.push({ type: 'decrement', timestamp: new Date() })
    },
    reset() {
      this.count = 0
      this.history = []
    }
  }
})
          </pre>
        </div>

        <div class="mt-6">
          <h3 class="font-medium text-gray-800 mb-3">Pinia计数器示例</h3>
          <div class="flex items-center space-x-4 mb-4">
            <button
              class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              @click="counterStore.decrement"
            >
              -
            </button>
            <span class="text-2xl font-bold text-gray-800">{{ counterStore.count }}</span>
            <button
              class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              @click="counterStore.increment"
            >
              +
            </button>
            <button
              class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded ml-4"
              @click="counterStore.reset"
            >
              重置
            </button>
          </div>

          <div class="text-sm text-gray-700 mb-3">
            <p>
              计算属性 (双倍值): <span class="font-medium">{{ counterStore.doubleCount }}</span>
            </p>
          </div>

          <div v-if="counterStore.lastActions.length" class="mt-4">
            <h4 class="font-medium text-gray-700 mb-2">最近操作历史</h4>
            <ul class="border rounded divide-y">
              <li
                v-for="(action, index) in counterStore.lastActions"
                :key="index"
                class="p-2 text-sm"
              >
                <span
                  class="inline-block px-2 py-1 rounded"
                  :class="{
                    'bg-blue-100 text-blue-800': action.type === 'increment',
                    'bg-red-100 text-red-800': action.type === 'decrement',
                  }"
                >
                  {{ action.type === 'increment' ? '增加' : '减少' }}
                </span>
                <span class="text-gray-500 ml-2">{{ formatTime(action.timestamp) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-purple-50">
        <h2 class="text-lg font-semibold text-gray-800">组件间状态共享</h2>
      </div>
      <div class="p-6">
        <p class="mb-4 text-gray-700">
          Pinia的一个主要优势是组件间状态共享变得简单。无论组件在哪里，都可以访问相同的状态。
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <!-- 组件A -->
          <div class="border rounded-lg p-4 bg-gray-50">
            <h3 class="font-medium text-gray-800 mb-3">组件A</h3>
            <div class="flex flex-col items-center">
              <div class="text-5xl font-bold text-blue-600 mb-2">{{ counterStore.count }}</div>
              <div class="flex space-x-2">
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                  @click="counterStore.decrement"
                >
                  -
                </button>
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                  @click="counterStore.increment"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <!-- 组件B -->
          <div class="border rounded-lg p-4 bg-gray-50">
            <h3 class="font-medium text-gray-800 mb-3">组件B</h3>
            <div class="flex flex-col items-center">
              <div class="text-5xl font-bold text-purple-600 mb-2">{{ counterStore.count }}</div>
              <div class="flex space-x-2">
                <button
                  class="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded"
                  @click="counterStore.decrement"
                >
                  -
                </button>
                <button
                  class="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded"
                  @click="counterStore.increment"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <p class="text-sm text-gray-600 mt-4">
          注意两个组件使用同一个Store，所以它们的状态始终保持同步。
        </p>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="p-5 bg-yellow-50">
        <h2 class="text-lg font-semibold text-gray-800">状态持久化</h2>
      </div>
      <div class="p-6">
        <p class="mb-4 text-gray-700">
          使用插件和第三方库，可以轻松地实现状态持久化，使状态在页面刷新后仍然保持。
        </p>

        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <p class="text-sm font-medium text-gray-700 mb-2">使用pinia-plugin-persistedstate:</p>
          <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ]
})

// stores/persistedCounter.js
import { defineStore } from 'pinia'

export const usePersistedCounter = defineStore('persistedCounter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() { this.count++ },
    decrement() { this.count-- }
  },
  persist: {
    storage: persistedState.localStorage
  }
})
          </pre>
        </div>

        <div class="mt-6">
          <h3 class="font-medium text-gray-800 mb-3">模拟持久化计数器</h3>
          <div class="p-4 border rounded-lg bg-yellow-50">
            <div class="flex items-center space-x-4 mb-4">
              <button
                class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                @click="decrementPersisted"
              >
                -
              </button>
              <span class="text-2xl font-bold text-gray-800">{{ persistedCount }}</span>
              <button
                class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                @click="incrementPersisted"
              >
                +
              </button>
            </div>
            <p class="text-sm text-gray-700">
              此计数器模拟了持久化效果，刷新页面后计数值不会重置。
              <br >
              <span class="text-xs text-gray-500">
                (注：此处为演示目的使用localStorage模拟，实际项目应该使用pinia-plugin-persistedstate插件)
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: '',
  title: '状态管理示例',
});

const router = useRouter();

// 本地状态管理示例
const localCount = ref(0);

function incrementLocal() {
  localCount.value++;
}

function decrementLocal() {
  localCount.value = Math.max(0, localCount.value - 1);
}

// 模拟Pinia Store
const counterStore = reactive({
  count: 0,
  history: [],
  get doubleCount() {
    return this.count * 2;
  },
  get lastActions() {
    return this.history.slice(-5);
  },
  increment() {
    this.count++;
    this.history.push({ type: 'increment', timestamp: new Date() });
  },
  decrement() {
    this.count--;
    this.history.push({ type: 'decrement', timestamp: new Date() });
  },
  reset() {
    this.count = 0;
    this.history = [];
  },
});

// 格式化时间
function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// 模拟持久化状态
const persistedCount = ref(0);

function loadPersistedCount() {
  try {
    const savedCount = localStorage.getItem('demo-persisted-count');
    if (savedCount !== null) {
      persistedCount.value = parseInt(savedCount, 10);
    }
  } catch (error) {
    console.error('无法从localStorage加载数据:', error);
  }
}

function savePersistedCount() {
  try {
    localStorage.setItem('demo-persisted-count', persistedCount.value.toString());
  } catch (error) {
    console.error('无法保存数据到localStorage:', error);
  }
}

function incrementPersisted() {
  persistedCount.value++;
  savePersistedCount();
}

function decrementPersisted() {
  persistedCount.value = Math.max(0, persistedCount.value - 1);
  savePersistedCount();
}

// 加载持久化状态
onMounted(() => {
  loadPersistedCount();
});
</script>
