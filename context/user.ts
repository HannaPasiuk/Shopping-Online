
import api from "@/api/apiInstants";
import { setIsAuth, signInFx, signUpFx } from "@/context/auth";
import { handleJWTError } from "@/lib/utils/errors";
import { IUser } from "@/types/user";
import { createDomain, createEffect, sample } from "effector";
import toast from "react-hot-toast";


const user = createDomain()
export const loginCheck = user.createEvent<{ jwt: string }>()



export const loginCheckFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try{
    const { data } = await api.get('/api/users/login-check', {
      headers: { Authorization: `Bearer ${jwt}` },
    })

  if(data.error){
    handleJWTError(data.error.name, {
      repeatRequestMethodName: 'loginCheckFx',
    })
    return
  }


    setIsAuth(true)
    return data.user
  }  
    catch (error){
    toast.error((error as Error).message)
    }
  })

 export const refreshTokenFx = createEffect(async ({ jwt }: { jwt: string }) => {
    const { data } = await api.post('/api/users/refresh', { jwt })
  
    localStorage.setItem('auth', JSON.stringify(data))
  
    return data
  })




export const $user = user
  .createStore<IUser>({} as IUser)
  .on(loginCheckFx.done, (_, { result }) => result)

  sample({
    clock: loginCheck,
    source: $user,
    fn: (user, { jwt }) => ({ ...user, jwt }),
    target: loginCheckFx
  })