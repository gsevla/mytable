import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders } from 'axios';
import type {
  Body,
  Headers,
  HttpClientProtocol,
  HttpOperationResult,
  Params,
} from '../../protocols/HttpClient';

export class AxiosHttpClientAdapter implements HttpClientProtocol {
  baseUrl: string;

  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.client = axios.create({ baseURL: baseUrl });
  }

  private static errorHandler(error: AxiosError) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        status: error.response.status,
        error: error.response.data as string,
      };
    }
    throw new Error(error.message);
    // if (error.request) {
    //   // The request was made but no response was received
    //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //   // http.ClientRequest in node.js
    //   return `Error on try to request: ${error.config.url}`
    // }
    // // Something happened in setting up the request that triggered an Error
    // return error.message
  }

  public async get<R = unknown>(
    url: string,
    config?: {
      headers: Headers;
      params: Params;
    }
  ): HttpOperationResult<R> {
    try {
      const result = await this.client.get(url, {
        headers: config?.headers as AxiosRequestHeaders,
        params: config?.params,
      });
      return {
        status: result.status,
        data: result.data as R,
      };
    } catch (error) {
      throw AxiosHttpClientAdapter.errorHandler(error as AxiosError);
    }
  }

  public async post<R = unknown>(
    url: string,
    body?: Body,
    config?: {
      headers: Headers;
      params: Params;
    }
  ): HttpOperationResult<R> {
    try {
      const result = await this.client.post(url, body, {
        headers: config?.headers as AxiosRequestHeaders,
        params: config?.params,
      });
      return {
        status: result.status,
        data: result.data as R,
      };
    } catch (error) {
      throw AxiosHttpClientAdapter.errorHandler(error as AxiosError);
    }
  }

  public async patch<R = unknown>(
    url: string,
    body?: Body,
    config?: {
      headers: Headers;
      params: Params;
    }
  ): HttpOperationResult<R> {
    try {
      const result = await this.client.patch(url, body, {
        headers: config?.headers as AxiosRequestHeaders,
        params: config?.params,
      });
      return {
        status: result.status,
        data: result.data as R,
      };
    } catch (error) {
      throw AxiosHttpClientAdapter.errorHandler(error as AxiosError);
    }
  }

  public async delete<R = void>(
    url: string,
    config?: {
      headers: Headers;
      params: Params;
    }
  ): HttpOperationResult<R> {
    try {
      const result = await this.client.delete(url, {
        headers: config?.headers as AxiosRequestHeaders,
        params: config?.params,
      });
      return {
        data: result.data as R,
        status: result.status,
      };
    } catch (error) {
      throw AxiosHttpClientAdapter.errorHandler(error as AxiosError);
    }
  }

  public setHeader(key: string, value: string) {
    this.client.defaults.headers[key] = value;
  }
}
