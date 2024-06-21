'use client'

import styles from '@/styles/catalog/index.module.scss'
import { useEffect } from 'react'


const CatalogLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    document.body.classList.add('catalog')
  })     
  return (
    <main>
      <section className={styles.catalog}>
        <div className='container'>{children}</div>
      </section>
    </main>
  )
}

export default CatalogLayout

