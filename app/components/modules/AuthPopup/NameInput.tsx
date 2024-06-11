import { nameValidation } from "@/app/lib/utils/auth"
import { IAuthInput } from "@/app/types/authPopup"
import NameErrorMessage from "../../elements/NameErrorMessage/NameErrorMessage"
import styles from '@/styles/auth-popup/index.module.scss'

const NameInput = ({
  register,
  errors,} : IAuthInput) => {
    
    return(
      <div className="form__block">
        <input type="text"
        className="form__block__input"
        placeholder="Name"
        {...register(
          'name',
          nameValidation(
           'Invalid value!',
           'Enter your name',
          )
        )}
         />

         <NameErrorMessage
          errors={errors}
          fieldName="name"
          className={styles.error_alert}
         />
      </div>
    )
  }

  export default NameInput