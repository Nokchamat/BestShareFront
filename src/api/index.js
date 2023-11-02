import axios from "axios";
import router from "@/router";
import store from "@/store";

const apiInstance = axios.create({
  baseURL: 'http://localhost:8080/v1',
});

apiInstance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = store.state.accessToken
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
          store.dispatch('logout')
          alert("로그인이 필요합니다.")
          router.push("/sign")
      }

      return Promise.reject(error)
    }
)

export default apiInstance