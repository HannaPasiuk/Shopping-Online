import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { getSearchParamsUrl } from '@/lib/utils/common'
import { $catalogCategoryOptions } from '@/context/catalog'

export const useCategoryFilter = () => {
  const catalogCategoryOptions = useUnit($catalogCategoryOptions)
  const [option, setOption] = useState('')
  const currentOptions = Object.values(catalogCategoryOptions)[0]
  const allCategoriesTitle = 'All categories'
  const handleSelectAllCategories = () => setOption('All categories')

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const typeParam = urlParams.get('type')

    if (typeParam) {
      setOption(
       [typeParam]
          .filter((item) => item)
          .map((item) => item.toUpperCase())
          .join(' ')
      )
    }
  }, [])

  return {
    handleSelectAllCategories,
    currentOptions,
    option,
    setOption,
    catalogCategoryOptions,
    allCategoriesTitle,
  }
}