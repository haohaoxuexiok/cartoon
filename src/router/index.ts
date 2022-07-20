import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import localCache from "@/utils/cache";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    // redirect: '/main/user'
    redirect: "/main/analysis/videoAnalysis",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
    children: [
      {
        path: "/main/analysis/videoAnalysis",
        component: () =>
          import("@/views/main/analysis/videoAnalysis/videoAnalysis.vue"),
      },
      {
        path: "/main/system/user",
        component: () => import("@/views/main/system/user/user.vue"),
      },
      {
        path: "/main/system/staff",
        component: () => import("@/views/main/system/staff/staff.vue"),
      },
      {
        path: "/main/authority/role",
        component: () => import("@/views/main/authority/role/role.vue"),
      },
      {
        path: "/main/video/videoManage",
        component: () =>
          import("@/views/main/videoCenter/videoManage/videoManage.vue"),
      },
      {
        path: "/main/video/videoUpload",
        component: () =>
          import("@/views/main/videoCenter/videoUpload/videoUpload.vue"),
      },
      {
        path: "/main/record/recordMessage",
        component: () => import("@/views/main/record/record.vue"),
      },
      {
        path: "/main/authority/authorityList",
        component: () =>
          import("@/views/main/authority/authorityList/authorityList.vue"),
      },
      {
        path: "/main/analysis/stateAnalysis",
        component: () =>
          import("@/views/main/analysis/stateAnalysis/stateAnalysis.vue"),
      },
      {
        path: "/main/app/swiper",
        component: () =>
          import("@/views/main/appManage/appSwiper/appSwiper.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (to.path === "/main/analysis/videoAnalysis") {
    const token = localCache.getCache("token");
    if (!token) {
      return "/login";
    }
  }
});
export default router;
