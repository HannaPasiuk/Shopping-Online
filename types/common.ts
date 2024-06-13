export interface IProduct {
  _id: number;
  name: string;
  type: string;
  category: string;
  price: string;
  images: string;
  description: string;
  isHits: string;
  errorMessage?: string;
}

export interface IBaseEffectProps {
  jwt: string
  id: string | number
  setSpinner: (arg0: boolean) => void
}
