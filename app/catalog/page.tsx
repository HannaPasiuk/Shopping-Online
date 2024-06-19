import ProductsPage from '@/components/templetas/ProductPage/ProductPage'
import { SearchParams } from '@/types/catalog'

export default function Catalog({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  return <ProductsPage category=''  productId=''/>
}