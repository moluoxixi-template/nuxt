import type { RouteLocationNormalized } from 'vue-router';

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized) => {
  console.log('中间件触发', to.path, process.client ? '客户端' : '服务端');

  // 只处理根路由
  if (to.path === '/') {
    const router = useRouter();
    const routes = router.getRoutes();

    // 查找标记为home的路由
    const homeRoute = routes.find((route) => route.meta?.home);
    console.log('找到home路由:', homeRoute);

    if (homeRoute) {
      console.log('重定向到home路由:', homeRoute.path);
      return navigateTo(homeRoute.path);
    }

    // 备选:查找第一个非特殊路由
    const firstRoute = routes.find(
      (route) => !route.path.startsWith('/_') && route.path !== '/' && route.path !== '/index'
    );

    if (firstRoute) {
      console.log('重定向到第一个路由:', firstRoute.path);
      return navigateTo(firstRoute.path);
    }
  }
});
