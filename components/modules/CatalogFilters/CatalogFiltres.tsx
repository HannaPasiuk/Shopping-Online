
import CategorySelect from './CategorySelect'
import styles from '@/styles/catalog/index.module.scss'

const CatalogFilters = () => {
  
  return (
    <div className={styles.catalog__filters}>
    <div className={styles.catalog__filters__top}>
      <CategorySelect />
    </div>
    </div>
  )
}

export default CatalogFilters