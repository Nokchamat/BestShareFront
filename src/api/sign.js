import axios from "axios";

const apiInstance = axios.create({
  baseURL: 'http://localhost:8080/v1'
});

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
  dataForm.append("profileImage", profileImage);

  return apiInstance.post('/user/sign-up',
      dataForm, {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }
  )
}

export { postSignIn, postSignUp }