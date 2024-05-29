
import { createDomain } from "effector";

const modals = createDomain();

export const openMenu = modals.createEvent();
export const closeMenu = modals.createEvent(); 

export const openCataogMenu = modals.createEvent();
export const closeCataogMenu = modals.createEvent();

export const $menuIsOpen = modals
.createStore(false)
.on(openMenu, () => true)
.on(closeMenu, () => false)

export const $cataogmenuIsOpen = modals 
.createStore(false)
.on(openCataogMenu, () => true)
.on(closeCataogMenu, () => false)