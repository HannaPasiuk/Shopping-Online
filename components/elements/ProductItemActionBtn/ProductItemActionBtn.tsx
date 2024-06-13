import { AnimatePresence, motion } from "framer-motion"
import Tooltip from "../Tooltip/Tooltip"
import styles from '@/styles/product-item-action-btn/index.module.scss'
import tooltipStyles from '@/styles/tooltip/index.module.scss'
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { IProductItemActionBtnProps } from "@/types/elements"

const ProductItemActionBtn = ({
  text,
  callback,
  iconClass,
  marginBottom,
  withTooltip = true,
}: IProductItemActionBtnProps) => {

  const [open, setOpen] = useState(false)
  const [tooltipLeft, setTooltipLeft] = useState(0)
  const tooltipRef = useRef() as MutableRefObject<HTMLDivElement>


  useEffect(() => {
    if (open && withTooltip) {
      setTooltipLeft(tooltipRef.current.clientWidth)
    }

  }, [open, withTooltip])

  const showTooltip = () => {
    setOpen(true)
  }
  const hideTooltip = () => {
    setOpen(false)
  }
  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={`btn-reset ${styles.actions__btn} ${styles[iconClass]}`}
        onClick={callback}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ marginBottom: marginBottom || 16 }}
      />

      {withTooltip && (
        <AnimatePresence>
          {open && (
           <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className={tooltipStyles.tooltip}
           style={{ left: `-${tooltipLeft + 13}px` }}
           ref={tooltipRef}
         >
           <Tooltip text={text} />
         </motion.div>
          )}
        </AnimatePresence>
      )
      }

    </div>
  )
}

export default ProductItemActionBtn