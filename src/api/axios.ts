import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getAuth } from "firebase/auth";

const auth = getAuth();
//API timeout in seconds
const API_TIMEOUT = 10;

const server = axios.create({
  timeout: API_TIMEOUT * 1000,
  baseURL: process.env.REACT_APP_BASE_URL,
});

type RequestConfig = AxiosRequestConfig & {
  useDefault?: boolean;
  retry?: boolean;
  skipAuthRefresh?: boolean;
};

type OnRequest = (config: RequestConfig) => Promise<RequestConfig>;

type OnResponse = (response: AxiosResponse) => AxiosResponse;

const onRequest: OnRequest = async (config) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken(false);
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

const onResponse: OnResponse = (response) => response;

server.interceptors.request.use(onRequest);
server.interceptors.response.use(onResponse);

export default server;
