import { INameErrorMessageProps } from "@/app/types/authPopup"


const NameErrorMessage = ({
  errors,
  className,
  fieldName,
} : INameErrorMessageProps) => {

  return (
    <>
      {errors[fieldName] && (
        <span className={className}>{ errors[fieldName]?.message}</span>
      )}

      {errors[fieldName] && (
        errors[fieldName]?.type === 'minLength' && (
          <span className={className}>Min 2 characters!</span>
        )
      )}

       {errors[fieldName] && (
        errors[fieldName]?.type === 'maxLength' && (
          <span className={className}>Max 15 characters!</span>
        )
      )}
    </>
  )
}

export default NameErrorMessage