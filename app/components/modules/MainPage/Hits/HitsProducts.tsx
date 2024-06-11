import { motion } from "framer-motion"
import { useUnit } from "effector-react"
import { $hitsProducts } from "@/app/context/goots"
import { getHitsProductsFx } from "@/api/main-page"
import { IProduct } from "@/app/types/common"
import AllLink from "@/app/components/elements/AllLink/AllLink"
import Loading from "@/app/components/elements/Loading/Loading"
import ProductListItem from "@/app/components/modules/ProductListItem/ProductListItem"
import { title } from "process"
import styles from '@/styles/main-page/index.module.scss'




const HitsProducts = () => {

  const goods = useUnit($hitsProducts)
  const spinner = useUnit(getHitsProductsFx.pending)

  return (
    <section className={`container ${styles.main_section}`}>
      <div className={styles.main_section__container}>
        <h2 className={`site-title ${styles.main_section__title}`}>Hits</h2>
        <span className={styles.main_section__bg}>Hits</span>

        <div className={styles.main_section__inner}><AllLink /></div>
        {spinner && <Loading />}
        {!spinner &&
          <motion.ul
            className={`list-reset ${styles.main_section__list}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {goods.map((item: IProduct) => (

              <ProductListItem
                key={item._id}
                item={item}
                title={title}
              />

            ))}
          </motion.ul>
        }
      </div>
    </section>
  )
}

export default HitsProducts