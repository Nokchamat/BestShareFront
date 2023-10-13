import axios from "axios";
import {useCookies} from "vue3-cookies";
import router from "@/router";

const apiInstance = axios.create({
  baseURL: 'http://localhost:8080/v1',
});

apiInstance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = useCookies().cookies.get('accessToken')
      console.log('axios.js request : ' , config);
      return config
    },
    (error) => {
      return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (res) => {
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
          router.push("/sign")
          alert("로그인이 필요합니다.")
      }

      return Promise.reject(error)
    }
)

export default apiInstance