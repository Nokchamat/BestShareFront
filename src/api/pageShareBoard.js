import apiInstance from "@/api/index";

function getAllList() {
  return apiInstance.get("/pageshareboard")
}

function getAllListByUserId(userId) {
  return apiInstance.get("/pageshareboard/user/" + userId)
}

function getDetail(id) {
  return apiInstance.get("/pageshareboard/" + id)
}

function addLikes(id) {
  return apiInstance.post("/pageshareboard/" + id + "/likes")
}

function deleteLikes(likesId) {
  return apiInstance.delete("/likes/" + likesId)
}

export { getAllList, getDetail, addLikes, deleteLikes, getAllListByUserId }