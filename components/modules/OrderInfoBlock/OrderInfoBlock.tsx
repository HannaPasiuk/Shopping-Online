import { countWholeCartItemsAmount } from '@/lib/utils/cart'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $cart, $cartFromLs } from '@/context/cart'
import styles from '@/styles/order-block/index.module.scss'

const OrderInfoBlock = () => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const auth = JSON.parse(localStorage.getItem('auth') as string)

  const total = currentCartByAuth
      .map((item) => +item.price * +item.count)
      .reduce((total, price) => total + price, 0)

  return (
    <div className={styles.order_block}>
      <div className={styles.order_block__inner}>
        <p className={styles.order_block__info}>
          {countWholeCartItemsAmount(currentCartByAuth)}{' items'}
        </p>
        
        <p className={styles.order_block__total}>
          <span>{"Total"}:</span>
          <span className={styles.order_block__total__price}>
            {total}{'$'}
          </span>
        </p>

        <button
          className={`btn-reset ${styles.order_block__btn}`}
          disabled={true}
        >
          Make order
        </button>
      </div>
    </div>
  )
}

export default OrderInfoBlock