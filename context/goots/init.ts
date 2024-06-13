import { sample } from "effector";
import { loadOneProduct, loadOneProductFx } from ".";
import { $currentProduct } from "./state";

sample({
  clock: loadOneProduct,
  source: $currentProduct,
  fn: (_, data) => data,
  target: loadOneProductFx,
})
