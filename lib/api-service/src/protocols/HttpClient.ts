export type Headers = Record<string, unknown>;

export type Params = Record<string, unknown>;

export type Body = Record<string, unknown>;

export type Config = {
  headers: Headers;
  params: Params;
};

export type Response<T = unknown> = {
  status: number;
  data: T;
  error?: never;
};

export type ResponseError = {
  status: number;
  error: string;
  data?: never;
};

export type RequestError = string;

export type HttpOperationResult<R = unknown> = Promise<
  Response<R> | ResponseError
>;

export type AwaitedHttpOperationResult<R = unknown> = Awaited<
  HttpOperationResult<R>
>;

export interface HttpClientProtocol {
  baseUrl: string;

  get<R = unknown>(url: string, config?: Config): HttpOperationResult<R>;

  post<R = unknown>(
    url: string,
    body?: Body,
    config?: Config
  ): HttpOperationResult<R>;

  patch<R = unknown>(
    url: string,
    body?: Body,
    config?: Config
  ): HttpOperationResult<R>;

  delete<R = void>(url: string, config?: Config): HttpOperationResult<R>;

  setHeader(key: string, value: string): void;
}
