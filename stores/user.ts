/*
 * @Author: Claude AI
 * @Date: 2025-05-01
 * @Description: 用户状态管理
 */
import { defineStore } from 'pinia';
import { eventBus } from '~/utils/event-bus';

export interface User {
  id: string;
  username: string;
  name: string;
  avatar?: string;
  email?: string;
  roles: string[];
  permissions: string[];
  token?: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: '',
    roles: [] as string[],
    permissions: [] as string[],
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,

    // 检查是否有特定角色
    hasRole: (state) => {
      return (role: string) => state.roles.includes(role);
    },

    // 检查是否有特定权限
    hasPermission: (state) => {
      return (permission: string) => state.permissions.includes(permission);
    },
  },

  actions: {
    // 设置用户信息
    setUser(user: User) {
      this.user = user;
      this.roles = user.roles || [];
      this.permissions = user.permissions || [];

      if (user.token) {
        this.setToken(user.token);
      }

      // 发出用户更新事件
      eventBus.emit('user:update', user);
    },

    // 设置Token
    setToken(token: string) {
      this.token = token;
      // 保存到 cookie，7天有效期
      const tokenCookie = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 });
      tokenCookie.value = token;
    },

    // 清除用户信息
    clearUser() {
      this.user = null;
      this.token = '';
      this.roles = [];
      this.permissions = [];

      // 清除 cookie
      const tokenCookie = useCookie('auth_token');
      tokenCookie.value = null;

      // 发出用户登出事件
      eventBus.emit('user:logout');
    },

    // 从 Token 恢复用户会话
    async restoreSession() {
      try {
        const tokenCookie = useCookie('auth_token');
        if (tokenCookie.value) {
          this.token = tokenCookie.value;

          // 从服务器获取当前用户信息
          const userInfo = await $fetch('/api/user/current');
          if (userInfo) {
            this.setUser(userInfo as User);
            return true;
          }
        }
      } catch (error) {
        console.error('恢复会话失败:', error);
        this.clearUser();
      }

      return false;
    },

    // 登录
    async login(credentials: { username: string; password: string }) {
      try {
        const result = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials,
        });

        if (result && result.token) {
          this.setUser(result as User);
          return true;
        }
      } catch (error) {
        console.error('登录失败:', error);
        throw error;
      }

      return false;
    },

    // 登出
    async logout() {
      try {
        if (this.token) {
          // 通知服务器登出
          await $fetch('/api/auth/logout', {
            method: 'POST',
          });
        }
      } catch (error) {
        console.error('登出API调用失败:', error);
      } finally {
        // 无论服务器响应如何，都清除本地状态
        this.clearUser();
      }
    },
  },
});
