import { checkoutHandler, closeSideBarbtnHandler, manageInverntoryBtnHandler } from "./handlers";
import { addNewProductBtnHandler } from "./inventory";
import { createRecordFormHandler, recordGroupHandler } from "./record";
import { addNewProductBtn, checkout, closeSideBarBtn, createRecordForm, manageInverntoryBtn } from "./selectors";

const listener = () => {
  manageInverntoryBtn.addEventListener("click", manageInverntoryBtnHandler);
  closeSideBarBtn.addEventListener("click", closeSideBarbtnHandler);

  addNewProductBtn.addEventListener('click',addNewProductBtnHandler)
  createRecordForm.addEventListener('submit',createRecordFormHandler)
  recordGroup.addEventListener('click',recordGroupHandler)
  checkout.addEventListener('click',checkoutHandler)
};

export default listener;
