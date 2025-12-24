"use client";
import getProducts from '@/api/products.api';
import React, { useState, useEffect } from 'react';
import SingleProduct from '../singleProduct/singleProduct';
import { ProductType } from '@/types/product.type';
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Allproducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);      
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts(page, 12); 
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [page]);

  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-[80%] mx-auto my-14'>
      <input
        type="search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full p-2 border rounded"
      />

      <div className='flex flex-wrap'>
        {loading ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="p-2">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-[20px] w-6/12 rounded-lg my-3" />
                <Skeleton className="h-[20px] w-2/12 rounded-lg my-3" />
                <Skeleton className="h-[40px] w-full rounded-lg my-3" />
              </div>
            ))}
          </div>
        ) : (
          filtered.map(product => (
            <SingleProduct key={product._id} product={product} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                {page}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" onClick={() => setPage(prev => prev + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
