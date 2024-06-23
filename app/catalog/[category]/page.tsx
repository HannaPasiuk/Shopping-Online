import ProductsPage from '@/components/templetas/ProductsPage/ProductsPage'
import { productCategories } from '@/constants/product'
import { notFound } from 'next/navigation'

export default function Category({ params }: { params: { category: string } }) {
  if (!productCategories.includes(params.category)) {
    notFound()
  }

  return <ProductsPage searchParams={params || {}} pageName={params.category} />
}