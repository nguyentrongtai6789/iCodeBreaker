import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

export const URL = process.env.REACT_APP_API_DEMO;

export const URL_AUTH = process.env.REACT_APP_API_AUTH;

class Services {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: URL,
      timeout: 60000,
    });
    this.axios.interceptors.response.use(
      function (response: AxiosResponse) {
        return Promise.resolve(response);
      },
      function (error: AxiosError) {
        const language = localStorage.getItem("language");
        //các lỗi chung sẽ bắt ở đây
        //token hết hạn
        if (error?.response?.status === 401) {
        }
        //notfound
        if (error?.response?.status === 404) {
        }
        //network error
        if (error?.code === AxiosError.ERR_NETWORK) {
        }
        return Promise.reject(error);
      }
    );
    this.attachTokenToHeader();
  }

  //gắn token vào header request:
  public attachTokenToHeader() {
    const token = localStorage.getItem("userToken");
    this.axios.interceptors.request.use(
      function (config: any) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      function (error: any) {
        return Promise.reject(error);
      }
    );
  }

  public get<T = any, R = T, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<R, D>> {
    return new Promise((resolve, reject) => {
      this.axios
        .get<T, AxiosResponse<R>, D>(url, config)
        .then((response) => resolve(response))
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  public post<D, R>(
    url: string,
    data?: D,
    config: any = {}
  ): Promise<AxiosResponse<R, D>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post<D, AxiosResponse<R>>(url, data, config)
        .then((response: AxiosResponse) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  public put<D = any, R = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<R, D>> {
    return new Promise((resolve, reject) => {
      this.axios
        .put<D, AxiosResponse<R>>(url, data, config)
        .then((response) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }

  public delete<D = any, R = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<R, D>> {
    return new Promise((resolve, reject) => {
      this.axios
        .delete<D, AxiosResponse<R>>(url, config)
        .then((response) => resolve(response))
        .catch((error: AxiosError) => reject(error));
    });
  }
}

export default new Services();
