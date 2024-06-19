import { IProductInfoAccordionProps } from '@/types/product'
import Accordion from '@/components/modules/Accordion/Accordion'
import styles from '@/styles/product/index.module.scss'

const ProductInfoAccordion = ({
  children,
  title,
}: IProductInfoAccordionProps) => (
  <Accordion
    title={`${title}:`}
    titleClass={styles.product__top__description__btn}
    rotateIconClass={styles.expanded}
  >
    {children}
  </Accordion>
)

export default ProductInfoAccordion