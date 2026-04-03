import { v4 as uuidv4 } from "uuid";

import {
  createRecordForm,
  recordGroup,
  recordNetTotal,
  recordRowTemplate,
  recordTax,
  recordTotal,
} from "./selectors";
import { products } from "./states";
import Swal from "sweetalert2";

export const createRecordFormHandler = (event) => {
  event.preventDefault();

  const formdata = new FormData(createRecordForm);
  // console.log(formdata.get("product_select"));
  // console.log(formdata.get("quantity"));

  const currentProduct = products.find(
    (product) => product.id == formdata.get("product_select"),
  );

  recordGroup.append(createRecordRow(currentProduct, formdata.get("quantity")));

  createRecordForm.reset();

  // const total = calculateRecordCostTotal();
  // const tax = calculateTax(total);

  // recordTotal.innerText = total;
  // recordTax.innerText = tax;
  // recordNetTotal.innerText = total + tax;
};

export const createRecordRow = ({ id, name, price }, quantity) => {
  const recordRow = recordRowTemplate.content.cloneNode(true);
  const recordProductName = recordRow.querySelector(".record-product-name");
  const recordProductPrice = recordRow.querySelector(".record-product-price");
  const recordQuantity = recordRow.querySelector(".record-quantity");
  const recordCost = recordRow.querySelector(".record-cost");

  const currentRecordRow = recordRow.querySelector(".record-row");

  currentRecordRow.setAttribute("product-id", id);
  currentRecordRow.setAttribute("row-id", uuidv4());

  recordProductName.innerText = name;
  recordProductPrice.innerText = price;
  recordQuantity.innerText = quantity;
  recordCost.innerText = price * quantity;

  return recordRow;
};

export const calculateRecordCostTotal = () => {
  let total = 0;
  recordGroup
    .querySelectorAll(".record-cost")
    .forEach((el) => (total += parseFloat(el.innerText)));

  return total;
};

export const calculateTax = (amount, perentage = 5) => {
  return (amount * perentage) / 100;
};

export const removeRecord = (rowId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const currentRow = document.querySelector(`[row-id='${rowId}']`);
      currentRow.remove();

      // Swal.fire({
      //   title: "Deleted!",
      //   text: "Your file has been deleted.",
      //   icon: "success",
      // });
    }
  });
};

export const recordGroupHandler = (event) => {
  if (event.target.classList.contains("record-remove")) {
    const currentRecordRow = event.target.closest(".record-row");

    removeRecord(currentRecordRow.getAttribute("row-id"));
  }
};

export const recordGroupObserver = () => {
  const config = { attributes: true, childList: true, subtree: true };

  const updateTotal = () => {
    const total = calculateRecordCostTotal();
    const tax = calculateTax(total);

    recordTotal.innerText = total;
    recordTax.innerText = tax;
    recordNetTotal.innerText = total + tax;
  };

  const observer = new MutationObserver(updateTotal);
  observer.observe(recordGroup, config);
};


