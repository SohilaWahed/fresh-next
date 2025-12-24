export default async function getProducts(page: number = 1, limit: number = 12) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`,
    {
      method: "GET",
      next: { revalidate: 60 },
    }
  );

  const { data } = await response.json();
  return data;
}
