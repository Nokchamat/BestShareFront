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
                  <a href="">
                    <font-awesome-icon icon="pen-to-square" style="height: 24px" />
                  </a>
                </div>
                <div class="profile-bottom">
                  <img :src=profile.profileImageUrl id="profileImage" alt=""/>
                  <div>
                    <div>id : {{ profile.id }}</div>
                    <div>이메일 : {{ profile.email }}</div>
                    <div>이름 : {{ profile.name }}</div>
                    <div>닉네임 : {{ profile.nickname }}</div>
                    <div>전화번호 : {{ profile.phoneNumber }}</div>
                  </div>
                </div>
              </section>

            </div>
          </div>
          <div class="col-8 col-12-medium imp-medium">
            <div id="content">

              <!-- Content -->
              <h3> 작성한 게시물 : {{pageListSize}}</h3>
              <article>
                <div id="features-wrapper">
                  <div class="container">
                    <div class="row">
                      <div class="col-4 col-12-medium" v-for="item in pageList" >

                        <!-- Box -->
                        <section class="box feature">
                          <a :href="pageDetailLink+item.id" class="image featured">
                            <img :src=item.thumbnailUrl alt=""/>
                          </a>
                          <div class="inner">
                            <header>
                              <h2>{{ item.title }}</h2>
                              <div>조회수 : {{ item.viewCount }}</div>
                              <div>좋아요 : {{ item.likesCount }}</div>
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

</template>

<style scoped src="@/assets/template/assets/css/main.css"/>
<style>
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
  border: 1px solid rgba(255, 56, 92, 0.5);
  border-radius: 10%;
}


</style>

<script>
import Header from "@/components/layout/Header.vue";
import pageShareBoard from "@/views/PageShareBoard.vue";
export default {
  computed: {
    pageShareBoard() {
      return pageShareBoard
    }
  },
  components: {FontAwesomeIcon, Header},
  data() {
    return {
      pageDetailLink : "pageshareboard/",
      pageListSize: "",
      pageList:{
        id: "",
        title: "",
        thumbnailUrl: "",
        viewCount: "",
        likesCount: ""
      },
      profile: {
        id: "",
        email: "",
        name: "",
        nickname: "",
        phoneNumber: "",
        profileImageUrl: ""
      },
    }
  },
  methods: {
    init() {
      var userId;

      getMyProfile()
      .then((res) => {
        this.profile = res.data;
        userId = res.data.id
        getAllListByUserId(userId)
        .then((res) => {
          this.pageList = res.data.content;
          console.log(res)
          this.pageListSize = res.data.size;
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      })
    },
  },
  mounted() {
    this.init();
  }
}
import {getMyProfile} from "@/api/user";
import {getAllListByUserId} from "@/api/pageShareBoard";

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

</script>