<template>

  <div id="page-wrapper">

    <!-- Main -->
    <div id="main-wrapper">
      <div class="container">
        <div class="row gtr-200">
          <div class="col-4 col-12-medium">
            <div id="sidebar">

              <!-- Sidebar -->
              <section>
                <div class="profile-top">
                  <h3>마이 프로필</h3>
                  <div>
                    <font-awesome-icon icon="pen-to-square" style="height: 24px" type="button" @click="selectFile" />
                    <input type="file" ref="fileInput"
                    style="display: none"
                    @change="handleFileSelected"/>
                  </div>
                </div>
                <div class="profile-bottom">
                  <img :src=profile.profileImageUrl id="profileImage" alt="프로필 이미지"/>
                  <div>
                    <div>이메일 : {{ profile.email }}</div>
                    <div>이름 : {{ profile.name }}</div>
                    <div>닉네임 : {{ profile.nickname }}</div>
                    <div>전화번호 : {{ profile.phoneNumber }}</div>
                    <div>
                      <font-awesome-icon :icon="['far', 'user']" />
                      {{profile.followerCount}}
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div class="profile-top">
                  <h3>이메일 인증</h3>
                </div>
                <div class="profile-bottom" style="display: inline-block">
                  <label>코드 여부 : {{ store.state.isVerifyEmail ? "인증 완료" : "인증 필요"}}</label>
                  <input  v-if="!store.state.isVerifyEmail" v-model="verifyCode" type="text" placeholder="인증 코드를 입력해주세요.">
                  <button v-if="!store.state.isVerifyEmail" @click="postVerifyEmail" style="font-size: 16px">인증</button>
                </div>
              </section>
            </div>
          </div>
          <div class="col-8 col-12-medium imp-medium">
            <div style="margin-bottom: 5px">
              <button @click="createPageButton" style="margin-right: 5px">작성한 게시물</button>
              <button @click="likesPageButton" >좋아요 게시물</button>
            </div>
            <div id="content">
              <!-- Content -->
              <h3 v-if="isCreatePage"> 작성한 게시물 : {{ pageListSize }}</h3>
              <h3 v-if="!isCreatePage" > 좋아요 게시물 : {{ pageListSize }}</h3>
              <article>
                <div id="features-wrapper">
                  <div class="container">
                    <div class="row">
                      <div class="col-5 col-12-medium" v-for="item in pageList">

                        <!-- Box -->
                        <section class="box feature">
                          <a :href="isCreatePage ? pageDetailLink+item.id :
                          pageDetailLink + item.pageShareBoardId" class="image featured">
                            <img :src=item.thumbnailUrl alt=""/>
                          </a>
                          <div class="inner">
                            <header>
                              <h2>{{ item.title }}</h2>
                              <div>
                                <font-awesome-icon :icon="['fas', 'check']"/>
                                {{ item.viewCount }}
                              </div>
                              <div>
                                <font-awesome-icon :icon="['fas', 'heart']"/>
                                {{ item.likesCount }}
                              </div>
                              <div class="button-container">
                                <button v-if="isCreatePage" @click="updatePageShareBoard(item.id)" id="updateButton">수정</button>
                                <button v-if="isCreatePage" @click="deletePageShareBoard(item.id)" id="deleteButton">삭제</button>
                              </div>
                            </header>
                          </div>
                        </section>

                      </div>
                    </div>
                  </div>
                </div>

              </article>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div id="postContent"
       :contenteditable="true"
       ref="postExplains"
       hidden="hidden">
  </div>

</template>

<style scoped src="@/assets/template/assets/css/main.css"/>
<style>
div .button-container {
  display: flex;
  justify-content: center
}


#deleteButton, #updateButton {
  margin-right: 5px;
  display: inline-block;
  font-size: 16px;
}

input {
  border: none;
  font: inherit;
}
#profileImage {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgb(243, 243, 243);
  overflow: hidden;
  cursor: default;
}

div .profile-top {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  width: 100%;
  height: 58px;
  border-bottom: 1px solid #F3F3F3;
}

div .profile-bottom {
  padding: 16px;
  border: 2px solid rgba(255, 56, 92, 0.5);
  border-radius: 10%;
}


</style>

<script>
import Header from "@/components/layout/Header.vue";
import pageShareBoard from "@/views/PageShareBoard.vue";
import {getMyProfile, postVerifyEmail, updateProfileImage} from "@/api/user";
import {
  deletePageShareBoard,
  getAllListByUserId,
  getDetail,
  getLikes
} from "@/api/pageShareBoard";

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {deleteUploadImage} from "@/api/upload";
import store from "../store";

export default {
  computed: {
    store() {
      return store
    },
    pageShareBoard() {
      return pageShareBoard
    }
  },
  components: {FontAwesomeIcon, Header},
  data() {
    return {
      verifyCode: "",
      isCreatePage: true,
      pageDetailLink: "pageshareboard/",
      pageListSize: "",
      pageList: {
        id: "",
        title: "",
        thumbnailUrl: "",
        viewCount: "",
        likesCount: "",
        pageShareBoardId: "",
      },
      profile: {
        id: "",
        email: "",
        name: "",
        nickname: "",
        phoneNumber: "",
        profileImageUrl: "",
        followerCount: "",
      },
    }
  },
  methods: {
    init() {
      let userId;

      getMyProfile()
      .then((res) => {
        this.profile = res.data;
        userId = res.data.id
        getAllListByUserId(userId)
        .then((res) => {
          this.pageList = res.data.content;
          console.log(res)
          this.pageListSize = res.data.totalElements;
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      })
    },
    updatePageShareBoard(id) {
      this.$router.push("/update-pageshareboard/" + id)
    },
    deletePageShareBoard(id) {
      this.deleteExplainsImage(id)

      deletePageShareBoard(id)
      .then(()=> {
        alert("삭제가 완료됐습니다.")
        this.init()
      })
      .catch((err)=> {
        console.log(err)
      })
    },
    async deleteExplainsImage(id) {
      let imgQuery;

      await getDetail(id)
      .then((res) => {
        this.$refs.postExplains.innerHTML = res.data.explains;
        imgQuery = this.$refs.postExplains.querySelectorAll('img');
      })
      .catch((error) => {
        console.log(error);
      });
      console.log('getDetail 완료', imgQuery)

      console.log(imgQuery.length + "개 이미지 삭제 시작")
      for (let i = 0; i < imgQuery.length; i++) {
        console.log(imgQuery)

        console.log('삭제 시작 : ' + i + "번째 이미지 : " + imgQuery[i].src)
        deleteUploadImage({
          uploadedFileUrl: imgQuery[i].src
        })
        .then(() => {
          console.log('삭제 완료 : ' + i + "번째 이미지 : " + imgQuery[i].src)
        })
        .catch((err) => {
          console.error(err)
        })
      }
      console.log(imgQuery.length + "개 이미지 삭제 완료")
    },
    selectFile() {
      this.$refs.fileInput.click();
    },
    handleFileSelected() {
      const fileInput = this.$refs.fileInput;

      updateProfileImage(fileInput.files[0])
      .then(() => {
        this.init()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    createPageButton() {
      this.init()
      this.isCreatePage = true;
    },
    likesPageButton() {
      getLikes()
      .then((res) => {
        this.pageList = res.data.content;
        this.isCreatePage = false;
      })
      .catch((err) => {
        console.error(err)
      })
    },
    postVerifyEmail() {
      postVerifyEmail(this.verifyCode)
      .then(()=> {
        this.$store.dispatch('checkEmailVerify', { isVerifyEmail: true})
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
    }
  },
  mounted() {
    this.init();
  }
}
</script>