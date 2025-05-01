/*
 * @Author: Claude AI
 * @Date: 2025-05-01
 * @Description: 路由相关组合式函数
 */

/**
 * 获取面包屑导航数据
 */
export function useBreadcrumbs() {
  const route = useRoute();
  const router = useRouter();

  // 计算当前路由的面包屑
  const breadcrumbs = computed(() => {
    const paths = route.path.split('/').filter(Boolean);
    if (!paths.length) return [];

    const crumbs = [];
    let path = '';

    // 首页
    crumbs.push({
      name: '首页',
      path: '/',
      current: route.path === '/',
    });

    // 构建每一级路径的导航项
    for (let i = 0; i < paths.length; i++) {
      path += `/${paths[i]}`;

      // 获取路由配置
      const matched = router.resolve(path).matched[0];
      const name = matched?.meta?.title || paths[i];

      crumbs.push({
        name,
        path,
        current: path === route.path,
      });
    }

    return crumbs;
  });

  return {
    breadcrumbs,
  };
}

/**
 * 获取当前路由的标题
 */
export function useRouteTitle() {
  const route = useRoute();

  const title = computed(() => {
    return route.meta.title || '医生工作站';
  });

  // 监听标题变化，更新文档标题
  watch(
    title,
    (newTitle) => {
      if (process.client) {
        useHead({
          title: `${newTitle} - 医生工作站`,
        });
      }
    },
    { immediate: true }
  );

  return {
    title,
  };
}

/**
 * 获取父级路由
 */
export function useParentRoute() {
  const route = useRoute();
  const router = useRouter();

  const parentRoute = computed(() => {
    const paths = route.path.split('/').filter(Boolean);
    if (paths.length <= 1) return null;

    // 构建父路由路径
    const parentPath = `/${paths.slice(0, paths.length - 1).join('/')}`;
    const matched = router.resolve(parentPath).matched[0];

    if (matched) {
      return {
        path: parentPath,
        name: matched.name,
        title: matched.meta.title,
      };
    }

    return null;
  });

  return {
    parentRoute,
  };
}

/**
 * 获取路由权限
 */
export function useRoutePermission() {
  const route = useRoute();
  const userStore = useUserStore();

  const hasPermission = computed(() => {
    const requiredPermissions = route.meta.permissions;
    if (!requiredPermissions) return true;

    if (Array.isArray(requiredPermissions)) {
      return requiredPermissions.some((p) => userStore.hasPermission(p));
    }

    return userStore.hasPermission(requiredPermissions as string);
  });

  return {
    hasPermission,
  };
}
