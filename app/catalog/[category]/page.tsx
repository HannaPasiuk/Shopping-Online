
import { productCategories } from '@/constants/product'
import { notFound } from 'next/navigation'

export default function Category({ params }: { params: { category: string } }) {
  if (!productCategories.includes(params.category)) {
    notFound()
  }

  return <h1>{params.category}</h1>
}
