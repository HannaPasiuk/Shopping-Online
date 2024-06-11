'use client'
import { createEffect } from "effector";
import toast from "react-hot-toast";
import api from "./apiInstants";
import { ISignUpFx } from "@/app/types/authPopup";
import { onAuthSuccess } from "@/app/lib/utils/auth";
import { setIsAuth } from "@/app/context/auth";



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
  });
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
      });
      return;
    }

    const { data } = await api.post("/api/users/registration", {
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
    try {
      const { data } = await api.get("/api/users/login-check", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setIsAuth(true);
    } catch (err) {
      toast.error((err as Error).message)
    }
  })