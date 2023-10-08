import Home from "@/views/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import PageShareBoard from "@/views/PageShareBoard.vue";

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/pageshareboard/:id",
    component: PageShareBoard
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
