<template>
  <!-- Main -->
  <div id="main-wrapper">
    <div class="container">
      <div id="content">
        <article>
          <div>
            <img :src=page.thumbnailUrl alt="" style="float: left">
            <a :href=this.page.pagePdfFileKey> 다운로드 </a>
            <h1>{{ page.title }}</h1>
            <p> {{ page.userNickname }}</p>
            <div>
              <p> 조회수 {{ page.viewCount }}</p>
              <button @click="addLikes" type="button">좋아요 누르기</button>
            </div>
            <p> 좋아요 {{ page.likesCount }}</p>
            <p> 생성일 {{ page.createdAt }}</p>
          </div>
          <p style="clear: both"> {{ page.explains }}</p>

        </article>

      </div>
    </div>
  </div>
</template>

<style scoped src="@/assets/template/assets/css/main.css"/>

<script>
import { getDetail } from "@/api/pageShareBoard";

export default {
  data() {
    return {
      search: "",
      page: {
        title: "",
        userNickname: "",
        viewCount: "",
        createdAt: "",
        likesCount: "",
        explains: "",
        thumbnailUrl: "",
        pagePdfFileKey: ""
      },
    }
  },
  methods: {

    getDetail() {
      getDetail(this.$route.params.id)
      .then((res) => {
        console.log(res.data);
        this.page = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  mounted() {
    this.getDetail()
  }
}

</script>