import ProductsPage from '@/components/templetas/ProductPage/ProductPage'
import { productCategories } from '@/constants/product'
import { notFound } from 'next/navigation'

export default function Category({ params }: { params: { category: string } }) {
  if (!productCategories.includes(params.category)) {
    notFound()
  }

  return <ProductsPage  category={params.category}  productId=''/>
}