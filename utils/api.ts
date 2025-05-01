/*
 * @Author: moluoxixi 1983531544@qq.com
 * @Date: 2025-04-30 08:55:31
 * @LastEditors: moluoxixi 1983531544@qq.com
 * @LastEditTime: 2025-05-01 18:23:41
 * @FilePath: \clinicDoctor\utils\api.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { useAppStore } from '~/stores/app';

export class BaseApi {
  protected baseURL: string;
  protected store: ReturnType<typeof useAppStore>;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
    this.store = useAppStore();
  }

  protected async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    this.store.setLoading(true);
    this.store.setError(null);

    try {
      const response = await fetch(`${this.baseURL}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      this.store.setError(error instanceof Error ? error.message : 'Unknown error');
      throw error;
    } finally {
      this.store.setLoading(false);
    }
  }

  protected get<T>(path: string, options: RequestInit = {}) {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  protected post<T>(path: string, data: any, options: RequestInit = {}) {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  protected put<T>(path: string, data: any, options: RequestInit = {}) {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  protected delete<T>(path: string, options: RequestInit = {}) {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}
