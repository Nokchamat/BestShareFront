<template>
  <div id="page-wrapper">
    <!-- Banner -->
    <div id="banner-wrapper">


      <div id="banner" class="box container">
        <div class="row">
          <h2>인기 속지 BEST 3</h2>

          <div class="col-5 col-12-medium " v-for="item in bestPageList">
            <section class="box feature">
              <a :href="pageDetailLink+item.id" class="image featured">
                <img :src=item.thumbnailUrl alt=""/>
              </a>
              <div class="inner">
                <header>
                  <h3>{{ item.title }}</h3>
                  <div>
                    <font-awesome-icon :icon="['fas', 'check']" />
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


    <!-- Features -->
    <div id="features-wrapper">
      <div class="container">
        <div class="row">
          <h2>속지 공유 게시판</h2>
          <div class="col-4 col-12-medium" v-for="item in pageList">

            <!-- Box -->
            <section class="box feature">
              <a :href="pageDetailLink+item.id" class="image featured">
                <img :src=item.thumbnailUrl alt=""/>
              </a>
              <div class="inner">
                <header>
                  <h2>{{ item.title }}</h2>
                  <div>
                    <font-awesome-icon :icon="['fas', 'check']" />
                    {{ item.viewCount }}
                  </div>
                  <div>
                    <font-awesome-icon :icon="['fas', 'heart']" />
                    {{ item.likesCount }}
                  </div>
                </header>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped src="@/assets/template/assets/css/main.css"/>

<script>
import Header from "@/components/layout/Header.vue";
import pageShareBoard from "@/views/PageShareBoard.vue";
import {getAllList, getBestPageList} from "@/api/pageShareBoard";

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
      bestPageList: [],
      pageDetailLink: "pageshareboard/",
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
      getBestPageList()
      .then((res) => {
        console.log(res.data);
        this.bestPageList = res.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },
  },
  mounted() {
    this.getData();
  }
}

</script>