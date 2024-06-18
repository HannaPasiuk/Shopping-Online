import { IBaseEffectProps } from './common'

export interface IFavoriteItem {
  description: string
  _id: string
  clientId: string
  userId: string
  productId: string
  images: string
  name: string
  price: string
  category: string
  color: string
}

export interface IAddProductsFromLSToFavoriteFx {
  jwt: string
  favoriteItems: IFavoriteItem[]
}

export type IDeleteFavoriteItemsFx = IBaseEffectProps