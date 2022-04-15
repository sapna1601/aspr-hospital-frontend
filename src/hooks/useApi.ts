import { useState } from "react";
import { axiosInstance } from "src/api";
import { ApiMethods } from "src/model";
import { AxiosResponse } from "axios";

interface UseApiState<T> {
  loading: boolean;
  data: T;
  error: any;
}
type fetchFunction = (
  url: string,
  method: ApiMethods,
  data?: any,
  headers?: any
) => Promise<AxiosResponse<any>>;

const useApi = <T>(): [fetchFunction, UseApiState<T>] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<T>(null as any);

  const fetch = async (
    url: string,
    method: ApiMethods,
    payload?: any,
    header?: any
  ) => {
    setLoading(true);
    if (method === ApiMethods.GET) {
      return axiosInstance
        .get<T>(url, {
          headers: header,
        })
        .then((res) => {
          setLoading(false);
          setData(res.data);
          return res;
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
          throw err;
          return err;
        });
    } else if (method === ApiMethods.POST) {
      return axiosInstance
        .post<T>(url, payload, {
          headers: header,
        })
        .then((res) => {
          setLoading(false);
          setData(res.data);
          return res;
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
          throw err;
          return err;
        });
    } else if (method === ApiMethods.PUT) {
      return axiosInstance
        .put<T>(url, payload, {
          headers: header,
        })
        .then((res) => {
          setLoading(false);
          setData(res.data);
          return res;
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
          throw err;
          return err;
        });
    } else if (method === ApiMethods.DELETE) {
      return axiosInstance
        .delete<T>(url, {
          headers: header,
        })
        .then((res) => {
          setLoading(false);
          setData(res.data);
          return res;
        })
        .catch((err) => {
          setLoading(false);
          setError(err);
          throw err;
          return err;
        });
    }
  };

  return [fetch, { loading, error, data }];
};

export default useApi;
