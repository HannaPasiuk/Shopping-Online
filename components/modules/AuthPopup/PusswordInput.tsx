
import { IAuthInput } from '@/types/authPopup'
import styles from '@/styles/auth-popup/index.module.scss'

const PasswordInput = ({ register, errors }: IAuthInput) => {


  return (
    <div className='form__block'>
      <input
        type='password'
        className='form__block__input'
        placeholder='Password'
        {...register('password', {
          required: 'Enter your password',
          minLength: 4,
          maxLength: 40,
        })}
      />
      {errors.password && (
        <span className={styles.error_alert}>{errors.password?.message}</span>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <span className={styles.error_alert}>
          Min 4 characters!
        </span>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <span className={styles.error_alert}>
          Max 20 characters!
        </span>
      )}
    </div>
  )
}
export default PasswordInput