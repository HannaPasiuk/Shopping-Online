import { IProduct } from "@/types/common";
import { goods, loadOneProductFx, setCurrentProduct } from ".";




export const $currentProduct = goods
  .createStore<IProduct>({} as IProduct)
  .on(setCurrentProduct, (_, product) => product)
  .on(loadOneProductFx.done, (_, { result }) => result.productItem)