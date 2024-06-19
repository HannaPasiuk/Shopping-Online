'use client'

import styles from '@/styles/product-list-item/index.module.scss'
import { IProductInfoLabelProps } from '@/types/modules'

const ProductColor = ({ color, className }: IProductInfoLabelProps) => {


  return (
    <span className={`${styles.product__color} ${className || ''}`}>
      <span>{color}:</span>{' '}
      {[color]}
    </span>
  )
}

export default ProductColor