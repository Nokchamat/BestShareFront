import Home from "@/views/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import PageShareBoard from "@/views/PageShareBoard.vue";
import Sign from "@/views/Sign.vue";
import MyProfile from "@/views/MyProfile.vue";
import PageShareBoardByUser from "@/views/PageShareBoardByUser.vue";
import AddPageShareBoard from "@/views/AddPageShareBoard.vue";
import Chat from "@/views/Chat.vue";
import UpdatePageShareBoard from "@/views/UpdatePageShareBoard.vue";

const routes = [
  {
    path: "/",
    component: Home,
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
    path: "/add-pageshareboard",
    component: AddPageShareBoard
  },
  {
    path: "/update-pageshareboard/:id",
    component: UpdatePageShareBoard
  },
  {
    path: "/sign",
    component: Sign
  },
  {
    path: "/myprofile",
    component: MyProfile
  },
  {
    path: "/chat",
    component: Chat
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
