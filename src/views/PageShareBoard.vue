<template>
  <div id="main-wrapper">
    <div class="container">
      <div id="content">
        <article>
          <img :src=page.thumbnailUrl alt="" >
          <div id="page-top">
            <h2 style="padding-right: 30px">{{ page.title }}</h2>

            <div class="page-info" id="creator">
              <div style="padding-right: 10px">작성자: {{ page.userNickname }}</div>
              <a :href=pageShareBoardByUserUrl>작성자 게시물 더보기</a>
            </div>
            <div style="padding-right: 10px; display: flex">
              <button id="down-button" type="button" @click="toPDF">PDF 다운로드</button>
              <div id="icon">
                <font-awesome-icon id="awesome-icon" @click="likesButton" :icon="[heartIcon, 'heart']"/>
                {{ page.likesCount }}
              </div>
              <div id="icon">
                <font-awesome-icon id="awesome-icon" :icon="['fas', 'check']"/>
                {{ page.viewCount }}
              </div>
            </div>
            <div style="padding-top: 10px">작성일 {{ page.createdAt }}</div>
          </div>
          <div id="explains" style="clear: both" v-html="page.explains"/>
        </article>
      </div>
    </div>
  </div>

</template>
<style scoped src="@/assets/template/assets/css/main.css"/>
<style>

#icon {
  display: flex;
  flex-direction: column;
  gap: 6px;
  -webkit-box-pack: start;
  justify-content: start;
  -webkit-box-align: center;
  align-items: center;
  height: 40px;
  width: 40px;
}

#creator {
  display: flex;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  color: rgb(0, 0, 0);
  padding-bottom: 10px;
}

#down-button {
  display: flex;
  position: relative;
  width: 188px;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  gap: 4px;
  font-weight: 500;
  user-select: none;
  border-radius: 6px;
  color: white;
  background: rgb(255, 56, 92);
  height: 50px;
  font-size: 16px;
  padding: 17px 20px;
}

#awesome-icon {
  width: 24px;
  height: 22px;
  fill: rgb(210, 210, 210);
}

#page-top {
  font-family: 'Arial', sans-serif;
  background-color: #f7f7f7;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

h2 {
  font-size: 24px;
  color: #333;
}

.container {
  margin: 0 auto;
  max-width: 800px;
}

#content {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

#page-top img {
  width: 50%;
  height: auto;
  display: block;
  margin: 0 auto;
  border: 2px solid #ddd;
  border-radius: 5px;
}

.page-info {
  margin-top: 10px;
  font-size: 16px;
  color: #777;
}

a {
  text-decoration: none;
  color: #3498db;
}

#page-top .fa-check {
  color: #27ae60;
}

#page-top .fa-heart {
  color: #e74c3c;
}

</style>


<script>
import {addLikes, deleteLikes, getDetail} from "@/api/pageShareBoard";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  components: {FontAwesomeIcon},
  data() {
    return {
      pageShareBoardByUserUrl: "/pageshareboard/user/",
      heartIcon: 'far',
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
        this.heartIcon = this.page.isLikes ? 'fas' : 'far'
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
          this.heartIcon = 'far'
        })
        .catch((error) => {
          console.log(error);
        })
      } else {
        addLikes(this.$route.params.id)
        .then(() => {
          this.page.isLikes = true;
          this.page.likesCount++;
          this.heartIcon = 'fas'
        })
        .catch((error) => {
          console.error(error);
        })
      }
    },
    toPDF() {
      window.open(this.page.pagePdfFileKey);
    }
  },
  mounted() {
    this.getDetail()
  }
}

</script>