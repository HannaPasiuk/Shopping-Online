import { useMediaQuery } from "@/hooks/useMeidaQuery"
import { IEmptyPageContentProps } from "@/types/modules"
import styles from '@/styles/empty-content/index.module.scss'
import ContentTitle from "./ContentTitle"
import { title } from "process"
import ContentLinks from "./ContentLinks"


const EmptyPageContent = ({
subtitle,
description,
btnText,
bgClassName,
}: IEmptyPageContentProps) => {

  const isMedia950 = useMediaQuery(950)
  const isMedia500 = useMediaQuery(500)




return (
 <div className={styles.empty_content}>
 {isMedia950 && <ContentTitle />}
 <div className={`${styles.empty_content__bg} ${bgClassName}`} />
 <div className={styles.empty_content__inner}>
 <span className={styles.empty_content__word}>
  Empty
 </span>
 {isMedia950 && <ContentTitle />}
 <div className={styles.empty_content__subtitle}>{subtitle}</div>
 <div className={styles.empty_content__description}>{description}</div>
 {!isMedia500 && <ContentLinks btnText={btnText} />}
 </div>
 {isMedia500 && <ContentLinks btnText={btnText} />}
 </div>
)
}

export default EmptyPageContent