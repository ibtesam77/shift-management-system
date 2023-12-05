export interface Response {
  success: boolean;
}

export interface SuccessResponse<T> extends Response {
  data: T;
}

export interface ErrorResponse {
  error: any;
  message: string;
}
