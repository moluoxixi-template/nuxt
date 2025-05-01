<!--
 * @Author: moluoxixi 1983531544@qq.com
 * @Date: 2025-04-30 12:10:00
 * @LastEditors: moluoxixi 1983531544@qq.com
 * @LastEditTime: 2025-05-01 18:38:10
 * @FilePath: \clinicDoctor\layouts\shadcn.vue
 * @Description: 基于Shadcn Menubar的导航布局
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- 顶部导航栏 -->
    <div class="h-[54px] bg-[#327bff] flex justify-center">
      <div class="w-full flex justify-center items-center">
        <div class="w-full px-4">
          <Menubar class="bg-transparent border-none w-full">
            <MenubarMenu v-for="page in topLevelPages" :key="page.path">
              <MenubarTrigger
                class="h-[54px] text-white hover:bg-white hover:text-[#327bff] data-[state=open]:bg-white data-[state=open]:text-[#327bff]"
                :class="{ 'bg-white text-[#327bff]': page.path === defaultTab }"
                @click="navigateTo(page)"
              >
                {{ page.name }}
              </MenubarTrigger>
              <MenubarContent v-if="page.children?.length" class="min-w-[160px]">
                <MenubarItem
                  v-for="child in page.children"
                  :key="child.path"
                  class="cursor-pointer"
                  @click="navigateTo(child)"
                >
                  {{ child.name }}
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="flex flex-col h-[calc(100vh-54px)]">
      <!-- 页面标题栏 -->
      <div class="h-[32px] bg-white px-4 border-b border-gray-200 flex items-center">
        <div class="text-gray-800 text-sm font-medium" :class="{ 'text-[#327bff]': isActiveTitle }">
          {{ $route.meta?.title || getCurrentPageName($route.path) || '首页' }}
        </div>
      </div>

      <!-- 主内容区域 -->
      <div class="flex flex-1">
        <!-- 侧边栏 -->
        <div class="w-[38px] border-r border-gray-200">
          <div class="flex flex-col h-full">
            <!-- 当前路由有子路由时显示二级菜单 -->
            <template v-if="currentParentPage && currentParentPage.children?.length">
              <div
                v-for="child in currentParentPage.children"
                :key="child.path"
                class="py-4 flex flex-col items-center text-gray-500 cursor-pointer hover:text-[#327bff]"
                :class="{ 'text-[#327bff] bg-blue-50': $route.path === child.path }"
                @click="navigateTo(child.path)"
              >
                <div class="text-xl mb-1">
                  <span class="w-5 h-5 flex justify-center">{{ child.name.charAt(0) }}</span>
                </div>
                <div class="text-xs">{{ child.name }}</div>
              </div>
            </template>

            <!-- 否则显示默认的功能菜单 -->
            <template v-else>
              <div
                v-for="(item, index) in sideMenuItems"
                :key="index"
                class="py-4 flex flex-col items-center text-gray-500 cursor-pointer hover:text-[#327bff]"
                :class="{ 'text-[#327bff] bg-blue-50': item.active }"
                @click="activateSideMenu(index)"
              >
                <div class="mb-1">
                  <svg
                    v-if="item.icon === 'document'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'menu'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'location'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'setting'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div class="text-xs">{{ item.label }}</div>
              </div>
            </template>
          </div>
        </div>

        <!-- 主内容 -->
        <div class="flex-1 p-4 bg-gray-50">
          <transition name="fade" mode="out-in">
            <slot />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from '#imports';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@/ui/menubar';

const router = useRouter();
const route = useRoute();

// 导航函数
function navigateTo(page) {
  if (page.children?.length) {
    return;
  } else {
    router.push(page.path);
  }
}

// 侧边栏菜单项
const sideMenuItems = ref([
  { icon: 'document', label: '文档', active: true },
  { icon: 'menu', label: '菜单', active: false },
  { icon: 'location', label: '位置', active: false },
  { icon: 'setting', label: '设置', active: false },
]);

// 激活侧边栏菜单项
function activateSideMenu(index) {
  sideMenuItems.value.forEach((item, i) => {
    item.active = i === index;
  });
}

// 计算默认选中的标签
const defaultTab = computed(() => {
  // 如果当前路由是子路由，返回父路由路径
  const parentRoute = findParentRoute(route.path);
  if (parentRoute) {
    return parentRoute.path;
  }

  return route.path;
});

// 标题是否激活
const isActiveTitle = computed(() => {
  return true;
});

// 获取页面结构
const { data: nestedPages } = await useAsyncData('pages', async () => {
  return resolvePages();
});

// 顶层页面（用于导航菜单）
const topLevelPages = computed(() => {
  if (!nestedPages.value) return [];
  // 组织成层级结构
  return buildNestedRoutes(nestedPages.value || []);
});

// 当前父页面（有子路由的页面）
const currentParentPage = computed(() => {
  if (!nestedPages.value) return null;
  return findParentRoute(route.path);
});

// 根据当前路径查找父级路由
function findParentRoute(path) {
  if (!topLevelPages.value) return null;

  // 检查是否为根路径
  if (path === '/') return null;

  // 1. 直接匹配
  const directMatch = topLevelPages.value.find((page) => page.path === path);
  if (directMatch) return null; // 如果是顶层路由，返回null

  // 2. 查找父路由
  for (const page of topLevelPages.value) {
    if (page.children && page.children.some((child) => child.path === path)) {
      return page;
    }
  }

  // 3. 路径前缀匹配
  const segments = path.split('/');
  if (segments.length > 2) {
    const parentPath = '/' + segments[1];
    return topLevelPages.value.find((page) => page.path === parentPath) || null;
  }

  return null;
}

// 获取当前页面名称
function getCurrentPageName(path) {
  // 检查是否是子路由
  const parent = findParentRoute(path);
  if (parent) {
    const child = parent.children?.find((c) => c.path === path);
    return child ? child.name : null;
  }

  // 直接查找
  const page = nestedPages.value?.find((p) => p.path === path);
  return page ? page.name : null;
}

// 构建嵌套路由结构
function buildNestedRoutes(routes) {
  // 用于存储顶层路由
  const topLevel = [];
  // 存储子路由映射
  const childrenMap = {};

  // 首先找出所有潜在的顶层路由
  for (const route of routes) {
    const segments = route.path.split('/').filter(Boolean);

    // 如果路径只有一段，这是顶层路由
    if (segments.length === 1) {
      topLevel.push({ ...route, children: [] });
    }
    // 如果路径有多段，尝试找到它的父路由
    else if (segments.length > 1) {
      const parentPath = `/${segments[0]}`;
      if (!childrenMap[parentPath]) {
        childrenMap[parentPath] = [];
      }
      childrenMap[parentPath].push(route);
    }
  }

  // 为每个顶层路由添加子路由
  for (const parent of topLevel) {
    if (childrenMap[parent.path]) {
      parent.children = childrenMap[parent.path];
    }
  }

  return topLevel;
}

// 解析页面，生成菜单结构
async function resolvePages() {
  const routes = router.getRoutes();

  return routes
    .filter((route) => route.path !== '/' && !route.path.startsWith('/_'))
    .map((route) => {
      // 格式化路由名称，将路径中的破折号转换为空格并标题化
      const pathName = route.path.split('/').pop() || '';
      const formattedName = pathName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        name: route.meta?.title || route.name || formattedName || '',
        path: route.path,
        meta: route.meta,
      };
    });
}
</script>
