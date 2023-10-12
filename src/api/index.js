import axios from "axios";
import {useCookies} from "vue3-cookies";
import router from "@/router";

const apiInstance = axios.create({
  baseURL: 'http://localhost:8080/v1',
  headers: {
    Authorization: useCookies().cookies.get('accessToken')
  },
});

apiInstance.interceptors.response.use(
    (res) => {
      console.log('axios.js response : ' , res);
      return res
    },
    (error) => {
      console.error("Axios Interceptor")
      console.error(error)
      console.error(error.response.status)

      switch (error.response.status) {
        case 403:
          console.error(error.response.status + " 에러 발생")
          useCookies().cookies.remove('accessToken')
          router.push("/signin")
          alert("로그인이 필요합니다.")
      }

      return Promise.reject(error)
    }
)

export default apiInstance