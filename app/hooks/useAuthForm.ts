import { Store, EventCallable } from "effector";
import { useEarthoOne } from "@eartho/one-client-react";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import { useForm } from "react-hook-form";
import { IInputs, ISignUpFx } from "../types/authPopup";

export const useAuthForm = (
  initialSpinner: Store<boolean>,
  isSideActive: boolean,
  event: EventCallable<ISignUpFx>
) => {
  const spinner = useUnit(initialSpinner);
  const { isConnected, user, connectWithPopup } = useEarthoOne();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>();

  useEffect(() => {
    if (isSideActive) {
      if (isConnected) {
        event({
          name: user?.user.displayName,
          email: user?.user.email,
          password: user?.user.uid,
          isOAuth: true,
        });
      }
    }
  }, [isConnected, user, event, isSideActive]);

  const handleSignupWithOAuth = () =>
    connectWithPopup({
      accessId: `${process.env.NEXT_PUBLIC_OAUTH_ACCESS_ID}`,
    });

  return {
    spinner,
    register,
    handleSubmit,
    errors,
    handleSignupWithOAuth,
  };
};
