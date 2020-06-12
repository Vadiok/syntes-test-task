export interface PaginatedList<T> {
  items: T[];

  page: number;

  perPage: number;

  total: number;
}
