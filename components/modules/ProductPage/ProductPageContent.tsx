import styles from '@/styles/product/index.module.scss'
import { useUnit } from 'effector-react'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import ProductColor from '@/components/modules/ProductListItem/ ProductColor'
import ProductCounter from '@/components/modules/ProductListItem/ProductCounter'
import { ICartItem } from '@/types/cart'
import ProductInfoAccordion from './ProductInfoAccordion'
import { $currentProduct } from '@/context/goods'
import { useFavoritesAction } from '@/hooks/useFavoritesAction'
import { useCartAction } from '@/hooks/useCartAction'
import AddToCartBtn from '@/components/modules/ProductListItem/AddToCartBtn'
import { setIsAddToFavorites } from '@/context/favorites'





const ProductPageContent = () => {
  const product = useUnit($currentProduct)
  const {
    handleAddProductToFavorites,
    addToFavoritesSpinner,
    isProductInFavorites,
  } = useFavoritesAction(product)

  const {
    handleAddToCart,
    addToCartSpinner,
    updateCountSpinner,
    allCurrentCartItemCount,
    setCount,
    existingItem,
    count,
  } = useCartAction()
  const addToCart = () => {
    setIsAddToFavorites(false)
    handleAddToCart(count)
  }

  return (
    <>
      <div className={styles.product__top}>
        {product.images}
        <div className={styles.product__top__right}>
          <div className={styles.product__top__label}>
            <span className={styles.product__top__label__new}>
              Hits
            </span>
          </div>

          <h1 className={styles.product__top__title}>{product.name}</h1>
          <div className={styles.product__top__price}>
            <h3 className={styles.product__top__price__title}>
              {product.price} $
            </h3>
            <div className={styles.product__top__price__inner}>
              <div className={styles.product__top__price__favorite}>
                <ProductItemActionBtn
                  spinner={addToFavoritesSpinner}
                  text='add to favorites'
                  iconClass={`${addToFavoritesSpinner
                      ? 'actions__btn_spinner'
                      : isProductInFavorites
                        ? 'actions__btn_favorite_checked'
                        : 'actions__btn_favorite'
                    }`}
                  withTooltip={false}
                  callback={handleAddProductToFavorites}
                />
              </div>
            </div>
          </div>

          <ProductColor
            color={product.color}
            className={styles.product__top__color}
          />


          <div className={styles.product__top__bottom}>
            <span className={styles.product__top__count}>
              {product.count}
            </span>
            <div className={styles.product__top__inner}>

              <ProductCounter
                className={`counter ${styles.product__top__counter}`}
                count={count}
                initialCount={+(existingItem?.count || 1)}
                setCount={setCount}
                cartItem={existingItem as ICartItem}
                updateCountAsync={false}
              />

              <div
                className={`counter ${styles.product__top__counter}`}
                style={{ justifyContent: 'center' }}
              >
                <span>
                  {"Total in cart"}{' '}
                  {allCurrentCartItemCount}
                </span>
              </div>

              <AddToCartBtn
                className={styles.product__top__add}
                text='Add to cart'
                handleAddToCart={addToCart}
                addToCartSpinner={addToCartSpinner || updateCountSpinner}
                btnDisabled={
                  addToCartSpinner ||
                  updateCountSpinner ||
                  allCurrentCartItemCount === +product
                }
              />
            </div>
          </div>
          <div className={styles.product__top__description}>
            <ProductInfoAccordion
              title={product.description}
            >
              <p className={styles.product__top__description__text}>
                {product.description}
              </p>
            </ProductInfoAccordion>
            <ProductInfoAccordion
              title={product.name}
            >
              <ul
                className={`list-reset ${styles.product__top__description__characteristics}`}
              >
                {Object.entries(product.description).map(([key, value]) => (
                  <li
                    key={key}
                    className={styles.product__top__description__text}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </ProductInfoAccordion>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPageContent