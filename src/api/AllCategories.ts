export default async function AllCategories(page: number = 1, limit: number = 6) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories?page=${page}&limit=${limit}`
  );

  const { data } = await response.json();
  return data;
}
