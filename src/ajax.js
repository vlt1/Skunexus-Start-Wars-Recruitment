import { isNil } from 'lodash';

const BASE_URL = 'swapi.dev/api/';

export const ajaxRequest = (url, {method = 'GET', payload, responseType = 'json', timeout = 7000, reqHeaders = {}} = {}) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, `${window.location.protocol}//${BASE_URL}${url}`, true);

    Object.keys(reqHeaders)
        .filter(header => !isNil(reqHeaders[header]))
        .forEach(header => xhr.setRequestHeader(header, reqHeaders[header]));
    xhr.responseType = responseType;
    xhr.timeout = timeout;

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve({
            status: xhr.status,
            response: xhr.response,
            timeout: false
          });
        } else {
          reject({
            status: xhr.status,
            timeout: false
          });
        }
      }
    });
    xhr.addEventListener('timeout', () => {
      reject({timeout: true});
    });

    xhr.send(payload);
  });
};

export default ajaxRequest;
