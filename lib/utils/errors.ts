/* eslint-disable indent */
import { JWTError } from "@/constants/jwt";
import { refreshTokenFx, loginCheckFx } from "@/context/user";
import { addProductToCartFx, getCartItemsFx } from "@/context/cart";
import { IAddProductToCartFx } from "@/types/cart";


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
        case "loginCheckFx":
          await loginCheckFx({
            jwt: newTokens.accessToken,
          });
          break;
      }
    }
  }
};
