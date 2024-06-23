'use client'
import ReactPaginate from 'react-paginate'
import { IProductsPage } from '@/types/catalog'
import { useProductFilters } from '@/hooks/useProductFilters'
import { motion } from 'framer-motion'
import { basePropsForMotion } from '@/constants/motion'
import ProductListItem from '@/components/modules/ProductListItem/ProductListItem'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import { useEffect } from 'react'
import { setCatalogCategoryOptions } from '@/context/catalog'
import CatalogFilters from '@/components/modules/CatalogFilters/CatalogFiltres'
import Link from 'next/link'
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/cart-skeleton/index.module.scss'
import stylesTitle from '@/styles/heading-with-count/index.module.scss'




const ProductsPage = ({ searchParams, pageName }: IProductsPage) => {
  const { products,
    productsSpinner,
    paginationProps,
    handlePageChange,
    handleApplyFiltersWithCategory,
  } = useProductFilters(searchParams,
    pageName,
    pageName === 'catalog')

  useEffect(() => {
    switch (pageName) {
      case 'catalog':
        setCatalogCategoryOptions({
          rootCategoryOptions: [
            {
              id: 2,
              title: 'cloth',
              href: '/catalog/cloth',
            },
            {
              id: 3,
              title: 'accessories',
              href: '/catalog/accessories',
            },
            {
              id: 4,
              title: 'shoes',
              href: '/catalog/shoes',
            },
            {
              id: 5,
              title: 'bags',
              href: '/catalog/bags',
            },
          ]
        })
        break

      case 'accessories':
        setCatalogCategoryOptions({
          accessoryCategoryOptions: [
            {
              id: 1,
              title: 'glasses',
              filterHandler: () => handleApplyFiltersWithCategory('glasses'),
            },

          ]
        })
        break

      case 'cloth':
        setCatalogCategoryOptions({
          clothCategoryOptions: [
            {
              id: 1,
              title: 'sweaters',
              filterHandler: () => handleApplyFiltersWithCategory('sweaters'),
            },
            {
              id: 2,
              title: 'dresses',
              filterHandler: () => handleApplyFiltersWithCategory('dresses'),
            },
            {
              id: 3,
              title: 'pants',
              filterHandler: () => handleApplyFiltersWithCategory('pants'),
            },
            {
              id: 4,
              title: 'blouse',
              filterHandler: () => handleApplyFiltersWithCategory('blouse'),
            },
            {
              id: 5,
              title: 'shirts',
              filterHandler: () => handleApplyFiltersWithCategory('shirts'),
            },
            {
              id: 6,
              title: 'shorts',
              filterHandler: () => handleApplyFiltersWithCategory('shorts'),
            },

          ]
        })
        break
      


      default:
        break
    }
  }, [])
  return (
    <>
      <Link className={stylesTitle.title__catalog}
        href={'/catalog'}>Catalog</Link>
      <HeadingWithCount
        count={products.count || 0}
        title={pageName}
        spinner={productsSpinner}
      />
      <CatalogFilters />
      {productsSpinner && (
        <motion.ul {...basePropsForMotion}
          className={skeletonStyles.skeleton}
          style={{ marginBottom: 40 }}
        >
          {Array.from(new Array(8)).map((_, i) => (
            <li key={i}
              className={skeletonStyles.skeleton__item}>
              <div className={skeletonStyles.skeleton__item__light} />
            </li>
          ))}
        </motion.ul>
      )}

      {!productsSpinner && (
        <motion.ul {...basePropsForMotion}
          className={skeletonStyles.skeleton}
          style={{
            marginBottom: 40, marginTop: 40,
            display: 'flex',
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