import { createEffect } from "effector";
import api from './apiInstants';


export const getHitsProductsFx = createEffect(
  async() => {
  const { data } = await api.get('/api/goods/hits')
  return data
})