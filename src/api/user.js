import apiInstance from "@/api/index";

function getMyProfile() {
  return apiInstance.get("/user")
}

function getProfileByUserId(userId) {
  return apiInstance.get("/user/" + userId)
}

function addFollow(followingUserId) {
  return apiInstance.post("/user/" + followingUserId + "/follow")
}

function deleteFollow(followId) {
  return apiInstance.delete("/follow/" + followId)
}

export { getMyProfile, getProfileByUserId, addFollow, deleteFollow}