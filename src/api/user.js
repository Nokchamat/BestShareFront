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

function updateProfileImage(profileImage) {
  const data = new FormData()
  data.append("profileImage", profileImage)

  return apiInstance.put("/user/profile",
      data, {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }
  )
}

export {
  getMyProfile,
  getProfileByUserId,
  addFollow,
  deleteFollow,
  updateProfileImage
}