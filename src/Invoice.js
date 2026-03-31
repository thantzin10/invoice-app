import initialRender from "./initialRender";
import listener from "./listener";
import { productSideBar } from "./selectors";

class Invoice {
  init() {
    console.log("invoice app start");
    initialRender()
    listener();
  }
}

export default Invoice;
