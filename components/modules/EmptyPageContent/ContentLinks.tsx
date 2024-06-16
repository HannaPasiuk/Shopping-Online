import Link from 'next/link'
import styles from '@/styles/empty-content/index.module.scss'

const ContentLinks = ({ btnText }: { btnText: string }) => {

  return (
    <div className={styles.empty_content__links}>
      <Link href='/catalog'>{btnText}</Link>
      <Link href='/'>Back to home</Link>
    </div>
  )
}

export default ContentLinks