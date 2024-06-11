'use client'

import imgCategoriesAccessories from '@/public/img/categories-accwssories.jpeg'
import imgCategoriesClothes from '@/public/img/categories-cloth.jpg'
import imgCategoriesBags from '@/public/img/categories-bags.jpeg'
import imgCategoriesShoes from '@/public/img/categories-shoes.jpeg'
import styles from '../../../../../styles/main-page/index.module.scss'
import useImagePreloader from '@/app/hooks/useImagePreloader'
import Link from 'next/link'
import Image from 'next/image'



const Categories = () => {


  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader()
  const imgSpinnerClass = imgSpinner ? styles.img_liading : ''




  const images = [
    {
      src: imgCategoriesClothes,
      id: 1,
      title: 'Clothes'
    },
    {
      src: imgCategoriesAccessories,
      id: 2,
      title: 'Accessories'
    },
    {
      src: imgCategoriesBags,
      id: 3,
      title: 'Bags'
    },
    {
      src: imgCategoriesShoes,
      id: 4,
      title: 'Shoes'
    }
  ]

  return (
    <section className={`container ${styles.categories}`}>
      <div className={styles.categories__conteiner}>
        <h2 className={styles.categories__title}>Categories</h2>
        <div className={styles.categories__inner}>
         
            <>

              <Link
                href="/catalog/cloth"
                className={`${styles.categories__right} ${styles.categories__img} ${imgSpinnerClass}`}
              >
                <Image
                  className='transition-opacity opacity-0 duration'
                  src={imgCategoriesClothes}
                  alt="Cloth"
                  priority
                  onLoad={e => handleLoadingImageComplete(e.target as HTMLImageElement)}
                />
                <span>Cloth</span>
              </Link>


              
                  <Link href='/catalog/accessories'
                    className={`${styles.categories__right} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      className='transition-opacity opacity-0 duration'
                      src={imgCategoriesAccessories}
                      alt="Accessories"
                      priority
                      onLoad={e => handleLoadingImageComplete(e.target as HTMLImageElement)}
                    />
                    <span>Accessories</span>
                  </Link>

                  <Link href='/catalog/shoes'
                    className={`${styles.categories__right} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      className='transition-opacity opacity-0 duration'
                      src={imgCategoriesShoes}
                      alt="Shoes"
                      priority
                      onLoad={e => handleLoadingImageComplete(e.target as HTMLImageElement)}
                    />
                    <span>Shoes</span>
                  </Link>


                  <Link href='/catalog/bags'
                    className={`${styles.categories__right} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      className='transition-opacity opacity-0 duration'
                      src={imgCategoriesBags}
                      alt="Bags"
                      priority
                      onLoad={e => handleLoadingImageComplete(e.target as HTMLImageElement)}
                    />
                    <span>Bags</span>
                  </Link>
                
          
            </>
     
        </div>
      </div>
    </section>
  )
}

export default Categories