import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import type {
  Body,
  Headers,
  HttpClientProtocol,
  Params,
  Return,
} from '../../protocols/HttpClient';

export class AxiosHttpClientAdapter implements HttpClientProtocol {
  baseUrl: string;

  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.client = axios.create({ baseURL: baseUrl });
  }

  async get<R = unknown>(
    url: string,
    config?: {
      headers: Headers;
      params: Params;
    }
  ): Promise<Return<R>> {
    const result = await this.client.get(url, {
      headers: config?.headers as AxiosRequestHeaders,
      params: config?.params,
    });
    return {
      status: result.status,
      data: result.data as R,
    };
  }

  async post<R = unknown>(
    url: string,
    body?: Body,
    config?: {
      headers: Headers;
      params: Params;
    }
  ): Promise<Return<R>> {
    const result = await this.client.post(url, body, {
      headers: config?.headers as AxiosRequestHeaders,
      params: config?.params,
    });
    return {
      status: result.status,
      data: result.data as R,
    };
  }

  async patch<R = unknown>(
    url: string,
    body?: Body,
    config?: {
      headers: Headers;
      params: Params;
    }
  ): Promise<Return<R>> {
    const result = await this.client.patch(url, body, {
      headers: config?.headers as AxiosRequestHeaders,
      params: config?.params,
    });
    return {
      status: result.status,
      data: result.data as R,
    };
  }

  async delete(
    url: string,
    config?: {
      headers: Headers;
      params: Params;
    }
  ): Promise<{ status: number }> {
    const result = await this.client.delete(url, {
      headers: config?.headers as AxiosRequestHeaders,
      params: config?.params,
    });
    return {
      status: result.status,
    };
  }
}
