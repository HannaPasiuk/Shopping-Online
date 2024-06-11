'use client'

import Hero from "../../modules/MainPage/Hero/Hero";
import Categories from "../../modules/MainPage/Categories/Categories";
import { useGate } from "effector-react";
import { MainPageGate } from "../../../context/goots";
import HitsProducts from "../../../components/modules/MainPage/HitsProducts";


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