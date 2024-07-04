'use client'

import { Pagination } from '@mantine/core'
import { useSearchParams,useRouter } from 'next/navigation';
import React from 'react'

interface PaginationPetsProps {
  totalPages: number;
  currentPage: number;
  }

export default function PaginationPets({totalPages, currentPage}: PaginationPetsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
  
    
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`/dashboard/mascotas?${params.toString()}`);
      };
    
  return (
    <Pagination color="primary" withEdges total={totalPages} value={currentPage} onChange={handlePageChange} />
  )
}

