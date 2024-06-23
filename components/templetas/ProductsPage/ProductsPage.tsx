'use client'
import ReactPaginate from 'react-paginate'
import { IProductsPage } from '@/types/catalog'
import { useProductFilters } from '@/hooks/useProductFilters'
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/cart-skeleton/index.module.scss'
import { motion } from 'framer-motion'
import { basePropsForMotion } from '@/constants/motion'
import ProductListItem from '@/components/modules/ProductListItem/ProductListItem'


const ProductsPage = ({ searchParams, pageName }: IProductsPage) => {
  const {products,
    productsSpinner,
    paginationProps,
    handlePageChange,
  } = useProductFilters(searchParams,
     pageName,
     pageName === 'catalog')

  return (
    <>
    <h1 className={styles.catalog__title}>Catalog</h1>
   {productsSpinner && (
    <motion.ul {...basePropsForMotion}
    className={skeletonStyles.skeleton}
    style={{marginBottom: 40}}
    >
    {Array.from(new Array(8)).map((_, i) => (
        <li key={i}
         className={skeletonStyles.skeleton__item}>
        <div className={skeletonStyles.skeleton__item__light}/>
        </li>
    ))}
    </motion.ul>
   )}

   {!productsSpinner && (
    <motion.ul {...basePropsForMotion}
    className={skeletonStyles.skeleton}
    style={{
      marginBottom: 40, marginTop: 40,
      display: 'flex', justifyContent: 'space-between',
      flexWrap: 'wrap'
      }}
    >
    {(products.items || []).map((item) => (
      <ProductListItem key={item._id} item={item} />
    ))}
    </motion.ul>
   )}


    <div className={styles.catalog__bottom}>
      <ReactPaginate {...paginationProps}
      onPageChange={handlePageChange}
      />
    </div>
 </>
  )
}

export default ProductsPage