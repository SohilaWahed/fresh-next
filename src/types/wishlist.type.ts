export interface WishlistType {
  _id: string
  title: string
  imageCover: string
  description: string
  price: number
  category: {
    _id: string
    name: string
    slug: string
  }
  brand: {
    _id: string
    name: string
    slug: string
  }
}
