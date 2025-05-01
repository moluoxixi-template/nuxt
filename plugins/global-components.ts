/*
 * @Author: Claude AI
 * @Date: 2025-05-01
 * @Description: 全局组件注册插件
 */

export default defineNuxtPlugin((nuxtApp) => {
  // 这里可以注册全局组件
  // 例如，如果有自定义组件:
  // nuxtApp.vueApp.component('AppButton', AppButton)

  // 全局指令注册
  nuxtApp.vueApp.directive('focus', {
    mounted(el) {
      el.focus();
    },
  });

  // 防抖指令
  nuxtApp.vueApp.directive('debounce', {
    mounted(el, binding) {
      if (binding.value && typeof binding.value === 'function') {
        const func = binding.value;
        const delay = binding.arg ? parseInt(binding.arg) : 300;
        let timer: any = null;

        el.addEventListener('click', () => {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            func();
          }, delay);
        });
      }
    },
  });

  // 长按指令
  nuxtApp.vueApp.directive('longpress', {
    mounted(el, binding) {
      if (binding.value && typeof binding.value === 'function') {
        let pressTimer: any = null;
        const func = binding.value;
        const duration = binding.arg ? parseInt(binding.arg) : 1000;

        const start = (e: Event) => {
          if (e.type === 'click') return;
          if (pressTimer === null) {
            pressTimer = setTimeout(() => {
              func();
            }, duration);
          }
        };

        const cancel = () => {
          if (pressTimer !== null) {
            clearTimeout(pressTimer);
            pressTimer = null;
          }
        };

        el.addEventListener('mousedown', start);
        el.addEventListener('touchstart', start);
        el.addEventListener('click', cancel);
        el.addEventListener('mouseout', cancel);
        el.addEventListener('touchend', cancel);
        el.addEventListener('touchcancel', cancel);
      }
    },
  });

  // 权限控制指令
  nuxtApp.vueApp.directive('permission', {
    mounted(el, binding) {
      const permission = binding.value;
      const userRoles = useUserStore().roles || [];

      // 校验权限
      const hasPermission =
        typeof permission === 'string'
          ? userRoles.includes(permission)
          : Array.isArray(permission)
            ? permission.some((p) => userRoles.includes(p))
            : false;

      if (!hasPermission) {
        // 无权限时移除元素
        el.parentNode?.removeChild(el);
      }
    },
  });
});
