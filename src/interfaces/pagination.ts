export type IPaginatedResponse<T> = {
  page: number;
  limit: number;
  total: number;
  data: T;
};

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};
