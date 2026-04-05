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

  const isExitedRecord = document.querySelector(
    `[product-id='${currentProduct.id}']`,
  );

  if (isExitedRecord === null) {
    recordGroup.append(
      createRecordRow(currentProduct, formdata.get("quantity")),
    );
  } else {
    Swal.fire({
      title: `Are you sure to add quantity to ${currentProduct.name} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRecordQuantity(
          isExitedRecord.getAttribute("row-id"),
          parseInt(formdata.get("quantity")),
        );
      }
    });
  }

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

//quantity add
export const quantityAdd = (rowId) => {
  const currentRow = document.querySelector(`[row-id='${rowId}']`);

  const recordProductPrice = currentRow.querySelector(".record-product-price");
  const recordQuantity = currentRow.querySelector(".record-quantity");
  const recordCost = currentRow.querySelector(".record-cost");

  recordQuantity.innerText = parseInt(recordQuantity.innerText) + 1;
  recordCost.innerText =
    recordQuantity.innerText * recordProductPrice.innerText;
};
//quantity sub
export const quantitySub = (rowId) => {
  const currentRow = document.querySelector(`[row-id='${rowId}']`);

  const recordProductPrice = currentRow.querySelector(".record-product-price");
  const recordQuantity = currentRow.querySelector(".record-quantity");
  const recordCost = currentRow.querySelector(".record-cost");

  if (recordQuantity.innerText > 1) {
    recordQuantity.innerText = parseInt(recordQuantity.innerText) - 1;

    recordCost.innerText =
      recordQuantity.innerText * recordProductPrice.innerText;
  }
};
////updateRecordQuantity

export const updateRecordQuantity = (rowId, newQuantity) => {
  const currentRow = document.querySelector(`[row-id='${rowId}']`);

  const recordProductPrice = currentRow.querySelector(".record-product-price");
  const recordQuantity = currentRow.querySelector(".record-quantity");
  const recordCost = currentRow.querySelector(".record-cost");

  if (newQuantity > 0 || recordQuantity.innerText > 1) {
    recordQuantity.innerText = parseInt(recordQuantity.innerText) + newQuantity;
    recordCost.innerText =
      recordQuantity.innerText * recordProductPrice.innerText;
  }
};

export const recordGroupHandler = (event) => {
  const currentRecordRow = event.target.closest(".record-row");
  if (event.target.classList.contains("record-remove")) {
    removeRecord(currentRecordRow.getAttribute("row-id"));
  } else if (event.target.classList.contains("quantity-add")) {
    updateRecordQuantity(currentRecordRow.getAttribute("row-id"), 1);
  } else if (event.target.classList.contains("quantity-sub")) {
    updateRecordQuantity(currentRecordRow.getAttribute("row-id"), -1);
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
