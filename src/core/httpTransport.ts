import queryStringify from '@/utils/queryStringify';

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

type Methods = typeof METHODS[keyof typeof METHODS];

interface RequestOptions {
  method?: Methods;
  headers?: { [key: string]: string };
  data?: any;
  timeout?: number;
}

class HTTPTransport {
  private apiDomain: string = 'https://ya-praktikum.tech';
  apiUrl: string;
  static GET: string | undefined;

  constructor(endpoint: string = '') {
    this.apiUrl = `${this.apiDomain}${endpoint}`;
  }

  get = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    if (options.data) 
      url += '?' + queryStringify(options.data);
    
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.GET }, options.timeout);
  };

  put = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.PUT }, options.timeout);
  };

  post = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.POST }, options.timeout);
  };

  delete = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  // options:
  // headers — obj
  // data — obj
  request = (url: string, options: RequestOptions, timeout = 5000): Promise<XMLHttpRequest> => {
    const { method, headers = {}, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.withCredentials = true;

      if (data instanceof FormData) 
        delete headers['Content-Type'];
      else 
        headers['Content-Type'] = headers['Content-Type'] || 'application/json;charset=UTF-8';

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) 
          if (this.getResponseHeader('content-type')?.startsWith('application/json')) {
            const data = JSON.parse(this.response);
            resolve(data);
          }
          else
            resolve(this.response);
        else 
          if (this.response)
            reject(JSON.parse(this.response));
          else
            reject(new Error);
      };

      xhr.onerror = function () {
        reject(new Error('Network error'));
      };

      xhr.onabort = function () {
        reject(new Error('Network error'));
      };

      xhr.ontimeout = function () {
        reject(new Error('Request timed out'));
      };

      // Отправляем данные (если это не GET-запрос и данные есть)
      if (method === METHODS.GET || !data) 
        xhr.send();
      else if (data instanceof FormData)
        xhr.send(data);
      // else if (headers['Content-Type'] === 'application/json') 
      //   xhr.send(JSON.stringify(data));
      else 
        xhr.send(JSON.stringify(data));
        // xhr.send(data);
    });
  };
}

export default HTTPTransport;
