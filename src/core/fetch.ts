enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
};

type Options = {
  method: METHOD;
  data?: any;
  headers?: {[key: string]: any}
};

// Тип Omit принимает два аргумента: первый — тип, второй — строка
// и удаляет из первого типа ключ, переданный вторым аргументом
// type OptionsWithoutMethod = Omit<Options, 'method'>;
// Этот тип эквивалентен следующему:
// type OptionsWithoutMethod = { data?: any };

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

function queryStringify(data: {[key: string]: string}) {
  // Можно делать трансформацию GET-параметров в отдельной функции
  if (typeof data !== 'object')
    throw new Error('Data is not object');

  // const keys = Object.keys(data);
  // return keys.reduce((result, key, index) => {
  //   return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  // }, '?');
  const params = new URLSearchParams(data).toString();
  return `?${params}`;
}

class HTTPTransport {
  get: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHOD.GET });
  };

  put: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHOD.PUT });
  };

  post: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHOD.POST });
  };

  delete: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHOD.DELETE });
  };

  request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const { method, headers = {}, data } = options;
    
    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();

      if (method === METHOD.GET && data) 
        url += queryStringify(data);

      xhr.open(method, url);

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        // resolve(xhr);
        if (xhr.status >= 200 && xhr.status < 300) 
          resolve(xhr);
        else 
          reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
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

      if (method === METHOD.GET || !data) 
        xhr.send();
      else 
        xhr.send(data);
    });
  };
}

export default HTTPTransport;
