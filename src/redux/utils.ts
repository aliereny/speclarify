import { AxiosError } from "axios";

export function errorMessage(error: any): string {
  if (error.response) {
    if (error.response.data.message) {
      return error.response.data.message;
    } else {
      return error.response.statusText;
    }
  } else if (error.request) {
    return "No response from server";
  } else {
    return "Something went wrong";
  }
}

export function navigateOutsideJSX(url: string) {
  window.location.href = url;
}
