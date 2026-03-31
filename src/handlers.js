import { productSideBar } from "./selectors";

export const manageInverntoryBtnHandler = () => {
  productSideBar.classList.remove("translate-x-full");
  productSideBar.classList.add("duration-300");
};

export const closeSideBarbtnHandler = () => {
  productSideBar.classList.add("translate-x-full");
};

