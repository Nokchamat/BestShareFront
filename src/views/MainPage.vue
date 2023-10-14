<template>
  <div id="page-wrapper">
    <!-- Banner -->
    <div id="banner-wrapper">
      <div id="banner" class="box container">
        <div class="row">
          <div class="col-7 col-12-medium">
            <h2>BEST Page</h2>
            <p>속지 공유 사이트</p>
          </div>
          <div class="col-5 col-12-medium">
            <ul>
              <li><a href="/sign" class="button large icon solid fa-arrow-circle-right">로그인</a>
              </li>
              <li><a href="/sign" class="button large icon solid fa-arrow-circle-right">회원가입</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Features -->
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

  </div>
</template>

<style scoped src="@/assets/template/assets/css/main.css" />
<style>
img {
  width: 260px;
  height: 260px;
  object-fit: cover;
}
</style>

<script>
import Header from "@/components/layout/Header.vue";
import pageShareBoard from "@/views/PageShareBoard.vue";
import {getAllList} from "@/api/pageShareBoard";

export default {
  computed: {
    pageShareBoard() {
      return pageShareBoard
    }
  },
  components: {Header},
  data() {
    return {
      pageList: [],
      pageDetailLink : "pageshareboard/"
    }
  },
  methods: {
    getData() {
      getAllList()
      .then((res) => {
        console.log(res.data);
        this.pageList = res.data.content;
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  mounted() {
    this.getData();
  }
}

</script>