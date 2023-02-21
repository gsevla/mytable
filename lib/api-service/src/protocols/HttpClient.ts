export type Headers = Record<string, unknown>;

export type Params = Record<string, unknown>;

export type Body = Record<string, unknown>;

export type Config = {
  headers: Headers;
  params: Params;
};

export type Return<T = unknown> = {
  status: number;
  data?: T;
  error?: string;
};

export interface HttpClientProtocol {
  baseUrl: string;

  get<R = unknown>(url: string, config?: Config): Promise<Return<R>>;

  post<R = unknown>(
    url: string,
    body?: Body,
    config?: Config
  ): Promise<Return<R>>;

  patch<R = unknown>(
    url: string,
    body?: Body,
    config?: Config
  ): Promise<Return<R>>;

  delete(url: string, config?: Config): Promise<Return>;
}
