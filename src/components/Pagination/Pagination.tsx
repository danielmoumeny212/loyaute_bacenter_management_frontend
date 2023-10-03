import React from "react";
import {Pagination} from "@mui/lab";
import {useTheme, Paper} from "@mui/material"; 


interface Props {
  itemsCount: number;
  pageSize: number;
  position?: "start" | "end" | "center"; 
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Paginator: React.FC<Props> = ({
  itemsCount,
  pageSize,
  position="end", 
  onPageChange,
  currentPage,
}: Props) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const theme = useTheme(); 

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  if (pagesCount === 1) return null;

  return (
    <div style={{ 
      display: "flex",
      justifyContent: `flex-${position}`,
    
      }}>
      <Pagination
        color="primary"
        count={pagesCount}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Paginator;
