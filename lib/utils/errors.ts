/* eslint-disable indent */
import { JWTError } from "@/constants/jwt";
import { refreshTokenFx, loginCheckFx } from "@/context/user";
import { addProductToCartFx, addProductsFromLSToCartFx, getCartItemsFx } from "@/context/cart";
import { IAddProductToCartFx, IAddProductsFromLSToCartFx } from "@/types/cart";
import { addProductToFavoriteFx, addProductsFromLSToFavoritesFx, getFavoriteItemsFx } from "@/context/favorites";
import { IAddProductsFromLSToFavoriteFx } from "@/types/favorites";


export const handleJWTError = async (
  errorName: string,
  repeatRequestAfterRefreshData?: {
    repeatRequestMethodName: string;
    payload?: unknown;
  }
) => {
  if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
    const auth = JSON.parse(localStorage.getItem("auth") as string);
    const newTokens = await refreshTokenFx({ jwt: auth.refreshToken });

    if (repeatRequestAfterRefreshData) {
      const { repeatRequestMethodName, payload } =
        repeatRequestAfterRefreshData;

      switch (repeatRequestMethodName) {
        case "getCartItemsFx":
          return getCartItemsFx({
            jwt: newTokens.accessToken,
          });
        case "addProductToCartFx":
          return addProductToCartFx({
            ...(payload as IAddProductToCartFx),
            jwt: newTokens.accessToken,
          });
          case"addProductsFromLSToCartFx":
            return addProductsFromLSToCartFx({
              ...(payload as IAddProductsFromLSToCartFx),
              jwt: newTokens.accessToken,
            })
            case 'addProductToFavoriteFx':
              return addProductToFavoriteFx({
                ...(payload as Omit<IAddProductToCartFx, 'count'>),
                jwt: newTokens.accessToken,
              })
              case 'addProductsFromLSToFavoritesFx':
                return addProductsFromLSToFavoritesFx({
                  ...(payload as IAddProductsFromLSToFavoriteFx),
                  jwt: newTokens.accessToken,
                })
            case 'getFavoriteItemsFx':
              return getFavoriteItemsFx({
                jwt: newTokens.accessToken,
              })
        case "loginCheckFx":
          await loginCheckFx({
            jwt: newTokens.accessToken,
          });
          break;
      }
    }
  }
};
