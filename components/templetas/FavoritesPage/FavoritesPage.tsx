'use client'
import EmptyPageContent from "@/components/modules/EmptyPageContent/EmptyPageContent"
import { $favorites, $favoritesFromLS, $shouldShowEmptyFavorites, getFavoriteItemsFx } from "@/context/favorites"
import { useGoodsByAuth } from "@/hooks/useGoodsByAuth"
import { useUnit } from "effector-react"
import { loginCheckFx } from "@/context/user"
import { isUserAuth } from "@/lib/utils/common"
import { motion } from "framer-motion"
import HeadingWithCount from "@/components/elements/HeadingWithCount/HeadingWithCount"
import { basePropsForMotion } from "@/constants/motion"
import FavoritesList from "@/components/modules/FavoritesPage/FavoritesList"
import styles from '@/styles/favorites/index.module.scss'
import cartSkeletonStyles from '@/styles/cart-skeleton/index.module.scss'


const FavoritesPage = () => {
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const shouldShowEmptyFavorites = useUnit($shouldShowEmptyFavorites)
  const favoritesSpinner = useUnit(getFavoriteItemsFx.pending)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)

  return (
    <main>

      {!shouldShowEmptyFavorites ? (
        <section className={styles.favorites}>
          <div className={`container ${styles.favorites__container}`}>
            <HeadingWithCount
              count={currentFavoritesByAuth.length}
              title='Favorites'
              spinner={favoritesSpinner}
            />
            {(isUserAuth()
              ? favoritesSpinner || loginCheckSpinner
              : favoritesSpinner) && (
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
            {!favoritesSpinner && (
              <motion.ul
                {...basePropsForMotion}
                className={`list-reset ${styles.favorites__list}`}
              >
                <FavoritesList />
              </motion.ul>
            )}
          </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              subtitle="There is nothing in favorites"
              description="We are sure that in our catalog you will find something you like!"
              btnText="Go to catalog"
              bgClassName={styles.empty_bg}
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default FavoritesPage