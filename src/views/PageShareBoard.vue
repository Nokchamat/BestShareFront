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
            <p> 조회수 {{ page.viewCount }}</p>
            <p> 좋아요 {{ page.likesCount }}</p>
            <p> 생성일 {{ page.createdAt }}</p>
          </div>
          <p style="clear: both"> {{ page.explains }}</p>
          여기 : {{$route.params.id}}


        </article>

      </div>
    </div>
  </div>
</template>

<style scoped src="@/assets/template/assets/css/main.css"/>

<script>
import axios from "axios";
import router from "@/router";

export default {
  data() {
    return {
      search: "",
      page: "",
    }
  },
  methods: {
    getDetailData() {
      axios
      .get("http://localhost:8080/v1/pageshareboard/" + this.$route.params.id)
      .then((res) => {
        console.log(res.data);
        this.page = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.getDetailData();
  }
}

</script>