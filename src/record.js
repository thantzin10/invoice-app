import { createRecordForm } from "./selectors";
import { products } from "./states";

export const createRecordFormHandler = (event) => {
  event.preventDefault();

  const formdata = new FormData(createRecordForm);
  console.log(formdata.get("product_select"));
  console.log(formdata.get("quantity"));

  console.log(
    products.find((product) => product.id == formdata.get("product_select")),
  );
};
