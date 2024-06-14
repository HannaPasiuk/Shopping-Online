import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useAuthForm } from '@/hooks/useAuthForm'
import AuthPopupClose from './AuthPopupClose'
import { handleSignUp, signUpFx } from '@/context/auth'
import { IAuthSideProps, IInputs } from '@/types/authPopup'
import NameInput from './NameInput'
import EmailInput from './EmailInput'
import PasswordInput from './PusswordInput'
import AuthPopupSocials from './AuthPopupSocials'



const AuthPopupRegistration = ({
  toggleAuth,
  isSideActive,
}: IAuthSideProps) => {

  const { spinner, register, errors, handleSubmit, handleSignupWithOAuth } =
    useAuthForm(signUpFx.pending, isSideActive, handleSignUp)


  const submitForm = (data: IInputs) =>
    handleSignUp({
      name: data.name,
      email: data.email,
      password: data.password,
      isOAuth: false,
    })

  return (
    <div className='card-front'>
      <AuthPopupClose/>
      <div className='card-body wow-bg'>
        <h3 className='card-body__title'>
          Registration
        </h3>
        <p className='card-body__description'>
          Create an account
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <NameInput register={register} errors={errors} />
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <div className='card-body__inner'>
            <div className='inner__top'>
              <button className='inner__btn' type='submit' disabled={spinner}>
                {spinner ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  'Create'
                )}
              </button>
            </div>
            <div className='inner__bottom'>
              <span className='inner__bottom__text'>
                Already have an account?
              </span>
              <button
                type='button'
                className='btn-reset inner__switch'
                onClick={toggleAuth}
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
        <AuthPopupSocials handleSignupWithOAuth={handleSignupWithOAuth} />
      </div>
    </div>
  )
}

export default AuthPopupRegistration