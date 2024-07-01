'use client'

import { Pagination } from '@mantine/core'
import { useSearchParams,useRouter } from 'next/navigation';
import React from 'react'

interface PaginationProductProps {
    totalPages: number;
    currentPage: number;
    }

function PaginationProduct({totalPages, currentPage}: PaginationProductProps) {
    console.log('totalPages::: ', totalPages);
    const router = useRouter();
    const searchParams = useSearchParams();
  
    
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`/dashboard/products?${params.toString()}`);
      };
    
  return (
    <Pagination color="primary" withEdges total={totalPages} value={currentPage} onChange={handlePageChange} />
  )
}

export default PaginationProduct