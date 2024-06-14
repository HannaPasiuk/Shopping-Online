import { IProductListItemProps } from "@/types/modules"
import Image from 'next/image'
import styles from '@/styles/ProductListItem/index.module.scss'
import Link from "next/link"
import ProductItemActionBtn from "@/components/elements/ProductItemActionBtn/ProductItemActionBtn"
import { useMediaQuery } from "@/hooks/useMeidaQuery"
import { useCartAction } from "@/hooks/useCartAction"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { addItemToCart } from "@/lib/utils/cart"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"




const ProductListItem = ({ item, title }: IProductListItemProps) => {
  const isMedia800 = useMediaQuery(800)
  const { addToCartSpinner,
    isPoductInCart,
    setAddToCartSpinner }
    = useCartAction()

 const addToCart = () => {
    if (isPoductInCart) {
      return
    }
    setAddToCartSpinner(true)
    addItemToCart(item, setAddToCartSpinner, 1)
  }

  return (
    <li className={styles.list__item}>

      <span className={`${styles.list__item__label}
       ${styles.list__item__new}`}>
        Hits
      </span>


      <div className={styles.list__item__actions}>
        <ProductItemActionBtn
          text='Favorites'
          iconClass="actions__btn_favorite"
        />
        <ProductItemActionBtn
          text='Comparison'
          iconClass="actions__btn_comparison"
        />
       
         {!isMedia800 && (
             <ProductItemActionBtn
          text='Quick view'
          iconClass="actions__btn_quick_view"
        />
        )}
      </div>

      <Link href={`/catalog/${item.category}/${item._id}`}
        className={styles.list__item__img}>
        <Image src={item.images}
         alt={item.name} 
         width={224}
         height={275}
        />
      </Link>

      <div className={styles.list__item__inner}>
        <h3 className={styles.list__item__title}>
          <Link href={`/catalog/${item.category}/${item._id}`}>
            {item.name}
          </Link>
        </h3>

        <span className={styles.list__item__price}>
          {item.price} 
        </span>
      </div>

      <button className={`btn-reset ${styles.list__item__cart} 
      ${isPoductInCart ? styles.list__item__cart_added : ''}`}
      onClick={addToCart}
      disabled={addToCartSpinner}
      >
        {!isPoductInCart && addToCartSpinner && 'Added'}
        {!isPoductInCart && !addToCartSpinner && 'Add to cart'}     
      </button>


    </li>
  )
}

export default ProductListItem