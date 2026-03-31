import { closeSideBarbtnHandler, manageInverntoryBtnHandler } from "./handlers";
import { addNewProductBtnHandler } from "./inventory";
import { createRecordFormHandler } from "./record";
import { addNewProductBtn, closeSideBarBtn, createRecordForm, manageInverntoryBtn } from "./selectors";

const listener = () => {
  manageInverntoryBtn.addEventListener("click", manageInverntoryBtnHandler);

  closeSideBarBtn.addEventListener("click", closeSideBarbtnHandler);
  addNewProductBtn.addEventListener('click',addNewProductBtnHandler)
  createRecordForm.addEventListener('submit',createRecordFormHandler)
};

export default listener;
