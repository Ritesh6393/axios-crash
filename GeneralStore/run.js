
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const itemName = document.getElementById('ItemName').value;
  const description = document.getElementById('Description').value;
  const price = document.getElementById('Price').value;
  const quantity = document.getElementById('Quantity').value;

  const newData = {
    itemName: itemName,
    description: description,
    price: price,
    quantity: quantity
  };

  axios.post("https://crudcrud.com/api/89edeb3cd708466cbde292a44fd0e7f5/generalStoreData", newData)
    .then((response) => {
      clearListItems();
      fetchDataAndUpdateScreen();
    })
    .catch((error) => {
      document.body.innerHTML = document.body.innerHTML + 'Something Went Wrong!';
    });
});

window.addEventListener("DOMContentLoaded", () => {
  fetchDataAndUpdateScreen();
});

function fetchDataAndUpdateScreen() {
  axios.get("https://crudcrud.com/api/89edeb3cd708466cbde292a44fd0e7f5/generalStoreData")
    .then((response) => {
      clearListItems();
      response.data.forEach((item) => {
        showDataOnScreen(item);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function clearListItems() {
  const parentElem = document.getElementById('list-items');
  while (parentElem.firstChild) {
    parentElem.removeChild(parentElem.firstChild);
  }
}

function showDataOnScreen(newData) {
  const parentElem = document.getElementById('list-items');
  const childElem = document.createElement('li');
  const quantityElem = document.createElement('span');
  const Add1 = document.createElement('button');
  const Add2 = document.createElement('button');
  const Add3 = document.createElement('button');

  childElem.textContent = `${newData.itemName}-${newData.description}-${newData.price}-`;
  quantityElem.textContent = newData.quantity;
  Add1.textContent = 'Add1';
  Add2.textContent = 'Add2';
  Add3.textContent = 'Add3';

  Add1.addEventListener('click', function () {
    decreaseQuantity(newData, 1, quantityElem);
  });

  Add2.addEventListener('click', function () {
    decreaseQuantity(newData, 2, quantityElem);
  });

  Add3.addEventListener('click', function () {
    decreaseQuantity(newData, 3, quantityElem);
  });

  childElem.appendChild(quantityElem);
  childElem.appendChild(Add1);
  childElem.appendChild(Add2);
  childElem.appendChild(Add3);

  parentElem.appendChild(childElem);
}

function decreaseQuantity(newData, quantityToDecrease, quantityElem) {
  newData.quantity -= quantityToDecrease;

  const updatedData = {
    itemName: newData.itemName,
    description: newData.description,
    price: newData.price,
    quantity: newData.quantity
  };

  axios.put(`https://crudcrud.com/api/89edeb3cd708466cbde292a44fd0e7f5/generalStoreData/${newData._id}`, updatedData)
    .then(response => {
      quantityElem.textContent = newData.quantity;
      console.log('Quantity decreased by ' + quantityToDecrease + ' for item ' + newData.itemName + '. New quantity: ' + newData.quantity);
    })
    .catch(error => {
      console.log('Error occurred while updating the quantity:', error);
    });
}