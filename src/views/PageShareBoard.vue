<template>
  <!-- Main -->
  <div id="main-wrapper">
    <div class="container">
      <div id="content">
        <article>
          <div>
            <img :src=page.thumbnailUrl alt="" style="float: left">
            <a :href=this.page.pagePdfFileKey> 다운로드 </a>
            <h1>제목 : {{ page.title }}</h1>
            <p> 작성자 : {{ page.userNickname }}</p>
            <a :href=pageShareBoardByUserUrl>작성자 게시물 더보기</a>
            <div>
              <p>
                <font-awesome-icon :icon="['fas', 'check']"/>
                {{ page.viewCount }}
              </p>
              <button @click="likesButton" type="button">좋아요 누르기</button>
            </div>
            <p>
              <font-awesome-icon :icon="['fas', 'heart']"/>
              {{ page.likesCount }}
            </p>
            <p> 좋아요 여부 {{ page.isLikes }}</p>
            <p> 생성일 {{ page.createdAt }}</p>
          </div>
          <p style="clear: both" v-html="page.explains"></p>

        </article>

      </div>
    </div>
  </div>
</template>

<style scoped src="@/assets/template/assets/css/main.css"/>
<script>
import {addLikes, deleteLikes, getDetail} from "@/api/pageShareBoard";

export default {
  data() {
    return {
      pageShareBoardByUserUrl: "/pageshareboard/user/",
      page: {
        id: "",
        userId: "",
        title: "",
        userNickname: "",
        viewCount: "",
        createdAt: "",
        likesCount: "",
        explains: "",
        thumbnailUrl: "",
        pagePdfFileKey: "",
        likesId: "",
        isLikes: false,
      },
    }
  },
  methods: {
    getDetail() {
      getDetail(this.$route.params.id)
      .then((res) => {
        this.page = res.data;
        this.pageShareBoardByUserUrl += this.page.userId;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    likesButton() {
      if (this.page.isLikes) {
        deleteLikes(this.page.likesId)
        .then(() => {
          this.page.isLikes = false;
          this.page.likesCount--;
        })
        .catch((error) => {
          console.log(error);
        })
      } else {
        addLikes(this.$route.params.id)
        .then(() => {
          this.page.isLikes = true;
          this.page.likesCount++;
        })
        .catch((error) => {
          console.error(error);
        })
      }
    },
  },
  mounted() {
    this.getDetail()
  }
}

</script>