<template>
  <div class="container">
    <!-- Heading -->
    <h1>{{ title }}</h1>
    <!-- Links -->
    <ul class="links">
      <li>
        <a @click="signInButton" href="#" id="signin">SIGN IN</a>
      </li>
      <li>
        <a @click="signUpButton" href="#" id="signup">SIGN UP</a>
      </li>
    </ul>

    <!-- Form -->
    <div class="form">
      <!-- email input -->
      <div v-bind:class="selectBlock ? 'first-input__block' : 'signup-input__block'"
           class="first-input input__block">
        <input v-model="sign.email" type="email" placeholder="이메일" class="input" id="email"/>
      </div>
      <!-- password input -->
      <div class="input__block">
        <input v-model="sign.password" type="password" placeholder="비밀번호" class="input"
               id="password"/>
      </div>
      <!-- repeat password input -->
      <div class="input__block">
        <input v-model="repeatPassword" type="password" placeholder="비밀번호 확인"
               v-bind:class="{'repeat__password': selectBlock}" class="input"
               id="repeat__password"/>
      </div>
      <!-- name input -->
      <div class="input__block">
        <input v-model="sign.name" type="text" placeholder="이름"
               v-bind:class="{'repeat__password': selectBlock}" class="input" id="name"/>
      </div>
      <!-- nickname input -->
      <div class="input__block">
        <input v-model="sign.nickname" type="text" placeholder="닉네임"
               v-bind:class="{'repeat__password': selectBlock}" class="input" id="nickname"/>
      </div>
      <!-- phoneNumber input -->
      <div class="input__block">
        <input v-model="sign.phoneNumber" type="text" placeholder="휴대전화 예시)01012341234"
               v-bind:class="{'repeat__password': selectBlock}" class="input" id="phone__number"/>
      </div>
      <!-- profileImage input -->
      <div class="input__block" v-if="!selectBlock">
        <label for="profile_image" id="profileImageLabel">
          <img id="profileImage" style="margin-right: auto;" :src="profileImagePreview" alt="프로필"/>
          <span style="margin-left: 10px">{{ profilePlaceholder }}</span>
        </label>
        <input multiple type="file" @change="uploadImage" ref="profileImage"
               v-bind:class="{'repeat__password': selectBlock}"
               class="input" id="profile_image" style="display: none"/>
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
<style>
#profile_image {
  padding: 12px;
}

#profileImage {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgb(243, 243, 243);
  overflow: hidden;
  cursor: default;
}

#profileImageLabel {
  display: block;
  width: 90%;
  max-width: 680px;
  height: 130px;
  margin: 0 auto;
  border-radius: 8px;
  border: none;
  background: rgba(15, 19, 42, 0.1);
  padding: 15px;
  font-size: 14px;
  flex: 1;
  justify-content: space-between;
}


</style>

<script>
import pageShareBoard from "@/views/PageShareBoard.vue";
import Modal from "@/views/Modal.vue";
import {postSignIn, postSignUp} from '@/api/sign'
import {useCookies} from "vue3-cookies";

export default {
  computed: {
    pageShareBoard() {
      return pageShareBoard
    },
  },
  components: {
    Modal,
  },
  data() {
    return {
      selectBlock: true,
      title: "SIGN IN",
      bottomButton: "Sign in",
      repeatPassword: "",
      profilePlaceholder: "해당 사진은 기본 프로필 입니다. 사진을 첨부해주세요.",
      profileImagePreview: "https://ios-note-bucket.s3.ap-northeast-2.amazonaws.com/profile/DefaultProfile.png",
      sign: {
        email: "",
        password: "",
        name: "",
        nickname: "",
        phoneNumber: "",
      },
      profileImage: "",
      modalState: false,
      modalData: "",
    }
  },
  methods: {
    signInButton() {
      this.title = "SIGN IN"
      this.bottomButton = "Sign in"
      this.selectBlock = "first-input__block"
      this.selectBlock = true
    },
    signUpButton() {
      this.title = "SIGN UP"
      this.bottomButton = "Sign up"
      this.selectBlock = false
    },
    postSignIn() {
      postSignIn({
        email: this.sign.email,
        password: this.sign.password
      })
      .then(res => {
        useCookies().cookies.set('accessToken', res.headers.get('Authorization'))
        this.$router.push("/")
      }).catch(err => {
        console.log(err.response.data.message);
        this.modalData = err.response.data.message
        this.changeModalState()
      });
    },
    postSignUp() {
      if (this.sign.password !== this.repeatPassword) {
        this.modalData = "비밀번호가 일치하지 않습니다.";
        this.changeModalState()
      } else {
        postSignUp(this.sign, this.profileImage)
        .then(res => {
          console.log(JSON.stringify(res.headers.get('Authorization')))
          this.modalData = "회원가입이 완료되었습니다."
          this.changeModalState()
          this.signInButton()
        }).catch(err => {
          console.error(err.response.data.message);
          if (err.response.data.message === undefined) {
            this.modalData = err.response.data.messages.toString().replace(/,/gi, '  ')
          } else {
            this.modalData = err.response.data.message;
          }
          this.changeModalState()
        });
      }
    },
    changeModalState() {
      this.modalState = !this.modalState
    },
    uploadImage() {
      console.log("uploadImage")
      this.profileImage = this.$refs.profileImage.files[0]
      this.onFileSelected()

      console.log("file", new File(new Empty(), ""))
    },
    onFileSelected() {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImagePreview = e.target.result;
      }
      reader.readAsDataURL(this.profileImage);
    },
  },
}
</script>