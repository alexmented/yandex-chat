import {isPlainObject, queryString} from './queryString';

enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type Options = {
    data?: object,
    method?: METHODS,
    headers?: HeadersInit,
    timeout?: number,
}

export class HTTPTransport {
	baseUrl: string;
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}
    get = (url:string, options: Options = {}) => this.request(this.baseUrl + url, {...options, method: METHODS.GET}, options.timeout);

    post = (url:string, options: Options = {}) => this.request(this.baseUrl + url, {...options, method: METHODS.POST}, options.timeout);

    put = (url:string, options: Options = {}) => this.request(this.baseUrl + url, {...options, method: METHODS.PUT}, options.timeout);

    delete = (url:string, options: Options = {}) => this.request(this.baseUrl + url, {...options, method: METHODS.DELETE}, options.timeout);

    request = (url:string, options: Options = {}, timeout = 5000) => {
    	const {headers, method, data} = options;

    	return new Promise((resolve, reject) => {
    		if (!method) {
    			reject('No method');
    			return;
    		}

    		const xhr = new XMLHttpRequest();
    		const isGet = method === METHODS.GET;

    		xhr.open(
    			method,
    			isGet && Boolean(data)
    				? `${url}${queryString(data)}`
    				: url,
    		);

			if (isPlainObject(headers)) {
				Object.keys(headers).forEach(key => {
					xhr.setRequestHeader(key, <string>headers[key]);
				});
			} else {
				xhr.setRequestHeader('content-type', 'application/json')
			}

    		xhr.onload = function () {
    			resolve(xhr);
    		};

    		xhr.onabort = reject;
    		xhr.onerror = reject;

    		xhr.timeout = timeout;
    		xhr.ontimeout = reject;
			xhr.withCredentials = true;

    		if (isGet || !data) {
    			xhr.send();
			} else if (!headers) {
				xhr.send(JSON.stringify(data));
			} else {
				// @ts-ignore
				xhr.send(data);
			}
    	});
    };
}
