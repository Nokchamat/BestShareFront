import apiInstance from "@/api/index";

export function getChatRoom() {
  return apiInstance.get("/chattingroom")
}

export function createChatRoom(userId) {
  return apiInstance.post("/user/" + userId + "/chattingroom")
}

export function getChatMessage(chatroomId, page) {
  return apiInstance.get("/chattingroom/" + chatroomId + "?sort=createdAt,desc&page=" + page)
}

