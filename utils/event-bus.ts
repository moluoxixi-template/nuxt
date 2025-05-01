/*
 * @Author: Claude AI
 * @Date: 2025-05-01
 * @Description: 事件总线工具，用于组件和服务之间的通信
 */

interface EventHandler {
  (payload?: any): void;
}

interface EventBus {
  on(event: string, handler: EventHandler): void;
  off(event: string, handler?: EventHandler): void;
  once(event: string, handler: EventHandler): void;
  emit(event: string, payload?: any): void;
}

export function createEventBus(): EventBus {
  const listeners: Record<string, EventHandler[]> = {};

  return {
    // 监听事件
    on(event: string, handler: EventHandler): void {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(handler);
    },

    // 取消监听
    off(event: string, handler?: EventHandler): void {
      if (!listeners[event]) return;

      if (!handler) {
        // 如果没有提供处理函数，移除所有该事件的监听器
        delete listeners[event];
      } else {
        // 移除特定的处理函数
        listeners[event] = listeners[event].filter((h) => h !== handler);
      }
    },

    // 只监听一次
    once(event: string, handler: EventHandler): void {
      const onceHandler: EventHandler = (payload) => {
        handler(payload);
        this.off(event, onceHandler);
      };
      this.on(event, onceHandler);
    },

    // 触发事件
    emit(event: string, payload?: any): void {
      if (!listeners[event]) return;

      listeners[event].forEach((handler) => {
        try {
          handler(payload);
        } catch (error) {
          console.error(`EventBus: 事件处理错误 [${event}]`, error);
        }
      });
    },
  };
}

// 创建一个默认的全局事件总线实例
export const eventBus = createEventBus();
