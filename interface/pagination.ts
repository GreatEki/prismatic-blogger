export interface Paginate {
  nextPage: { page: number; limit: number };
  prevPage: { page: number; limit: number };
  count: number;
  result: any[];
}
