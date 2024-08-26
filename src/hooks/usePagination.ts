import { useEffect, useMemo, useState } from 'react';

const usePagination = <T>(data: T[], dataPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => Math.ceil(data.length / dataPerPage), [data, dataPerPage]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * dataPerPage;
    const end = start + dataPerPage;
    return data.slice(start, end);
  }, [data, currentPage, dataPerPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return { paginatedData, currentPage, totalPages, handlePageChange };
};

export default usePagination;
