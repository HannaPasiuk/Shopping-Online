import { closeSearchMenu } from "@/app/context/modals";

export const removeOverFlowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLElement;
  body.classList.remove('overflow-hidden');
}

export const addOverFlowHiddenToBody = (paddingRight = '') => {
  const body = document.querySelector('body') as HTMLElement;
  body.classList.add('overflow-hidden');
  paddingRight && (body.style.paddingRight = paddingRight);
}

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

export const handleCloseSearchModal = () => {
  closeSearchMenu();
  removeOverFlowHiddenFromBody();
}

export const shuffle = <T>(array: T[]) => {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}