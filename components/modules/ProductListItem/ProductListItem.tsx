import { IProductListItemProps } from "@/types/modules"
import Image from 'next/image'
import styles from '@/styles/ProductListItem/index.module.scss'
import Link from "next/link"
import ProductItemActionBtn from "@/components/elements/ProductItemActionBtn/ProductItemActionBtn"
import { useMediaQuery } from "@/hooks/useMeidaQuery"
import { useCartAction } from "@/hooks/useCartAction"
import { addItemToCart } from "@/lib/utils/cart"
import { isItemLInList } from "@/lib/utils/common"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { useFavoritesAction } from "@/hooks/useFavoritesAction"
import { setIsAddToFavorites } from "@/context/favorites"








const ProductListItem = ({ item }: IProductListItemProps) => {
  const isMedia800 = useMediaQuery(800)

  const {
    addToCartSpinner,
    setAddToCartSpinner,
    currentCartByAuth,
    product }
    = useCartAction()

  const isProductInCart = isItemLInList(currentCartByAuth, item._id)

  const { addToFavoritesSpinner,
    isProductInFavorites,
    handleAddProductToFavorites }
    = useFavoritesAction(item)


  const addToCart = () => {
    addItemToCart(item, setAddToCartSpinner, 1)
    setIsAddToFavorites(false)
  }

  return (
    <li className={styles.list__item}>

      {item.isHits ? (<span className={`${styles.list__item__label}
       ${styles.list__item__new}`}>
        Hits
      </span>) : ''}



      <div className={styles.list__item__actions}>
        <ProductItemActionBtn
          text='Favorites'
          iconClass={`${addToFavoritesSpinner
              ? 'actions__btn_spinner'
              : isProductInFavorites
                ? 'actions__btn_favorite_checked'
                : 'actions__btn_favorite'
            }`}
          spinner={addToFavoritesSpinner}
          callback={handleAddProductToFavorites}
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
          width={400}
          height={250}
        />
      </Link>

      <div className={styles.list__item__inner}>
        <h3 className={styles.list__item__title}>
          <Link href={`/catalog/${item.category}/${item._id}`}>
            {item.name}
          </Link>
        </h3>
        <span className={styles.list__item__description}>
          {item.description}
        </span>
        <span className={styles.list__item__price}>
          {item.price}{'$'}
        </span>
      </div>
      <button
        type="button"
        className={`btn-reset ${styles.list__item__cart} ${isProductInCart ? 'styles.list__item__cart_added' : ''
          }`}
        onClick={addToCart}
        disabled={addToCartSpinner || isProductInCart}>
        {addToCartSpinner ? <FontAwesomeIcon icon={faSpinner} spin /> :
          isProductInCart ? 'Add to cart' : 'Add to cart'}

      </button>

    </li>
  )
}

export default ProductListItem