import { AnimatePresence } from 'framer-motion'
import { useCategoryFilter } from '@/hooks/useCategoryFilter'
import { useClickOutside } from '@/hooks/useClickOutside'
import CategoryFilterList from './CategoryFilterList'
import SelectBtn from './SelectBtn'
import styles from '@/styles/catalog/index.module.scss'

const CategorySelect = () => {
  const { open, ref, toggle } = useClickOutside()
  const {
    handleSelectAllCategories,
    currentOptions,
    option,
    setOption,
    allCategoriesTitle,
    catalogCategoryOptions,
  } = useCategoryFilter()

  return (
    <div className={styles.catalog__filters__select} ref={ref}>
      <SelectBtn
        open={open}
        toggle={toggle}
        bgClassName={styles.bg_category}
        defaultText='Categories'
        dynamicText={option}
      />
      <AnimatePresence>
        {open && (
          <CategoryFilterList
            handleSelectAllCategories={handleSelectAllCategories}
            currentOptions={currentOptions}
            option={option}
            setOption={setOption}
            allCategoriesTitle={allCategoriesTitle}
            catalogCategoryOptions={catalogCategoryOptions}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default CategorySelect