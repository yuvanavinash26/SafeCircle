export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | any;
  timestamp: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
