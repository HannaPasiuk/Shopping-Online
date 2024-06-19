import { getCartCount } from "@/lib/utils/common"
import { ICartItem } from "@/types/cart"
import styles from '@/styles/product-cart-indicator/index.module.scss'

const ProductCountByCart = ({products}: {products: ICartItem[]}) => (
    <>
        {!!getCartCount(products)  && (
      <span className={styles.product__count}>{getCartCount(products)}</span>
        )}
    </>
)
 
export default ProductCountByCart