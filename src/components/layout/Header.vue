<template>
  <div id="page-wrapper">
    <!-- Header -->
    <div id="header-wrapper">
      <header id="header" class="container">
        <!-- Logo -->
        <div id="logo">
          <h1><a href="/">BEST PageLife</a></h1>
        </div>

        <nav id="nav">
          <ul>
            <li class="current"><a href="/">Home</a></li>
            <li><a href="/add-pageshareboard" v-if="store.state.isUserLoggedIn" >게시글 작성</a></li>
            <li><a href="/sign" v-if="!store.state.isUserLoggedIn">로그인 및 회원 가입</a></li>
            <li><a href="/" @click="logout" v-if="store.state.isUserLoggedIn" >로그아웃</a></li>
            <li><a href="/myprofile">마이페이지</a></li>
            <li><a href="/chat">채팅</a></li>
          </ul>
        </nav>

      </header>
    </div>

  </div>

</template>
<style scoped src="@/assets/template/assets/css/main.css"/>

<script>
import store from "../../store";

export default {
  computed: {
    store() {
      return store
    }
  },
  data() {
    return {
      isLogin: store.state.isUserLoggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
  },
};
</script>