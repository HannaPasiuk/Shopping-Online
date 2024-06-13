'use client'

import Hero from "../../modules/MainPage/Hero/Hero";
import Categories from "../../modules/MainPage/Categories/Categories";
import HitsProducts from "@/components/modules/MainPage/Hits/HitsProducts";
import { useGate } from "effector-react";
import { MainPageGate } from "@/api/hits";



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