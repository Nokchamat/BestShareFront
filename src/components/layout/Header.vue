<template>
  <head>
    <title>Verti by HTML5 UP</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
  </head>
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
            <li><a href="/add-pageshareboard">게시글 작성</a></li>
            <li><a href="/sign" v-if="!isLogin">로그인 및 회원 가입</a></li>
            <li><a @click="logout" v-if="isLogin" >로그아웃</a></li>
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
import {useCookies} from "vue3-cookies";

export default {
  data() {
    return {
      isLogin: false
    }
  },
  methods: {
    logout() {
      useCookies().cookies.remove("accessToken")
      this.isLogin = false
      this.$router.push("/")
    }
  },
  mounted() {
    this.isLogin = useCookies().cookies.get("accessToken") !== null;
  }
};
</script>