export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: {
    field?: string;
    error?: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
