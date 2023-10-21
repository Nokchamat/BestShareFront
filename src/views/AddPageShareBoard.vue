<template>
  <div class="container">
    <h1>게시물 작성</h1>
    <form @submit.prevent="submitPost" class="post-form">
      <div class="form-group">
        <label for="postTitle">제목</label>
        <input v-model="title" type="text" id="postTitle" placeholder="게시물 제목" required>
      </div>


      <div class="form-group">
        <div>
          <label for="postContent" style="float: left; padding-right: 20px">내용</label>

            <label for="explainsImage" >
              <font-awesome-icon :icon="['far', 'image']" />
              <span style="margin-left: 1px"> 사진 첨부 </span>
            </label>
            <input @input="uploadImageFile" type="file" accept="image/*" id="explainsImage" hidden="hidden"/>

          <div id="postContent"
               :contenteditable="true"
               @input="handleContent"
               style="border: 1px solid #ccc; border-radius: 4px;">
            <img v-for="img in this.img" :src=img />
          </div>
        </div>

      </div>


      <div class="form-group">
        <label for="thumbnail">썸네일 (이미지 파일):</label>
        <input type="file" id="thumbnail" accept="image/*" @change="handleThumbnailChange" required>
      </div>

      <div class="form-group">
        <label for="pdfFile">PDF 파일 첨부:</label>
        <input type="file" id="pdfFile" accept=".pdf" @change="handlePDFChange" required>
      </div>

      <button type="submit" class="submit-button">게시</button>
    </form>
  </div>
</template>

<script>
import {addPageShareBoard} from '@/api/pageShareBoard'
import { uploadImage, deleteUploadImage } from "@/api/upload";

export default {
  data() {
    return {
      title: '',
      explains: '',
      deleteExplains: '',
      thumbnailFile: null,
      pdfFile: null,
      img: []
    };
  },
  methods: {
    submitPost() {
      console.log("게시물 생성")
      addPageShareBoard({
        title: this.title,
        explains: this.explains
      }, this.thumbnailFile, this.pdfFile)
      .then((res) => {
        alert("게시물이 작성됐습니다.")
        this.$router.push("/")
      })
      .catch((err) => {
        console.error("err", err)
      })
    },
    handleThumbnailChange(event) {
      this.thumbnailFile = event.target.files[0];
    },
    handlePDFChange(event) {
      this.pdfFile = event.target.files[0];
    },
    handleContent(event) {
      this.explains = event.target.innerHTML
    },
    uploadImageFile(event) {
      uploadImage(event.target.files[0])
      .then((res) => {
        this.img.push(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
    },
    deleteUploadImageFile() {
      deleteUploadImage()
      .then()
      .catch((err) => {
        console.error(err)
      })
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  padding: 20px;
  max-width: 1200px;
}

h1 {
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.post-form {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #007BFF;
}

textarea,
#thumbnail, #pdfFile, #postTitle {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

#postContent {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  max-height: 600px;
  overflow-y: auto; /* 수직 스크롤바를 추가합니다. */
}

/* 스크롤바 스타일 (선택 사항) */
#postContent::-webkit-scrollbar {
  width: 10px; /* 스크롤바의 너비 설정 */
}

#postContent::-webkit-scrollbar-thumb {
  background-color: #888; /* 스크롤바 색상 설정 */
  border-radius: 5px; /* 스크롤바 모양 설정 */
}

button.submit-button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
}

</style>
