'use client'

import { Pagination } from '@mantine/core'
import { useSearchParams,useRouter } from 'next/navigation';
import React from 'react'

interface PaginationVets {
  totalPages: number;
  currentPage: number;
  }

export default function PaginationVets({totalPages, currentPage}: PaginationVets) {
    const router = useRouter();
    const searchParams = useSearchParams();
  
    
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`/dashboard/vets?${params.toString()}`);
      };
    
  return (
    <Pagination color="primary" withEdges total={totalPages} value={currentPage} onChange={handlePageChange} />
  )
}

