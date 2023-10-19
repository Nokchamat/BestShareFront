import apiInstance from "@/api/index";

export function uploadImage(image) {
  const data = new FormData()
  data.append("image", image)
  return apiInstance.post("/image-upload",
      data, {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }
  )
}

export function deleteUploadImage(fileKey) {
  return apiInstance.delete("/image-upload", fileKey)
}