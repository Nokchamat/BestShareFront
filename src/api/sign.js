import apiInstance from "@/api/index";

function postSignIn(form) {
  return apiInstance.post('/user/sign-in',
      JSON.stringify(form), {
        headers: {
          'content-type': 'application/json',
        }
      }
  )
}

function postSignUp(form, profileImage) {
  const dataForm = new FormData();
  dataForm.append('signUpForm', new Blob([JSON.stringify(form)], {
    type: "application/json"
  }));
  if (profileImage === "") {
    console.log("이미지 업로드 안 함")
    const emptyFile = new File([], "");
    dataForm.append('profileImage', emptyFile)
  } else {
    console.log("이미지 업로드 함")
    dataForm.append('profileImage', profileImage);
  }

  console.log(dataForm)
  return apiInstance.post('/user/sign-up',
      dataForm, {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }
  )
}

export {postSignIn, postSignUp}