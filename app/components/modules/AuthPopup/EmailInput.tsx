
import { emailValidation } from '@/app/lib/utils/auth'
import { IAuthInput } from '@/app/types/authPopup'
import styles from '@/styles/auth-popup/index.module.scss'

const EmailInput = ({ register, errors }: IAuthInput) => {


  return (
    <div className='form__block'>
      <input
        type='email'
        className='form__block__input'
        placeholder='Email'
        {...register(
          'email',
          emailValidation(
            'Invalid value!',
            'Enter your email',
          )
        )}
      />
      {errors.email && (
        <span className={styles.error_alert}>{errors.email?.message}</span>
      )}
    </div>
  )
}

export default EmailInput