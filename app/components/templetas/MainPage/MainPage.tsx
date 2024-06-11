'use client'

import Hero from "../../modules/MainPage/Hero/Hero";
import Categories from "../../modules/MainPage/Categories/Categories";
import HitsProducts from "@/app/components/modules/MainPage/Hits/HitsProducts";
import { useGate } from "effector-react";
import { MainPageGate } from "../../../context/goots";



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