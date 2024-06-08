import { motion } from 'framer-motion'
import  skeletonStyles from '../../../../styles/Loading/index.module.scss'

const Loading = () => {
  return (
    <motion.ul 
    className={skeletonStyles.skeleton}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >
      {Array.from(new Array(4)).map((_, i) => (
        <li
          key={i}
          className={skeletonStyles.skeleton__item}
        >
          <div className={skeletonStyles.skeleton__item__light}></div>
        </li>
      ))}
    </motion.ul>
  )
}

export default Loading