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
          <div id="postContent"
               :contenteditable="true"
               @input="handleContent"
               ref="postExplains"
               style="border: 1px solid #ccc; border-radius: 4px;">
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
import {
  uploadBase64Image,
  dataURLtoFile
} from "@/api/upload";

export default {
  data() {
    return {
      title: '',
      explains: '',
      deleteExplains: '',
      thumbnailFile: null,
      pdfFile: null,
      contentTarget: {
        children: "",
        currentSrc: "",
        innerHTML: "",
      },
    };
  },
  methods: {
    submitPost() {
      console.log("게시물 생성");
      this.uploadExplainsImage()
      .then(() => {
        this.explains = this.$refs.postExplains.innerHTML
        // 이미지 업로드가 완료된 후에 실행할 코드
        return addPageShareBoard({
          title: this.title,
          explains: this.explains
        }, this.thumbnailFile, this.pdfFile);
      })
      .then(() => {
        alert("게시물이 작성됐습니다.");
        this.$router.push("/");
      })
      .catch((err) => {
        console.error("err", err);
      });
    },
    handleThumbnailChange(event) {
      this.thumbnailFile = event.target.files[0];
      console.log(this.thumbnailFile)
    },
    handlePDFChange(event) {
      this.pdfFile = event.target.files[0];
    },
    handleContent(event) {
      this.contentTarget = event.target
      this.explains = event.target.innerHTML
    },
    uploadExplainsImage() {
      console.log('uploadExplainsImage');
      const explainsAllImg = this.contentTarget.querySelectorAll('img');

      const uploadPromises = [];

      for (let i = 0; i < explainsAllImg.length; i++) {
        const uploadPromise = uploadBase64Image(dataURLtoFile(explainsAllImg[i].currentSrc, "image"))
        .then((res) => {
          explainsAllImg[i].src = res.data;
        })
        .catch((err) => {
          console.error(err);
        });

        uploadPromises.push(uploadPromise);
      }

      // 모든 이미지 업로드 Promise를 반환
      return Promise.all(uploadPromises);
    },
  },
}
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
  height: 600px;
  overflow-y: auto; /* 수직 스크롤바를 추가합니다. */

  img {
    width: 100%;
  }
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
