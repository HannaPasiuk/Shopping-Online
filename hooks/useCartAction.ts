import { $currentProduct } from "@/context/goods";
import { useUnit } from "effector-react";
import { useCartByAuth } from "./useCartByAuth";
import { useState } from "react";
import { isItemLInList, isUserAuth } from "@/lib/utils/common";
import { addCartItemToLs } from "@/lib/utils/cart";

export const useCartAction = () => {
  const product = useUnit($currentProduct);
  const currentCartByAuth = useCartByAuth();
  const currentCartItems  = currentCartByAuth.filter(
    (item) => item.productId === product._id);
  const isPoductInCart = isItemLInList(currentCartByAuth, product?._id);
  const [addToCartSpinner, setAddToCartSpinner] = useState(false);
  const [count, setCount] = useState(0);

  const handleAddToCart = (countFromCounter?: number) => {
    if (isPoductInCart) {
      if (!isUserAuth()) {
        addCartItemToLs(product, countFromCounter || 1);
        return;
      }
    }
  };
  return {
    product,
    addToCartSpinner,
    currentCartItems,
    isPoductInCart,
    currentCartByAuth,
    setAddToCartSpinner,
    handleAddToCart,
    count,
    setCount,
  };
};
