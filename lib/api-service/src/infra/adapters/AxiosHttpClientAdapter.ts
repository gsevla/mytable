import axios, { AxiosInstance } from 'axios';
import { HttpClientProtocol } from '../../protocols/HttpClient';

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
      headers: { [x: string]: unknown };
      params: { [x: string]: unknown };
    }
  ): Promise<{ status: number; data?: R }> {
    const result = await this.client.get(url, config);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async post<R = unknown>(
    url: string,
    body?: { [x: string]: unknown },
    config?: {
      headers: { [x: string]: unknown };
      params: { [x: string]: unknown };
    }
  ): Promise<{ status: number; data?: R }> {
    const result = await this.client.post(url, body, config);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async patch<R = unknown>(
    url: string,
    body?: { [x: string]: unknown },
    config?: {
      headers: { [x: string]: unknown };
      params: { [x: string]: unknown };
    }
  ): Promise<{ status: number; data?: R }> {
    const result = await this.client.patch(url, body, config);
    return {
      status: result.status,
      data: result.data,
    };
  }

  async delete(
    url: string,
    config?: {
      headers: { [x: string]: unknown };
      params: { [x: string]: unknown };
    }
  ): Promise<{ status: number }> {
    const result = await this.client.delete(url, config);
    return {
      status: result.status,
    };
  }
}
