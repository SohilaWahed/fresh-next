import AllCategories from '@/api/AllCategories';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryType } from '@/types/category.type';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default async function Categories({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1;

  const data = await AllCategories(currentPage, 6);

  return (
    <>
      <div className='w-[80%] mx-auto my-14'>
        <div className='flex flex-wrap '>
   {data.map((category: CategoryType) => (
     <div key={category._id} className="w-full md:w-1/3">
<Card className="cursor-pointer">
  <Link href={`/categories/${category._id}`}>
    <CardHeader>
      <CardTitle>
        <Image
             src={category.image}
                        alt={category.name}
      className='w-full h-[200px] object-cover'
                        width={300}
                        height={200}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center font-bold">{category.name}</p>
                  </CardContent>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center my-10">
        <Pagination>
          <PaginationContent>
<PaginationItem>
  <PaginationPrevious href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`} />
</PaginationItem>

<PaginationItem>
  <PaginationLink href="?page=1">1</PaginationLink>
</PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href={`?page=${currentPage + 1}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}
