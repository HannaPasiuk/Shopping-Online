'use client'

import styles from '@/styles/catalog/index.module.scss'

const CatalogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <section className={styles.catalog}>
        <div className='container'>{children}</div>
      </section>
    </main>
  )
}

export default CatalogLayout