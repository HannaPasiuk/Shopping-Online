'use client'

import Hero from "../../modules/MainPage/Hero/Hero";
import Categories from "../../modules/MainPage/Categories/Categories";
import { useGate } from "effector-react";
import { MainPageGate } from "@/app/context/goots";
import HitsProducts from "../../modules/MainPage/HitsProducts";


const MainPage = () => {
  useGate(MainPageGate)

  return (
    <main>
      <Hero/>
      <Categories/>
      <HitsProducts/>
    </main>
  )
}

export default MainPage