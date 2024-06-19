'use client'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUnit } from 'effector-react'
import { loadOneProduct, loadOneProductFx } from '@/context/goods'
import { IProductPageProps } from '@/types/product'
import ProductPageContent from '@/components/modules/ProductPage/ProductPageContent'
import { $currentProduct } from '@/context/goods'
import styles from '@/styles/product/index.module.scss'
import { useEffect } from 'react'
import { notFound } from 'next/navigation'

const ProductPage = ({ productId, category }: IProductPageProps) => {
  const product = useUnit($currentProduct)
  const productSpinner = useUnit(loadOneProductFx.pending)


  useEffect(() => {
    loadOneProduct({
      productId,
      category,
    })
  }, [])

  if (product?.errorMessage) {
    notFound()
  }
  return (
    <div className={styles.product}>
      {productSpinner ? (
        <div className={styles.product__preloader}>
          <FontAwesomeIcon icon={faSpinner} spin size='8x' />
        </div>
      ) : (
        product.name && <ProductPageContent />
      )}
    </div>
  )
}

export default ProductPage