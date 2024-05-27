export const removeOverFlowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLElement;
  body.classList.remove('overflow-hidden');
}

export const addOverFlowHiddenToBody = () => {
  const body = document.querySelector('body') as HTMLElement;
  body.classList.add('overflow-hidden');
}