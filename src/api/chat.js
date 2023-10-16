import apiInstance from "@/api/index";

export function getChatRoom() {
  return apiInstance.get("/chattingroom")
}

export function getChatMessage(chatroomId) {
  return apiInstance.get("/chattingroom/" + chatroomId)
}