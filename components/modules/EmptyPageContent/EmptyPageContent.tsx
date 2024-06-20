import { IEmptyPageContentProps } from '@/types/modules'
import ContentLinks from './ContentLinks'
import ContentTitle from './ContentTitle'
import { useMediaQuery } from '@/hooks/useMeidaQuery'
import styles from '@/styles/empty-content/index.module.scss'

const EmptyPageContent = ({
  subtitle,
  description,
  btnText,
  bgClassName,
  title,
  oopsWord,
  bgWordClassName,
  emptyWord,
}: IEmptyPageContentProps) => {
  const isMedia950 = useMediaQuery(950)
  const isMedia500 = useMediaQuery(500)
  const currentTitle = title ? title : "It seems here is still empty..."
  const currentOopsWord = oopsWord ? oopsWord : "Oh..."

  return (
    <div className={styles.empty_content}>
      {isMedia950 && (
        <ContentTitle title={currentTitle} oopsWord={currentOopsWord} />
      )}
      <div className={`${styles.empty_content__bg} ${bgClassName}`} />
      <div className={styles.empty_content__inner}>
        <span
          className={`${styles.empty_content__word} ${
            bgWordClassName ? bgWordClassName : ''
          }`}
        >
          {emptyWord ? emptyWord : "Empty"}
        </span>
        {!isMedia950 && (
          <ContentTitle title={currentTitle} oopsWord={currentOopsWord} />
        )}
        <div
          className={styles.empty_content__subtitle}
          dangerouslySetInnerHTML={{
            __html: subtitle,
          }}
        />
        <div className={styles.empty_content__description}>{description}</div>
        {!isMedia500 && <ContentLinks btnText={btnText} />}
      </div>
      {isMedia500 && <ContentLinks btnText={btnText} />}
    </div>
  )
}

export default EmptyPageContent