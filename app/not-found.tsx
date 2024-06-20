'use client'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import styles from '@/styles/not-found/index.module.scss'

const NotFound = () => {


  return (
    <main>
      <section className={styles.not_found}>
        <div className='container'>
          <EmptyPageContent
            subtitle={"Page not found"}
            description={"The page will be found soon!"}
            btnText={"Go to shopping"}
            bgClassName={styles.empty_bg}
            emptyWord={"Zone 404"}
            bgWordClassName={styles.not_found_bg}
            oopsWord={"Oops..."}
            title={ "Looks like someone stole the page!"}
          />
        </div>
      </section>
    </main>
  )
}

export default NotFound