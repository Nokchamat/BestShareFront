import apiInstance from "@/api/index";

function getMyProfile() {
  return apiInstance.get("/user")
}

export { getMyProfile }