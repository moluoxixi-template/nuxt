/*
 * @Author: Claude AI
 * @Date: 2025-05-01
 * @Description: API请求拦截器，处理请求头、错误处理和响应转换
 */
import { eventBus } from '~/utils/event-bus';
import { ElMessage } from 'element-plus';

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();
  const router = useRouter();

  globalThis.$fetch = $fetch.create({
    // 全局错误处理
    onRequestError({ request, error }) {
      console.error('请求错误:', error);
      eventBus.emit('api:request-error', { request, error });
    },

    // 请求拦截器
    onRequest({ request, options }) {
      // 开始loading
      eventBus.emit('api:request-start', { request, options });

      // 添加认证Token
      const token = useCookie('auth_token').value;
      if (token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
      }

      // 添加时间戳防止缓存
      if (options.method === 'GET') {
        options.params = options.params || {};
        options.params._t = Date.now();
      }
    },

    // 响应拦截器
    onResponse({ request, response, options }) {
      // 结束loading
      eventBus.emit('api:request-end', { request, response });

      // 处理业务逻辑错误
      const data = response._data;

      // 假设API返回结构为 { code: number, message: string, data: any }
      if (data && data.code !== undefined && data.code !== 0 && data.code !== 200) {
        // 统一处理业务错误
        switch (data.code) {
          case 401: // 未授权
            useCookie('auth_token').value = null;
            router.push('/login');
            ElMessage.error('登录已过期，请重新登录');
            break;

          case 403: // 无权限
            ElMessage.error('无操作权限');
            break;

          default:
            ElMessage.error(data.message || '操作失败');
        }

        eventBus.emit('api:business-error', {
          code: data.code,
          message: data.message,
          request,
        });
      }

      // 可以在这里对响应数据进行统一处理
      // 例如：只返回实际数据部分
      if (data && data.data !== undefined) {
        response._data = data.data;
      }
    },

    // 响应错误处理
    onResponseError({ request, response, error }) {
      eventBus.emit('api:response-error', { request, response, error });

      // 错误状态码处理
      if (response && response.status) {
        switch (response.status) {
          case 401:
            useCookie('auth_token').value = null;
            router.push('/login');
            ElMessage.error('请先登录');
            break;

          case 404:
            ElMessage.error('请求的资源不存在');
            break;

          case 500:
            ElMessage.error('服务器内部错误');
            break;

          default:
            ElMessage.error(`请求失败(${response.status})`);
        }
      } else {
        // 网络错误等
        ElMessage.error('网络连接失败，请检查网络设置');
      }
    },
  });
});
