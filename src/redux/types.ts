export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
  errorCode?: string;
}

export interface PageResponse<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  firstPage: boolean;
  lastPage: boolean;
}

export interface PageRequest {
  pageNumber?: number;
  pageSize?: number;
}
