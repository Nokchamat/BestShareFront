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
    <div class="form">
      <!-- email input -->
      <div v-bind:class="selectBlock ? 'first-input__block' : 'signup-input__block'"
           class="first-input input__block">
        <input v-model="email" type="email" placeholder="이메일" class="input" id="email"/>
      </div>
      <!-- password input -->
      <div class="input__block">
        <input v-model="password" type="password" placeholder="비밀번호" class="input" id="password"/>
      </div>
      <!-- repeat password input -->
      <div class="input__block">
        <input v-model="repeatPassword" type="password" placeholder="비밀번호 확인"
               v-bind:class="{'repeat__password': selectBlock}" class="input"
               id="repeat__password"/>
      </div>
      <!-- name input -->
      <div class="input__block">
        <input v-model="name" type="text" placeholder="이름"
               v-bind:class="{'repeat__password': selectBlock}" class="input" id="name"/>
      </div>
      <!-- nickname input -->
      <div class="input__block">
        <input v-model="nickname" type="text" placeholder="닉네임"
               v-bind:class="{'repeat__password': selectBlock}" class="input" id="nickname"/>
      </div>
      <!-- phoneNumber input -->
      <div class="input__block">
        <input v-model="phoneNumber" type="number" placeholder="휴대전화 예시)01012341234"
               v-bind:class="{'repeat__password': selectBlock}" class="input" id="phone__number"/>
      </div>
      <!-- sign in button -->
      <button @click="selectBlock ? postSignIn() : postSignUp()" class="signin__btn">
        {{ bottomButton }}
      </button>
    </div>
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

  <Modal v-show="modalState" v-bind:modalData="modalData" v-model:modalState="modalState"/>

</template>

<style scoped src="@/assets/template/assets/sass/sign.scss"/>

<script>
import axios from "axios";
import Header from "@/components/layout/Header.vue";
import pageShareBoard from "@/views/PageShareBoard.vue";
import Modal from "@/views/Modal.vue";

export default {
  computed: {
    pageShareBoard() {
      return pageShareBoard
    }
  },
  components: {
    Modal,
    Header,
  },
  data() {
    return {
      title: "SIGN IN",
      bottomButton: "Sign in",
      selectBlock: true,
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      nickname: "",
      phoneNumber: "",
      modalState: false,
      modalData: ""
    }
  },
  methods: {
    signIn() {
      this.title = "SIGN IN"
      this.bottomButton = "Sign in"
      this.selectBlock = "first-input__block"
      this.selectBlock = true
    },
    signUp() {
      this.title = "SIGN UP"
      this.bottomButton = "Sign up"
      this.selectBlock = false
    },
    postSignIn() {
      axios.post("http://localhost:8080/v1/user/sign-in", {
            email: this.email,
            password: this.password
          },
          {
            headers: {
              'content-type': 'application/json',
            }
          })
      .then(res => {
        console.log(JSON.stringify(res.headers.get('Authorization')))
      }).catch(err => {
        console.log(err.response.data.message);
        this.modalData = err.response.data.message
        this.changeModalState()
      });
    },
    postSignUp() {
      axios
      .post("http://localhost:8080/user/v1/sign-up")
      .then((res) => {
        console.log(res.data);
        this.page = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    changeModalState() {
      this.modalState = !this.modalState
    }
  },
}
</script>