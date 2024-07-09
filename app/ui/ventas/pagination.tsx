'use client'

import { Pagination } from '@mantine/core'
import { useSearchParams,useRouter } from 'next/navigation';
import React from 'react'

interface PaginationSalesProps {
  totalPages: number;
  currentPage: number;
  }

function PaginationSales({totalPages, currentPage}: PaginationSalesProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
  
    
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`/dashboard/ventas?${params.toString()}`);
      };
    
  return (
    <Pagination color="primary" withEdges total={totalPages} value={currentPage} onChange={handlePageChange} />
  )
}

export default PaginationSales