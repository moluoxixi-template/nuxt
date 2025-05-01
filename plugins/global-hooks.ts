/*
 * @Author: Claude AI
 * @Date: 2025-05-01
 * @Description: 全局钩子系统，提供路由钩子、错误处理和事件总线
 */
import { createEventBus } from '~/utils/event-bus';
import { ElLoading } from 'element-plus';
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading';

export default defineNuxtPlugin((nuxtApp) => {
  // 创建事件总线
  const eventBus = createEventBus();

  // 全局错误处理
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('全局Vue错误:', error);
    eventBus.emit('error:global', { error, info });

    // 可以在这里添加错误上报逻辑
    // reportErrorToService(error, info)
  };

  // 未捕获的promise错误
  if (process.client) {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('未处理的Promise错误:', event.reason);
      eventBus.emit('error:promise', event.reason);
    });
  }

  // 路由钩子
  const router = useRouter();

  // 页面加载进度
  let loadingInstance: LoadingInstance | null = null;

  router.beforeEach((to, from, next) => {
    // 开始页面加载进度
    if (process.client) {
      loadingInstance = ElLoading.service({
        fullscreen: true,
        text: '加载中...',
      });
    }

    // 页面标题设置
    if (to.meta.title && process.client) {
      document.title = `${to.meta.title} - 医生工作站`;
    } else if (process.client) {
      document.title = '医生工作站';
    }

    // 触发路由变化事件
    eventBus.emit('router:before-each', { to, from });

    next();
  });

  router.afterEach((to, from) => {
    // 结束页面加载进度
    if (process.client && loadingInstance) {
      loadingInstance.close();
    }

    // 触发路由完成事件
    eventBus.emit('router:after-each', { to, from });

    // 页面访问统计
    if (process.client) {
      eventBus.emit('page:view', {
        path: to.path,
        query: to.query,
        timestamp: new Date().getTime(),
      });
    }
  });

  // 注册到全局
  nuxtApp.provide('eventBus', eventBus);

  return {
    provide: {
      eventBus,
    },
  };
});
