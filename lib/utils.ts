/*
 * @Author: moluoxixi 1983531544@qq.com
 * @Date: 2025-04-29 17:55:32
 * @LastEditors: moluoxixi 1983531544@qq.com
 * @LastEditTime: 2025-05-01 19:05:19
 * @FilePath: \clinicDoctor\lib\utils.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
