import { ISignUpFx } from "@/types/authPopup";
import { createDomain, createEffect, sample } from "effector";
import toast from "react-hot-toast";
import { onAuthSuccess } from "@/lib/utils/auth";
import api from "@/api/apiInstants";



export const auth = createDomain();

export const openAuthPopup = auth.createEvent();
export const closeAuthPopup = auth.createEvent();
export const setIsAuth = auth.createEvent<boolean>();
export const handleSignUp = auth.createEvent<ISignUpFx>();
export const handleSignIn = auth.createEvent<ISignUpFx>();





export const oauthFx = createEffect(
  async ({ name, password, email }: ISignUpFx) => {
    try {
      const { data } = await api.post("/api/users/oauth", {
        name,
        password,
        email,
      });

      onAuthSuccess("User successfully created", data);
      return data.user;
    } catch (err) {
      toast.error((err as Error).message);
    }
  }
);

export const signInFx = createEffect(
  async ({ email, password, isOAuth }: ISignUpFx) => {

  if (isOAuth) {
    await oauthFx({
      password,
      email,
    });
    return;
  }

  const { data } = await api.post("/api/users/login", {
    email,
    password,
  })
  
  if (data.warningMessage) {
    toast.error(data.warningMessage);
    return;
  } 
    onAuthSuccess("User successfully logged in", data);


  return data;
});


export const signUpFx = createEffect(
  async ({ name, password, email, isOAuth }: ISignUpFx) => {

    if (isOAuth) {
      await oauthFx({
        name,
        password,
        email,
      })
      return
    }

    const { data } = await api.post("/api/users/signup", {
      name,
      password,
      email,
    });

    if (data.warningMessage) {
      toast.error(data.warningMessage);
      return;
    }
    onAuthSuccess("User successfully created", data);

    return data

  });



  export const loginCheckFx = createEffect(async ({ jwt }: { jwt: string }) => {
    const { data } = await api.get('/api/users/login-check', {
      headers: { Authorization: `Bearer ${jwt}` },
    })
  
    return data
  })




export const $openAuthPopup = auth
  .createStore<boolean>(false)
  .on(openAuthPopup, () => true)
  .on(closeAuthPopup, () => false)

export const $isAuth = auth
  .createStore(false)
  .on(setIsAuth, (_, isAuth) => isAuth)

export const $auth = auth

  .createStore({})
  .on(signUpFx.done, (_, { result }) => result)
  .on(signUpFx.fail, (_, { error }) => {
    toast.error(error.message)
  })
  .on(signInFx.done, (_, { result }) => result)
  .on(signInFx.fail, (_, { error }) => {
    toast.error(error.message)
  })


  sample({
    clock: handleSignUp,
    source: $auth,
    fn: (_, { name, email, password, isOAuth }) => ({
      name,
      email,
      password,
      isOAuth,
    }),
    target: signUpFx,
  });
  
  sample({
    clock: handleSignIn,
    source: $auth,
    fn: (_, { name, email, password, isOAuth }) => ({
      email,
      password,
      isOAuth,
      name,
    }),
    target: signInFx,
  });
  