import { StoreWritable } from "effector";

export interface IProduct {
  _id: string;
  name: string;
  type: string;
  category: string;
  count: number;
  price: string;
  images: string;
  color: string;
  description: string;
  isHits: string;
  errorMessage?: string;
}

export interface IBaseEffectProps {
  jwt: string
  id: string | number
  setSpinner: (arg0: boolean) => void
}
export type UseGoodsByAuth<T> = StoreWritable<T>