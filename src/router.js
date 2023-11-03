import Home from "@/views/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import PageShareBoard from "@/views/PageShareBoard.vue";
import Sign from "@/views/Sign.vue";
import MyProfile from "@/views/MyProfile.vue";
import PageShareBoardByUser from "@/views/PageShareBoardByUser.vue";
import AddPageShareBoard from "@/views/AddPageShareBoard.vue";
import Chat from "@/views/Chat.vue";
import UpdatePageShareBoard from "@/views/UpdatePageShareBoard.vue";
import store from "@/store";

const isVerifyEmail = () => (to, from, next) => {
  if (store.state.isVerifyEmail) {
    return next();
  } else {
    alert('게시물 작성하기 위해서는 이메일 인증이 필요합니다. 가입 시 이메일로 발송된 인증 코드로 마이페이지에서 이메일 인증을 해주세요.')
    next('/');
  }
};


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
    component: AddPageShareBoard,
    beforeEnter: isVerifyEmail()
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
