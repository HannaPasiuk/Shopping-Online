'use client'
import { createDomain } from 'effector'
import {
  ICatalogCategoryOptions,
  IColorOption,
} from '@/types/catalog'

export const catalog = createDomain()

export const setCatalogCategoryOptions =
  catalog.createEvent<Partial<ICatalogCategoryOptions>>()
export const setColorsOptions = catalog.createEvent<IColorOption[]>()
export const updateColorsOptionByCode = catalog.createEvent<string>()
export const setColors = catalog.createEvent<string[]>()
export const setFiltersPopup = catalog.createEvent<boolean>()




export const $catalogCategoryOptions = 
catalog.createStore<ICatalogCategoryOptions>({})
  .on(setCatalogCategoryOptions, (_, options) => ({ ...options }))



export const $colorsOptions = catalog
  .createStore<IColorOption[]>([
    { id: 1, colorCode: 'blue', checked: false, colorText: '' },
    { id: 2, colorCode: 'green', checked: false, colorText: '' },
    { id: 3, colorCode: 'pink', checked: false, colorText: '' },
    { id: 4, colorCode: 'black', checked: false, colorText: '' },
    { id: 5, colorCode: 'white', checked: false, colorText: '' },
  ])
  .on(setColorsOptions, (_, options) => options)
  .on(updateColorsOptionByCode, (state, color) =>
    state.map((item) =>
      item.colorCode === color ? { ...item, checked: true } : item
    )
  )



export const $colors = catalog
  .createStore<string[]>([])
  .on(setColors, (_, colors) => colors)

export const $filtersPopup = catalog
  .createStore(false)
  .on(setFiltersPopup, (_, value) => value)