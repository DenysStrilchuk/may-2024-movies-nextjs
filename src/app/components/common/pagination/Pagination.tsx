"use client";

import React, {FC} from "react";
import {Pagination as MuiPagination} from "@mui/material";
import {useTheme} from "next-themes";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
  const {theme} = useTheme();

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      siblingCount={3}
      sx={{
        '& .MuiPaginationItem-root': {
          color: theme === "light" ? 'black' : 'white',
        },
        '& .MuiPaginationItem-root.Mui-selected': {
          color: theme === "light" ? 'blue' : 'yellow',
        },
      }}
    />
  );
};

export {Pagination};
