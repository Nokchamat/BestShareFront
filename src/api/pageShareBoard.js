import apiInstance from "@/api/index";

function getAllList() {
  return apiInstance.get("/pageshareboard?sort=viewCount,desc")
}

function getBestPageList() {
  return apiInstance.get("/pageshareboard/best")
}

function getAllListByUserId(userId) {
  return apiInstance.get("/pageshareboard/user/" + userId)
}

function getDetail(id) {
  return apiInstance.get("/pageshareboard/" + id)
}

function addPageShareBoard(form, thumbnail, pagePDF) {
  const dataForm = new FormData();
  dataForm.append('createPageShareBoardForm', new Blob([JSON.stringify(form)], {
    type: "application/json"
  }));
  dataForm.append("thumbnail", thumbnail);
  dataForm.append("pagePDF", pagePDF);

  return apiInstance.post("/pageshareboard",
      dataForm, {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }
  )
}

function updatePageShareBoard(form, thumbnail, pagePDF, pageShareBoardId) {
  const dataForm = new FormData();
  dataForm.append('updatePageShareBoardForm', new Blob([JSON.stringify(form)], {
    type: "application/json"
  }));
  dataForm.append("thumbnail", thumbnail);
  dataForm.append("pagePDF", pagePDF);

  return apiInstance.put("/pageshareboard/" + pageShareBoardId,
      dataForm, {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }
  )
}

function deletePageShareBoard(id) {
  return apiInstance.delete("/pageshareboard/" + id)
}

function addLikes(id) {
  return apiInstance.post("/pageshareboard/" + id + "/likes")
}

function deleteLikes(likesId) {
  return apiInstance.delete("/likes/" + likesId)
}

export {
  getAllList, getDetail, addLikes, deleteLikes,
  getAllListByUserId, getBestPageList, addPageShareBoard
    , updatePageShareBoard, deletePageShareBoard
}