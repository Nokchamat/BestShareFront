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

export function deleteUploadImage(uploadedFileUrl) {
  return apiInstance.delete("/image-upload/", {
    data: uploadedFileUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function uploadBase64Image(image) {
  const data = new FormData()
  data.append('image', image); // 'image'는 폼 필드 이름, 'image.png'는 파일 이름

  return apiInstance.post("/image-upload",
      data, {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }
  )
}

export function dataURLtoFile(dataurl, filename) {

  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type:mime});
}