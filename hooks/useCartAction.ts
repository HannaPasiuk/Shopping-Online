import { $currentProduct } from "@/context/goods";
import { useUnit } from "effector-react";
import { useCartByAuth } from "./useCartByAuth";
import { useState } from "react";
import { isItemLInist, isUserAuth } from "@/lib/utils/common";
import { addCartItemToLs } from "@/lib/utils/cart";

export const useCartAction = () => {
  const product = useUnit($currentProduct);
  const currentCartByAuth = useCartByAuth();
  const currentCartItem = currentCartByAuth.find(
    (item) => item.productId === product?._id
  );

  const isPoductInCart = isItemLInist(currentCartByAuth, product?._id);
  const [addToCartSpinner, setAddToCartSpinner] = useState(false);

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
    currentCartItem,
    isPoductInCart,
    currentCartByAuth,
    setAddToCartSpinner,
  };
};
