import Home from "@/views/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import PageShareBoard from "@/views/PageShareBoard.vue";
import Sign from "@/views/Sign.vue";

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/pageshareboard/:id",
    component: PageShareBoard
  },
  {
    path: "/signin",
    component: Sign
  },
  {
    path: "/signup",
    component: Sign
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
