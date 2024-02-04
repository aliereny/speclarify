import { RcFile } from 'antd/lib/upload/interface';

export function errorMessage(error: any): string {
  if (error.response) {
    return error.response.data.message;
  } else if (error.request) {
    return 'No response from server';
  } else {
    return 'Something went wrong';
  }
}

export function navigateOutsideJSX(url: string) {
  window.location.href = url;
}