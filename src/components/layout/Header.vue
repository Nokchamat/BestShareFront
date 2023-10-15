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
            <li><a href="/sign">로그인 및 회원 가입</a></li>
            <li><a href="/myprofile">마이페이지</a></li>
          </ul>
        </nav>

      </header>
    </div>

  </div>

</template>
<style scoped src="@/assets/template/assets/css/main.css"/>

<script>
export default {
  data() {
    return {
      menuOn: false
    }
  },
  methods: {},
};
</script>