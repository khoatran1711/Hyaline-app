import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders,
} from "axios";
import { HttpStatusCode } from "./http-status-code";
import { RootStore } from "../../domain";
import { checkToken } from "../state";

export interface HttpResult<T> {
  isSuccess: boolean;
  status: HttpStatusCode;
  statusText: string;
  data: T;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: AxiosRequestConfig;
  error?: any;
  errorCode?: HttpServiceError;
}

export enum HttpServiceError {
  ApiError = "API_ERROR",
  NoResponse = "NO_RESPONSE",
  RequestError = "REQUEST_ERROR",
}

export class HttpService {
  private client: AxiosInstance;

  /**
   * Handling response
   *
   * @private
   * @memberof HttpService
   */
  private responseHandler = (response: AxiosResponse): any => {
    return {
      isSuccess: response.status < 300,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      config: response.config,
    };
  };

  /**
   * Handling error
   * Source: https://github.com/axios/axios#handling-errors
   *
   * @private
   * @memberof HttpService
   */
  private errorHandler = (error: AxiosError): HttpResult<any> => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      //Expired Token
      if (error.response.status === HttpStatusCode.Unauthorized) {
        // RootStore.dispatch(AuthenticationActions.logOut());
        // resetNavigate(PagePath.Login);

        return {
          isSuccess: false,
          status: error.response.status,
          statusText: "Phiên đăng nhập đã hết hạn",
          headers: error.response.headers,
          data: null,
          config: error.response.config,
          error: error.response.data,
          errorCode: HttpServiceError.ApiError,
        };
      }

      return {
        isSuccess: false,
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: error.response.data,
        config: error.response.config,
        error: error.response.data,
        errorCode: HttpServiceError.ApiError,
      };
    }

    const errorCode = error.request
      ? HttpServiceError.NoResponse
      : HttpServiceError.RequestError;

    return {
      isSuccess: false,
      error,
      errorCode,
      status: 0,
      statusText: "",
      headers: {},
      data: null,
      config: {},
    };
  };

  constructor(
    headers: { [key: string]: any } = {},
    skipToken?: boolean,
    baseUrl?: string
  ) {
    const url = baseUrl ? baseUrl : process.env.REACT_APP_HYALINE_URL;
    this.client = skipToken
      ? axios.create({
          headers,
          withCredentials: true,
          baseURL: url,
        })
      : axios.create({
          headers,
          baseURL: url,
        });

    this.client.interceptors.response.use(
      this.responseHandler,
      this.errorHandler
    );

    if (skipToken) {
      this.client.interceptors.request.use(
        (config) => {
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    } else {
      this.client.interceptors.request.use(
        async (config) => {
          await RootStore.dispatch(checkToken());

          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  }

  /**
   * Get JSON from URL
   *
   * @template T Response data type
   * @param {string} url
   * @param {AxiosRequestConfig} [configs]
   * @returns {Promise<HttpResult<T>>}
   * @memberof HttpService
   */
  get<T>(url: string, configs?: AxiosRequestConfig): Promise<HttpResult<T>> {
    const promise = this.client.get(url, configs) as Promise<HttpResult<T>>;

    return promise;
  }

  /**
   * Post JSON data to URL and receive JSON response
   *
   * @template TData Input data type
   * @template TResponse Response data type
   * @param {string} url
   * @param {TData} data
   * @param {AxiosRequestConfig} [configs]
   * @returns {Promise<HttpResult<TResponse>>}
   * @memberof HttpService
   */
  post<TData, TResponse>(
    url: string,
    data: TData,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<TResponse>> {
    const promise = this.client.post(url, data, configs) as Promise<
      HttpResult<TResponse>
    >;

    return promise;
  }

  /**
   * Put JSON data to URL and receive JSON response
   *
   * @template TData Input data type
   * @template TResponse Response data type
   * @param {string} url
   * @param {TData} data
   * @param {AxiosRequestConfig} [configs]
   * @returns {Promise<HttpResult<TResponse>>}
   * @memberof HttpService
   */
  put<TData, TResponse>(
    url: string,
    data: TData,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<TResponse>> {
    const promise = this.client.put(url, data, configs) as Promise<
      HttpResult<TResponse>
    >;

    return promise;
  }

  /**
   * Patch JSON data to URL and receive JSON response
   *
   * @template TData Input data type
   * @template TResponse Response data type
   * @param {string} url
   * @param {TData} data
   * @param {AxiosRequestConfig} [configs]
   * @returns {Promise<HttpResult<TResponse>>}
   * @memberof HttpService
   */
  patch<TData, TResponse>(
    url: string,
    data: TData,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<TResponse>> {
    const promise = this.client.patch(url, data, configs) as Promise<
      HttpResult<TResponse>
    >;

    return promise;
  }

  /**
   * Delete to URL and receive JSON response
   *
   * @template T Response data type
   * @param {string} url
   * @param {AxiosRequestConfig} [configs]
   * @returns {Promise<HttpResult<T>>}
   * @memberof HttpService
   */
  delete<T>(url: string, configs?: AxiosRequestConfig): Promise<HttpResult<T>> {
    const promise = this.client.delete(url, configs) as Promise<HttpResult<T>>;

    return promise;
  }
}
