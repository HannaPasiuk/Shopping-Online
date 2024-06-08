'use client'
import Link from 'next/link'
import styles from '../../../../styles/main-page/index.module.scss'

const AllLink = ({ link }: { link?: string }) => {


  return (
    <Link href={link || `/catalog`} className={styles.all}>
     <span/>
     All
    </Link>
  )
}

export default AllLink