import EmptyPageContent from "@/components/modules/EmptyPageContent/EmptyPageContent"
import { $cart, $cartFromLs, getCartItemsFx } from "@/context/cart"
import { useGoodsByAuth } from "@/hooks/useGoodsByAuth"
import { useUnit } from "effector-react"
import styles from '@/styles/empty-content/index.module.scss'


const CartPage = () => {
  const cartSpinner = useUnit(getCartItemsFx.pending)
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
return(
  <section>
  <div className='container'>
    <EmptyPageContent
      subtitle={"Your basket is empty"}
      description={"To make a purchase, go to the catalogs and add the selected items to your cart"}
      btnText={"Go to shopping"}
      bgClassName={styles.empty_bg}
    />
  </div>
</section>
)
}

