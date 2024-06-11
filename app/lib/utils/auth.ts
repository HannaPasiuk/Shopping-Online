import { toast } from 'react-hot-toast'
import { setIsAuth } from "@/app/context/auth"
import { handleCloseAuthPopup } from "./api-routes"




export const onAuthSuccess = <T>(message: string, data: T) => {
  localStorage.setItem('auth', JSON.stringify(data))
  toast.success(message)
  handleCloseAuthPopup()
  setIsAuth(true)
}

export const nameValidation = (
  message: string,
 requireMessage?: string) => ({
  ...(requireMessage && { required: requireMessage }),
  pattern: {
    value: /^[а-яА-Яa-zA-ZёЁ]*$/,
    message,
  },
  minLength: 2,
  maxLength: 15,
})

export const emailValidation = (
  message: string,
  requireMessage?: string) => ({
  ...(requireMessage && { required: requireMessage }),
  pattern: {
    value: /\S+@\S+\.\S+/,
    message,
  },
})