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
                  <h3>작성자 프로필</h3>
                </div>
                <div class="profile-bottom">
                  <img :src=profile.profileImageUrl id="profileImage" alt="프로필 이미지"/>
                  <div>
                    <div>닉네임 : {{ profile.nickname }}</div>
                    <div>
                      <font-awesome-icon :icon="['far', 'user']"/>
                      : {{ profile.followerCount }}
                      <button type="button" @click="followButton" id="icon-button">팔로우</button>
                    </div>
                    <div>
                      <font-awesome-icon :icon="['far', 'comments'] "/>
                      <button type="button" @click="createChatRoom" id="icon-button">채팅</button>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
          <div class="col-8 col-12-medium imp-medium">
            <div id="content">

              <!-- Content -->
              <h3> 작성한 게시물 : {{ pageListSize }}</h3>
              <article>
                <div id="features-wrapper">
                  <div class="container">
                    <div class="row">
                      <div class="col-5 col-12-medium" v-for="item in pageList">

                        <!-- Box -->
                        <section class="box feature">
                          <a :href="pageDetailLink+item.id" class="image featured">
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
import {getProfileByUserId, addFollow, deleteFollow} from "@/api/user";
import {getAllListByUserId} from "@/api/pageShareBoard";
import {createChatRoom} from "@/api/chat";

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  computed: {
    pageShareBoard() {
      return pageShareBoard
    }
  },
  components: {FontAwesomeIcon, Header},
  data() {
    return {
      pageDetailLink: "/pageshareboard/",
      pageListSize: "",
      pageList: {
        id: "",
        title: "",
        thumbnailUrl: "",
        viewCount: "",
        likesCount: ""
      },
      profile: {
        id: "",
        nickname: "",
        profileImageUrl: "",
        followerCount: "",
        isFollow: "",
        followId: "",
      },
    }
  },
  methods: {
    init() {
      getProfileByUserId(this.$route.params.id)
      .then((res) => {
        this.profile = res.data;
        getAllListByUserId(this.$route.params.id)
        .then((res) => {
          this.pageList = res.data.content;
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
    followButton() {
      if (this.profile.isFollow) {
        deleteFollow(this.profile.followId)
        .then(() => {
          this.profile.followerCount--;
        })
        .catch((error) => {
          console.error(error)
        })
      } else {
        addFollow(this.profile.id)
        .then(() => {
          this.profile.followerCount++;
        })
        .catch((error) => {
          console.error(error)
        })
      }
    },
    createChatRoom() {
      createChatRoom(this.profile.id)
      .then(() => {
        this.$router.push("/chat")
      })
      .catch((err) => {
        console.error(err.response.data)
        if (err.response.data.code === "ALREADY_EXIST_CHATTINGROOM") {
          this.$router.push("/chat")
        }
      })
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style>
#icon-button {
  font-size: 10px;
}

</style>