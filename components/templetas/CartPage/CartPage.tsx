/* eslint-disable react/jsx-indent */
'use client'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import CartList from '@/components/modules/CartPage/CartList'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import { basePropsForMotion } from '@/constants/motion'
import { useMediaQuery } from '@/hooks/useMeidaQuery'
import { countWholeCartItemsAmount } from '@/lib/utils/cart'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { isUserAuth } from '@/lib/utils/common'
import { loginCheckFx } from '@/context/user'
import { $cart, $cartFromLs, $shouldShowEmpty } from '@/context/cart'
import { getCartItemsFx } from '@/context/cart'
import cartSkeletonStyles from '@/styles/cart-skeleton/index.module.scss'
import styles from '@/styles/cart-page/index.module.scss'
import OrderInfoBlock from '@/components/modules/OrderInfoBlock/OrderInfoBlock'

const CartPage = () => {
  const cartSpinner = useUnit(getCartItemsFx.pending)
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const isMedia930 = useMediaQuery(930)
  const shouldShowEmpty = useUnit($shouldShowEmpty)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)

  return (
    <main>
      {!shouldShowEmpty ? (
        <section className={styles.cart}>
          <div className='container'>
            <HeadingWithCount
              count={countWholeCartItemsAmount(currentCartByAuth)}
              title="Cart"
              spinner={cartSpinner}
            />
            <div className={styles.cart__inner}>
              <div className={styles.cart__left}>
                {(isUserAuth()
                  ? cartSpinner || loginCheckSpinner
                  : cartSpinner) && (
                  <motion.ul
                    {...basePropsForMotion}
                    className={cartSkeletonStyles.skeleton}
                  >
                    {Array.from(new Array(3)).map((_, i) => (
                      <li key={i} className={cartSkeletonStyles.skeleton__item}>
                        <div
                          className={cartSkeletonStyles.skeleton__item__light}
                        />
                      </li>
                    ))}
                  </motion.ul>
                )}
                {!cartSpinner && (
                  <motion.ul
                    {...basePropsForMotion}
                    className={`list-reset ${styles.cart__list}`}
                  >
                    <CartList />
                  </motion.ul>
                )}
              </div>
              
              <div className={styles.cart__right__order}>
                <OrderInfoBlock/>
                </div>
              </div>
            </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              subtitle="Your basket is empty"
              description="To make a purchase, go to the catalogs and add the selected items to your cart"
              btnText="Go to shopping"
              bgClassName={styles.empty_bg}
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default CartPage