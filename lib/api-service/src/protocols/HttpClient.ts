type Headers = Record<string, unknown>;

type Params = Record<string, unknown>;

type Options = {
  headers: Headers;
  params: Params;
};

type Data = Record<string, unknown>;

type Return<T = unknown> = {
  status: number;
  data?: T;
};

export interface HttpClientProtocol {
  baseUrl: string;

  get<R = unknown>(url: string, config?: Options): Promise<Return<R>>;

  post<R = unknown>(
    url: string,
    body?: Data,
    config?: Options
  ): Promise<Return<R>>;

  patch<R = unknown>(
    url: string,
    body?: Data,
    config?: Options
  ): Promise<Return<R>>;

  delete(url: string, config?: Options): Promise<Return>;
}
