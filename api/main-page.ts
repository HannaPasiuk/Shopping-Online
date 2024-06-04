import { createEffect } from "effector";
import api from './apiInstants';


export const getNewProducts = createEffect(
  async() => {
  const { data } = await api.get('/goods/hits')
  return data
})