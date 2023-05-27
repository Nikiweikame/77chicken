import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Order from "../views/OrderView.vue";
import Meal from "../views/MealView.vue";
import Delete from "../views/DeleteView.vue";
import Check from "../views/CheckView.vue"
import UpdateMenu from "../views/UpdateMenuView.vue";
import SetTime from "../views/SetTimeView.vue" 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/order",
      name: "order",
      component: Order,
      children: [
        {
          path: ":id",
          name: "Serveitem",
          component: Meal,
        },
      ],
    },
    {
      path: "/delete",
      name: "delete",
      component: Delete,
    },
    {
      path: "/check",
      name: "check",
      component: Check,
    },
    {
      path: "/update",
      name: "update",
      component: UpdateMenu,
    },
  ],
});

export default router;
