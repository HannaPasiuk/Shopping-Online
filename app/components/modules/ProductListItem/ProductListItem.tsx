import { IProductListItemProps } from "../../../types/modules"
import Image from 'next/image'
import styles from '../../../../styles/ProductListItem/index.module.scss'
import Link from "next/link"
import ProductItemActionBtn from "../../elements/ProductItemActionBtn/ProductItemActionBtn"
import { useMediaQuery } from "@/app/hooks/useMeidaQuery"


const ProductListItem = ({ item, title }: IProductListItemProps) => {
  const isMedia800 = useMediaQuery(800)
  return (
    <li className={styles.list__item}>

      <span className={`${styles.list__item__label}
       ${styles.list__item__new}`}>
        Hits
      </span>


      <div className={styles.list__item__actions}>
        <ProductItemActionBtn
          text='Favorites'
          iconClass="actions__btn_favorite"
        />
        <ProductItemActionBtn
          text='Comparison'
          iconClass="actions__btn_comparison"
        />
       
         {!isMedia800 && (
             <ProductItemActionBtn
          text='Quick view'
          iconClass="actions__btn_quick_view"
        />
        )}
      </div>

      <Link href={`/catalog/${item.category}/${item._id}`}
        className={styles.list__item__img}>
        <Image src={item.images}
         alt={item.name} 
         width={224}
         height={275}
        />
      </Link>

      <div className={styles.list__item__inner}>
        <h3 className={styles.list__item__title}>
          <Link href={`/catalog/${item.category}/${item._id}`}>
            {item.name}
          </Link>
        </h3>

        <span className={styles.list__item__price}>
          {item.price} 
        </span>
      </div>

      <button type="button" className={`btn-reset ${styles.list__item__cart}`}>
        Add to cart
      </button>


    </li>
  )
}

export default ProductListItem