import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ICartItem } from '@/types/cart'
import { useCartItemAction } from '@/hooks/UseCartItemAction'
import { useMediaQuery } from '@/hooks/useMeidaQuery'
import styles from '@/styles/cart-page/index.module.scss'

const CartListItem = ({ item }: { item: ICartItem }) => {
  const {
    deleteSpinner,
    handleDeleteCartItem,
  } = useCartItemAction(item)
  const isMedia530 = useMediaQuery(530)
  const imageSize = isMedia530 ? 132 : 160

  return (
    <>
      <button
        disabled={deleteSpinner}
        className={`btn-reset ${styles.cart__list__item__delete}`}
        onClick={handleDeleteCartItem}
      >
        {deleteSpinner ? (
          <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
        ) : (
          <span />
        )}
      </button>
      <div
        className={`${styles.cart__list__item__img} ${styles.cart__list__item__block}`}
      >
        <Image
          src={item.image}
          alt={item.name}
          width={imageSize}
          height={imageSize}
        />
        <span>{item.description}</span>
      </div>
      <div className={styles.cart__list__item__wrapper}>
        <div
          className={`${styles.cart__list__item__name} ${styles.cart__list__item__block}`}
        >
          {item.name}
        </div>

      </div>
      <div className={styles.cart__list__item__inner}>
        <div
          className={`${styles.cart__list__item__initial} ${styles.cart__list__item__inner__block}`}
        >
          <span
            className={`${styles.cart__list__item__price} ${styles.cart__list__item__initial__price}`}
          >
            {item.price}{'$'}
          </span>


        </div>
      </div>
    </>
  )
}

export default CartListItem