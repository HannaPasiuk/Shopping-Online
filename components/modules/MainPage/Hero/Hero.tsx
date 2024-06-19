import styles from '@/styles/main-page/index.module.scss'

const Hero = () => {




  return (
    <div className={styles.hero}>
      <h1 className={styles.hero__title__text}>
       Welcome
      to the Shopping Online.
      </h1>
      <div className={styles.hero__png}></div>
    </div>
  )
}


export default Hero