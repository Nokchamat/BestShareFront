import axios from "axios";

const apiInstance = axios.create({
  baseURL: 'http://localhost:8080/v1/pageshareboard'
});

function getAllList() {
  return apiInstance.get()
}

function getDetail(id) {
  return apiInstance.get("/" + id)
}

export { getAllList, getDetail }