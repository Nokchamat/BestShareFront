import {useCookies} from "vue3-cookies";
import apiInstance from "@/api/index";

function getAllList() {
  return apiInstance.get("/pageshareboard")
  .catch((error) => {
    console.log(error);
    useCookies().cookies.remove('accessToken')

  });
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

export { getAllList, getDetail, addLikes, deleteLikes }