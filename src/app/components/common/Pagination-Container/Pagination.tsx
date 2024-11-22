import {FC} from 'react';
import {Pagination as MuiPagination} from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      siblingCount={1}
    />
  );
};

export {Pagination};
