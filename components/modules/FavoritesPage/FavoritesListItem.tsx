import { $cart, $cartFromLs, addProductToCart } from "@/context/cart"
import { useGoodsByAuth } from "@/hooks/useGoodsByAuth"
import { useMediaQuery } from "@/hooks/useMeidaQuery"
import { useProductDelete } from "@/hooks/useProductDelete"
import { IFavoriteItem } from "@/types/favorites"
import Image from 'next/image'
import { useState } from "react"
import {
  deleteProductFromFavorites,
  setFavoritesFromLS,
  setShouldShowEmptyFavorites,
} from '@/context/favorites'
import {
  deleteProductFromLS,
  isUserAuth,
} from '@/lib/utils/common'
import { IProduct } from "@/types/common"
import { addCartItemToLs } from "@/lib/utils/cart"
import DeleteItemBtn from "@/components/elements/DeleteCartItemBtn/DeleteCartItemBtn"
import AddToCartIcon from "@/components/elements/AddToCartIcon/AddToCartIcon"
import styles from '@/styles/favorites/index.module.scss'


const FavoritesListItem = ({ item }: { item: IFavoriteItem }) => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)
  const isProductInCart = currentCartByAuth.find(
    (cartItem) =>
      cartItem.productId === item.productId 
  )
  const isMedia485 = useMediaQuery(485)
  const imgSize = isMedia485 ? 132 : 160
  const { handleDelete, deleteSpinner } = useProductDelete(
    item._id || item.clientId,
    deleteProductFromFavorites
  )

  const addToCart = () => {
    const cartItem = {
      ...item,
      _id: item.productId,
      images: item.images,
      color: item.color ,
    }

    if (!isUserAuth()) {
      addCartItemToLs(cartItem as unknown as IProduct,  1)
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)

    const clientId = addCartItemToLs(
      cartItem as unknown as IProduct,1)

    addProductToCart({
      jwt: auth.accessToken,
      setSpinner: setAddToCartSpinner,
      productId: item.productId,
      category: item.category,
      count: 1,
      clientId,
    })
  }

  const handleDeleteFavorite = () => {
    if (!isUserAuth()) {
      deleteProductFromLS(
        item.clientId,
        'favorites',
        setFavoritesFromLS,
        setShouldShowEmptyFavorites,
        'Removed from favorites!'
      )
      return
    }

    handleDelete()
    deleteProductFromLS(
      item.clientId,
      'favorites',
      setFavoritesFromLS,
      setShouldShowEmptyFavorites,
      '',
      false
    )
  }

  return (
    <>
      <DeleteItemBtn
        btnDisabled={deleteSpinner}
        callback={handleDeleteFavorite}
        className={styles.favorites__list__item__delete}
      />
      <AddToCartIcon
        isProductInCart={!!isProductInCart}
        addToCartSpinner={addToCartSpinner}
        callback={addToCart}
        className={styles.favorites__list__item__cart}
        addedClassName={styles.favorites__list__item__cart_added}
      />
  
      <div className={styles.favorites__list__item__img}>
        <Image src={item.images}
          alt={item.name}
          width={imgSize}
          height={imgSize}/>
      </div>
      <p className={styles.favorites__list__item__info}>
        <span className={styles.favorites__list__item__info__name}>
          {item.name}
          {item.description}
        </span>
        <span className={styles.favorites__list__item__info__price}>
          {item.price}{'$'} 
        </span>
      </p>
    </>
  )
}

export default FavoritesListItem