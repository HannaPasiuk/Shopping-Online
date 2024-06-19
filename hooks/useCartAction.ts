import { $currentProduct } from "@/context/goods";
import { useUnit } from "effector-react";
import { useMemo, useState } from "react";
import { isItemLInList, isUserAuth } from "@/lib/utils/common";
import { addCartItemToLs } from "@/lib/utils/cart";
import { useGoodsByAuth } from "./useGoodsByAuth";
import { $cart, $cartFromLs, updateCartItemCount } from "@/context/cart";

export const useCartAction = () => {
  const product = useUnit($currentProduct);
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs);
  const currentCartItems = currentCartByAuth.filter(
    (item) => item.productId === product._id
  );
  const isPoductInCart = isItemLInList(currentCartByAuth, product?._id);
  const [addToCartSpinner, setAddToCartSpinner] = useState(false);
  const [updateCountSpinner, setUpdateCountSpinner] = useState(false);
  const [count, setCount] = useState(0);

  const existingItem = currentCartByAuth.find(
    (item) => item.productId === product._id
  );

  const handleAddToCart = (countFromCounter?: number) => {
    if (existingItem) {
      if (!isUserAuth()) {
        addCartItemToLs(product, countFromCounter || 1);
        return;
      }
    }

    if (existingItem) {
      const auth = JSON.parse(localStorage.getItem("auth") as string);
      updateCartItemCount({
        jwt: auth.accessToken,
        id: existingItem._id as string,
        setSpinner: setUpdateCountSpinner,
        count: +existingItem.count + 1,
      });
    }

    addCartItemToLs(product, countFromCounter || 1);

    return;
  };

  const allCurrentCartItemCount = useMemo(
    () => currentCartItems.reduce((a, { count }) => a + +count, 0),
    [currentCartItems]
  );

  return {
    product,
    addToCartSpinner,
    currentCartItems,
    isPoductInCart,
    currentCartByAuth,
    setAddToCartSpinner,
    updateCountSpinner,
    handleAddToCart,
    existingItem,
    count,
    setCount,
    allCurrentCartItemCount,
  };
};
