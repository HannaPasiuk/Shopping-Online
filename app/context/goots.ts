"use client";
import { Effect, createDomain, sample } from "effector";
import { Gate, createGate } from "effector-react";
import { getHitsProductsFx } from "@/app/api/goods/hits/main-page";

const goods = createDomain();

export const MainPageGate = createGate();

const goodsStoreInstanse = (effect: Effect<void, [], Error>) =>
  goods
    .createStore([])
    .on(effect.done, (_, { result }) => result)
    .on(effect.fail, (_, { error }) => {
      console.log(error.message);
    });

const goodsSampleInstance = (
  effect: Effect<void, [], Error>,
  gate: Gate<unknown>
) => 
  sample({
    clock: gate.open,
    target: effect,
  })

export const $hitsProducts = goodsStoreInstanse(getHitsProductsFx);

goodsSampleInstance(getHitsProductsFx, MainPageGate)

