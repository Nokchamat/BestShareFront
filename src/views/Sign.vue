<template>
  <div class="container">
    <!-- Heading -->
    <h1>{{ title }}</h1>

    <!-- Links -->
    <ul class="links">
      <li>
        <a @click="signIn" href="#" id="signin">SIGN IN</a>
      </li>
      <li>
        <a @click="signUp" href="#" id="signup">SIGN UP</a>
      </li>
    </ul>

    <!-- Form -->
    <form  action="" method="post">
      <!-- email input -->
      <div class="first-input input__block first-input__block">
        <input type="email" placeholder="Email" class="input" id="email"   />
      </div>
      <!-- password input -->
      <div class="input__block">
        <input type="password" placeholder="Password" class="input" id="password"    />
      </div>
      <!-- repeat password input -->
      <div class="input__block">
        <input type="password" placeholder="Repeat password" class="input repeat__password" id="repeat__password"    />
      </div>
      <!-- sign in button -->
      <button class="signin__btn">
        Sign in
      </button>
    </form>
    <!-- separator -->
    <div class="separator">
      <p>OR</p>
    </div>
    <!-- google button -->
    <button class="google__btn">
      <i class="fa fa-google"></i>
      Sign in with Google
    </button>
    <!-- google button -->
    <button class="github__btn">
      <i class="fa fa-github"></i>
      Sign in with GitHub
    </button>
  </div>

  <footer>
    <p>
      <i class="fa fa-heart"></i>
      <i class="fa fa-heart"></i>
      <i class="fa fa-heart"></i>
    </p>
    <p>
      <a href="https://www.facebook.com/chouaib45" >
        <i class="fa fa-facebook"></i>
      </a>
      <a href="http://twitter.com/chouaibblgn45">
        <i class="fa fa-twitter"></i>
      </a>
      <a href="http://instagram.com/chouaib_blgn">
        <i class="fa fa-instagram"></i>
      </a>
      <a href="http://linkedin.com/in/chouaibblgn/">
        <i class="fa fa-linkedin"></i>
      </a>
      <a href="https://www.behance.net/geek30">
        <i class="fa fa-behance"></i>
      </a>
    </p>
  </footer>
</template>

<style scoped src="@/assets/template/assets/sass/sign.scss" />

<script>
import axios from "axios";
import Header from "@/components/layout/Header.vue";
import pageShareBoard from "@/views/PageShareBoard.vue";


export default {
  computed: {
    pageShareBoard() {
      return pageShareBoard
    }
  },
  components: {Header},
  data() {
    return {
      title: "SIGN IN"

    }
  },
  methods: {
    signIn() {

    },
    signUp() {
      this.title = "SIGN UP"
    }
  },
  mounted() {
    this.getData();
  },
}

</script>