import initialRender from "./initialRender";
import listener from "./listener";
import observer from "./observer";
import { productSideBar } from "./selectors";

class Invoice {
  init() {
    console.log("invoice app start");
    observer()
    initialRender()
    listener();
  }
}

export default Invoice;
