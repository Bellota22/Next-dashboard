'use client'

import { Pagination } from '@mantine/core'
import { useSearchParams,useRouter } from 'next/navigation';
import React from 'react'

interface PaginationCustomersProps {
  totalPages: number;
  currentPage: number;
  }

export default function PaginationCustomers({totalPages, currentPage}: PaginationCustomersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
  
    
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`/dashboard/customers?${params.toString()}`);
      };
    
  return (
    <Pagination color="primary" withEdges total={totalPages} value={currentPage} onChange={handlePageChange} />
  )
}

