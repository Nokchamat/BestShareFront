import Home from "@/views/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import PageShareBoard from "@/views/PageShareBoard.vue";
import Sign from "@/views/Sign.vue";
import MyProfile from "@/views/MyProfile.vue";
import PageShareBoardByUser from "@/views/PageShareBoardByUser.vue";

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
    path: "/pageshareboard/user/:id",
    component: PageShareBoardByUser
  },
  {
    path: "/sign",
    component: Sign
  },
  {
    path: "/myprofile",
    component: MyProfile
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
