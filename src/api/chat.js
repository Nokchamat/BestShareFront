import apiInstance from "@/api/index";

export function getChatRoom() {
  return apiInstance.get("/chattingroom")
}