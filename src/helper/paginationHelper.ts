import { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../interfaces/pagination';

type IReturn = Required<IPaginationOptions> & {
  skip: number;
  sortOrder: SortOrder;
};
export const claculatePagination = (options: IPaginationOptions): IReturn => {
  const page = Number(options?.page || 1);
  const limit = Number(options?.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = options?.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
