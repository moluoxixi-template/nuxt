<!--
 * @Author: Claude AI
 * @Date: 2025-05-01
 * @Description: API服务封装示例
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
      <h1 class="text-2xl font-bold">API服务封装</h1>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-blue-50">
        <h2 class="text-lg font-semibold text-gray-800">API服务封装概念</h2>
      </div>
      <div class="p-6">
        <p class="mb-4 text-gray-700">
          API服务封装是将API调用和数据处理逻辑从视图层中分离出来，使代码更易于维护和测试。通过创建专门的服务类或函数来处理API交互，我们可以:
        </p>
        <ul class="list-disc ml-5 mb-4 space-y-1 text-gray-700">
          <li>提高代码复用性，避免在多个组件中重复编写相似的API调用</li>
          <li>集中管理API端点和请求配置</li>
          <li>统一处理错误和加载状态</li>
          <li>简化数据转换和处理流程</li>
          <li>更容易进行单元测试</li>
        </ul>

        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-sm font-medium text-gray-700 mb-2">项目中的API服务结构示例:</p>
          <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
            api/
              ├── models/             # 数据模型定义
              │   ├── user.ts
              │   └── patient.ts
              ├── services/           # 服务实现
              │   ├── index.ts        # 服务导出
              │   ├── user-service.ts # 用户相关API
              │   └── patient-service.ts
              └── index.ts            # API模块入口
          </pre>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-green-50">
        <h2 class="text-lg font-semibold text-gray-800">服务实现示例</h2>
      </div>
      <div class="p-6">
        <p class="mb-4 text-gray-700">
          以下是一个典型的API服务实现示例。每个服务处理特定类型的API请求。
        </p>

        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <p class="text-sm font-medium text-gray-700 mb-2">用户服务实现:</p>
          <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// api/services/user-service.ts
import type { User, UserLoginRequest, UserResponse } from '../models/user';

export class UserService {
  private apiBase = '/api/users';

  // 获取用户列表
  async getUsers() {
    return await $fetch(this.apiBase);
  }

  // 获取单个用户
  async getUser(id: string) {
    try {
      return await $fetch(`${this.apiBase}/${id}`);
    } catch (error) {
      console.error('获取用户失败:', error);
      return null;
    }
  }

  // 用户登录
  async login(credentials) {
    return await $fetch(`${this.apiBase}/login`, {
      method: 'POST',
      body: credentials
    });
  }

  // 创建用户
  async createUser(user) {
    return await $fetch(this.apiBase, {
      method: 'POST',
      body: user
    });
  }
}
          </pre>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-sm font-medium text-gray-700 mb-2">使用Composition API暴露服务:</p>
          <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// api/index.ts
import { UserService, PatientService } from './services';

// 创建服务实例
const userService = new UserService();
const patientService = new PatientService();

// 提供Composition API风格的接口
export function useUserService() {
  return userService;
}

export function usePatientService() {
  return patientService;
}

// 也可以直接导出服务集合
export const services = {
  user: userService,
  patient: patientService
};
          </pre>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div class="p-5 bg-purple-50">
        <h2 class="text-lg font-semibold text-gray-800">实际应用示例</h2>
      </div>
      <div class="p-6">
        <div class="mb-6">
          <h3 class="font-medium text-gray-800 mb-3">患者管理模块</h3>

          <div class="flex items-center mb-4 space-x-2">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm"
              :disabled="loading"
              @click="loadPatients"
            >
              {{ loading ? '加载中...' : '获取患者列表' }}
            </button>
            <button
              class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-sm"
              @click="showAddPatientForm = true"
            >
              添加患者
            </button>
          </div>

          <!-- 错误信息 -->
          <div v-if="error" class="p-3 bg-red-50 text-red-700 rounded mb-4">
            {{ error }}
          </div>

          <!-- 患者列表 -->
          <div v-if="patients.length > 0" class="mb-4">
            <div
              class="bg-gray-100 grid grid-cols-12 p-3 rounded-t font-medium text-gray-600 text-sm"
            >
              <div class="col-span-1">#</div>
              <div class="col-span-3">姓名</div>
              <div class="col-span-3">身份证号</div>
              <div class="col-span-3">联系电话</div>
              <div class="col-span-2">操作</div>
            </div>
            <div class="border rounded-b divide-y">
              <div
                v-for="(patient, index) in patients"
                :key="patient.id"
                class="grid grid-cols-12 p-3 items-center text-sm"
                :class="{ 'bg-gray-50': index % 2 === 0 }"
              >
                <div class="col-span-1 text-gray-500">{{ index + 1 }}</div>
                <div class="col-span-3">{{ patient.name }}</div>
                <div class="col-span-3 text-gray-600">{{ patient.idCard }}</div>
                <div class="col-span-3">{{ patient.phone }}</div>
                <div class="col-span-2">
                  <button
                    class="text-blue-600 hover:text-blue-800 mr-2"
                    @click="viewPatient(patient)"
                  >
                    查看
                  </button>
                  <button
                    class="text-red-600 hover:text-red-800"
                    @click="deletePatient(patient.id)"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="!loading" class="p-4 text-center text-gray-500">暂无患者数据</div>
        </div>

        <!-- 添加患者表单 -->
        <div
          v-if="showAddPatientForm"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 class="text-lg font-medium text-gray-900 mb-4">添加新患者</h3>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">姓名</label>
                <input
                  v-model="newPatient.name"
                  type="text"
                  class="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">身份证号</label>
                <input
                  v-model="newPatient.idCard"
                  type="text"
                  class="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">联系电话</label>
                <input
                  v-model="newPatient.phone"
                  type="text"
                  class="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">地址</label>
                <input
                  v-model="newPatient.address"
                  type="text"
                  class="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <button
                class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                @click="showAddPatientForm = false"
              >
                取消
              </button>
              <button
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                :disabled="addingPatient"
                @click="addPatient"
              >
                {{ addingPatient ? '添加中...' : '添加' }}
              </button>
            </div>
          </div>
        </div>

        <!-- 患者详情 -->
        <div
          v-if="selectedPatient"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 class="text-lg font-medium text-gray-900 mb-4">患者详情</h3>

            <div class="space-y-3">
              <div class="flex border-b pb-2">
                <span class="w-24 text-gray-600">姓名:</span>
                <span class="font-medium">{{ selectedPatient.name }}</span>
              </div>
              <div class="flex border-b pb-2">
                <span class="w-24 text-gray-600">身份证号:</span>
                <span class="font-medium">{{ selectedPatient.idCard }}</span>
              </div>
              <div class="flex border-b pb-2">
                <span class="w-24 text-gray-600">联系电话:</span>
                <span class="font-medium">{{ selectedPatient.phone }}</span>
              </div>
              <div class="flex border-b pb-2">
                <span class="w-24 text-gray-600">地址:</span>
                <span class="font-medium">{{ selectedPatient.address }}</span>
              </div>
              <div class="flex border-b pb-2">
                <span class="w-24 text-gray-600">注册时间:</span>
                <span class="font-medium">{{ selectedPatient.createdAt }}</span>
              </div>
            </div>

            <div class="mt-6 flex justify-end">
              <button
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                @click="selectedPatient = null"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="p-5 bg-pink-50">
        <h2 class="text-lg font-semibold text-gray-800">服务层设计最佳实践</h2>
      </div>
      <div class="p-6">
        <div class="mb-6">
          <h3 class="font-medium text-gray-800 mb-2">1. 统一错误处理</h3>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// 在基础服务类中实现错误处理
class BaseService {
  // 统一请求处理方法
  async handleRequest(requestFn) {
    try {
      const data = await requestFn();
      return [data, null];
    } catch (error) {
      console.error('API错误:', error);
      return [null, error instanceof Error ? error : new Error('未知错误')];
    }
  }
}

// 在具体服务中使用
class UserService extends BaseService {
  async getUser(id) {
    const [data, error] = await this.handleRequest(() => 
      $fetch(`/api/users/${id}`)
    );
    
    if (error) {
      // 处理错误...
      return null;
    }
    
    return data;
  }
}
            </pre>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="font-medium text-gray-800 mb-2">2. 请求拦截与响应处理</h3>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// 配置带拦截器的全局HTTP客户端
const httpClient = $fetch.create({
  // 基础URL
  baseURL: '/api',
  
  // 请求拦截
  onRequest({ options }) {
    // 添加认证token
    const token = localStorage.getItem('auth_token');
    if (token) {
      options.headers = options.headers || {};
      options.headers.Authorization = `Bearer ${token}`;
    }
  },
  
  // 响应拦截
  onResponse({ response }) {
    // 处理特定状态码
    if (response.status === 401) {
      // 处理未授权响应
      navigateTo('/login');
    }
  }
});

// 在服务中使用配置好的客户端
export class AuthService {
  async login(credentials) {
    return await httpClient('/auth/login', {
      method: 'POST',
      body: credentials
    });
  }
}
            </pre>
          </div>
        </div>

        <div>
          <h3 class="font-medium text-gray-800 mb-2">3. 模型转换与数据规范化</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <pre class="text-xs sm:text-sm text-gray-800 overflow-auto">
// 模型类与转换方法
class PatientModel {
  constructor() {
    this.id = '';
    this.name = '';
    // 其他属性...
  }
  
  // 从API响应创建模型实例
  static fromApiResponse(data) {
    const patient = new PatientModel();
    patient.id = data.id;
    patient.name = data.name || '未知姓名';
    // 处理其他属性，包括数据转换、默认值等
    return patient;
  }
  
  // 将模型转换为API请求格式
  toApiRequest() {
    return {
      id: this.id,
      name: this.name,
      // 其他需要发送的字段
    };
  }
}

// 在服务中使用模型转换
class PatientService {
  async getPatients() {
    const response = await $fetch('/api/patients');
    return response.map(PatientModel.fromApiResponse);
  }
}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: '',
  title: 'API服务封装',
});

const router = useRouter();

// 模拟患者服务
class PatientService {
  // 模拟API调用延迟
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // 模拟患者数据
  patientsData = [
    {
      id: '1',
      name: '张三',
      idCard: '110101199001011234',
      phone: '13800138000',
      address: '北京市朝阳区建国路1号',
      createdAt: '2023-01-15',
    },
    {
      id: '2',
      name: '李四',
      idCard: '110101199102023456',
      phone: '13900139000',
      address: '北京市海淀区中关村大街10号',
      createdAt: '2023-02-20',
    },
    {
      id: '3',
      name: '王五',
      idCard: '110101199203034567',
      phone: '13700137000',
      address: '北京市西城区西单大街100号',
      createdAt: '2023-03-05',
    },
  ];

  // 获取患者列表
  async getPatients() {
    await this.delay(1000); // 模拟网络延迟
    return [...this.patientsData];
  }

  // 添加患者
  async addPatient(patient) {
    await this.delay(1000); // 模拟网络延迟

    // 验证
    if (!patient.name || !patient.idCard || !patient.phone) {
      throw new Error('患者信息不完整');
    }

    // 模拟创建新记录
    const newPatient = {
      ...patient,
      id: String(this.patientsData.length + 1),
      createdAt: new Date().toISOString().split('T')[0],
    };

    this.patientsData.push(newPatient);
    return newPatient;
  }

  // 删除患者
  async deletePatient(id) {
    await this.delay(800); // 模拟网络延迟
    const index = this.patientsData.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.patientsData.splice(index, 1);
      return true;
    }
    throw new Error('患者不存在');
  }
}

// 创建患者服务实例
const patientService = new PatientService();

// 状态
const patients = ref([]);
const loading = ref(false);
const error = ref('');
const showAddPatientForm = ref(false);
const addingPatient = ref(false);
const selectedPatient = ref(null);

// 新患者信息
const newPatient = ref({
  name: '',
  idCard: '',
  phone: '',
  address: '',
});

// 获取患者列表
async function loadPatients() {
  loading.value = true;
  error.value = '';

  try {
    patients.value = await patientService.getPatients();
  } catch (err) {
    error.value = err instanceof Error ? err.message : '获取患者列表失败';
  } finally {
    loading.value = false;
  }
}

// 添加患者
async function addPatient() {
  addingPatient.value = true;
  error.value = '';

  try {
    const patient = await patientService.addPatient(newPatient.value);
    patients.value.push(patient);
    showAddPatientForm.value = false;

    // 重置表单
    newPatient.value = {
      name: '',
      idCard: '',
      phone: '',
      address: '',
    };
  } catch (err) {
    error.value = err instanceof Error ? err.message : '添加患者失败';
  } finally {
    addingPatient.value = false;
  }
}

// 删除患者
async function deletePatient(id) {
  if (!confirm('确定要删除此患者记录吗？')) return;

  loading.value = true;
  error.value = '';

  try {
    await patientService.deletePatient(id);
    patients.value = patients.value.filter((p) => p.id !== id);
  } catch (err) {
    error.value = err instanceof Error ? err.message : '删除患者失败';
  } finally {
    loading.value = false;
  }
}

// 查看患者详情
function viewPatient(patient) {
  selectedPatient.value = patient;
}

// 初始化
loadPatients();
</script>
