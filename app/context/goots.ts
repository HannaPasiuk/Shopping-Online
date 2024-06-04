'use client'
import { getNewProducts } from "@/api/main-page";
import { Effect, createDomain } from "effector";
import {  createGate } from "effector-react";

const goods = createDomain();

export const MainPageGate = createGate();

const goodsStoreInstanse = (effect: Effect<void, [], Error>) =>
  goods
    .createStore([])
    .on(effect.done, (_, { result }) => result)
    .on(effect.fail, (_, { error }) => {
      console.log(error.message);
    });

   
 
  export const $hitsProducts = goodsStoreInstanse(getNewProducts);



