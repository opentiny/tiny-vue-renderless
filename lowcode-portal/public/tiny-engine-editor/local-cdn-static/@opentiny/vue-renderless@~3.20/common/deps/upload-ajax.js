import "../../chunk-G2ADBYYC.js";
import { hasOwn } from './../type.js';
import { xss } from './../xss.js';
const getBody = xhr => {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
};
const getError = (action, option, xhr) => {
  let errorText;
  if (xhr.response) {
    errorText = xhr.response.error || xhr.response;
  } else if (xhr.responseText) {
    errorText = xhr.responseText;
  } else {
    errorText = `fail to post ${action} ${xhr.status}`;
  }
  const error = new Error(errorText);
  error.status = xhr.status;
  error.method = "post";
  error.url = action;
  return error;
};
var upload_ajax_default = option => {
  if (typeof XMLHttpRequest === "undefined") {
    return;
  }
  const xhr = new XMLHttpRequest();
  const action = xss.filterUrl(option.action);
  if (xhr.upload) {
    xhr.upload.onprogress = event => {
      if (event.total > 0) {
        event.percent = event.loaded / event.total * 100;
      }
      option.onProgress(event);
    };
  }
  const formData = new FormData();
  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formData.append(key, option.data[key]);
    });
  }
  if (Array.isArray(option.file)) {
    option.file.forEach(file => {
      formData.append(option.filename, file, file.name);
    });
  } else {
    formData.append(option.filename, option.file, option.file.name);
  }
  xhr.onerror = event => {
    option.onError(event);
  };
  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }
    option.onSuccess(getBody(xhr));
  };
  xhr.open("post", action, true);
  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }
  const headers = option.headers || {};
  for (let header in headers) {
    if (hasOwn.call(headers, header) && headers[header] !== null) {
      xhr.setRequestHeader(header, headers[header]);
    }
  }
  xhr.send(formData);
  return xhr;
};
export { upload_ajax_default as default };