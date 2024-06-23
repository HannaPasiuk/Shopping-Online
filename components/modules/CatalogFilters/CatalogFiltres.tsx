import { motion } from 'framer-motion'
import { useUnit } from 'effector-react'
import CategorySelect from './CategorySelect'
import { ICatalogFiltersProps } from '@/types/catalog'
import ColorsSelect from './CategorySelect'
import { useMediaQuery } from '@/hooks/useMeidaQuery'
import {
  setColors,
  setColorsOptions,
  setFiltersPopup,
} from '@/context/catalog'
import { basePropsForMotion } from '@/constants/motion'
import SelectInfoItem from './SelectInfoItem'
import FiltersPopup from './FiltersPopup/FiltersPopup'
import { addOverFlowHiddenToBody } from '@/lib/utils/common'
import { $colorsOptions } from '@/context/catalog'
import styles from '@/styles/catalog/index.module.scss'

const CatalogFilters = ({
  handleApplyFiltersWithColors,
}: ICatalogFiltersProps) => {
  const colorsOptions = useUnit($colorsOptions)
  const isMedia610 = useMediaQuery(610)

  
  const handleRemoveColorOption = (id: number) => {
    const updatedOptions = colorsOptions.map((item) =>
      item.id === id ? { ...item, checked: false } : item
    )

    setColorsOptions(updatedOptions)

    const updatedColorsByText = updatedOptions
      .filter((item) => item.checked)
      .map(({ colorText }) => colorText)

    const updatedColorsByCode = updatedOptions
      .filter((item) => item.checked)
      .map(({ colorCode }) => colorCode)

    setColors(updatedColorsByText)
    handleApplyFiltersWithColors(updatedColorsByCode)
  }

  const handleOpenPopup = () => {
    addOverFlowHiddenToBody()
    setFiltersPopup(true)
  }

  return (
    <>
      <FiltersPopup
        handleApplyFiltersWithColors={handleApplyFiltersWithColors}
      />
      <div className={styles.catalog__filters}>
        <div className={styles.catalog__filters__top}>
          {!isMedia610 && (
            <>
              <div className={styles.catalog__filters__top__left}>
                <CategorySelect />
              </div>
              <div className={styles.catalog__filters__top__right}>
                <ColorsSelect
                  handleApplyFiltersWithColors={handleApplyFiltersWithColors}
                />
              </div>
            </>
          )}
          {isMedia610 && (
            <>
              <button
                className={`btn-reset ${styles.catalog__filters__top__filter_btn}`}
                onClick={handleOpenPopup}
              />
            </>
          )}
        </div>
        <div className={styles.catalog__filters__bottom}>
          <motion.ul
            className={`list-reset ${styles.catalog__filters__bottom__list}`}
            {...basePropsForMotion}
          >
            {colorsOptions
              .filter((item) => item.checked)
              .map((item) => (
                <SelectInfoItem
                  key={item.id}
                  id={item.id}
                  text={item.colorText}
                  handleRemoveItem={handleRemoveColorOption}
                />
              ))}
          </motion.ul>
        </div>
      </div>
    </>
  )
}

export default CatalogFilters