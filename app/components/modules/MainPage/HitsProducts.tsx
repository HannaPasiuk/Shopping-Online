
import { $hitsProducts } from "@/app/context/goots"
import { useUnit } from "effector-react"



const HitsProducts = () => {
  const good = useUnit($hitsProducts)

  console.log(good);
  return <div></div>
}

export default HitsProducts