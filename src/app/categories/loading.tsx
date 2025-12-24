import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="p-2">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[20px] w-6/12 rounded-lg my-3" />
          <Skeleton className="h-[20px] w-2/12 rounded-lg my-3" />
          <Skeleton className="h-[40px] w-full rounded-lg my-3" />
        </div>
      ))}
    </div>
    </>
  )
}
