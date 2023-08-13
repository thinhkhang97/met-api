import { Method } from 'axios';

export abstract class BaseRequest<Body = undefined> {
  private readonly _config: {
    url?: string;
    method: Method;
    headers: Record<string, any>;
    params: Record<string, any>;
    body?: Body;
  } = {
    headers: {},
    method: 'get',
    params: {},
  };

  constructor(public readonly url: string, public readonly method: Method) {
    this._config.url = url;
    this._config.method = method;
  }

  public get config() {
    return this._config;
  }

  public withHeaders(headers: Record<string, any>) {
    this._config.headers = { ...headers };
    return this;
  }

  public withParams(params: Record<string, any>) {
    this._config.params = { ...params };
    return this;
  }

  public withBody(body: Body) {
    this._config.body = body;
    return this;
  }
}
