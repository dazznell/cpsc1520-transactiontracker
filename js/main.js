window.addEventListener('load', function(e) {

    const addTransaction = document.querySelector("form");
    const table = document.querySelector("tbody");
    const removeIcon = `<img  src="img/remove.svg" data-index>`;

    // add event listener to add button
    addTransaction.addEventListener("submit", function(e) {
      e.preventDefault();

      const validate = validateTrans(e.target);
      if (validate.valid) {
        const addHTML = createTrans(validate);
        addTrans(addHTML);
      }
    }); 

    // add function to put HTML into table
    function addTrans(addHTML) {
      const createIndex = table.children.length;
      let createNode = document.createRange().createContextualFragment(addHTML);
      let rows = createNode.querySelector("tr");
      let remove = rows.querySelector("img");
      remove.dataset.index = createIndex;
      table.appendChild(rows);
      removeTransaction(remove);
    }

    // removes transaction from table
    function removeTransaction(remove) {
      remove.addEventListener("click", removeTr);
    }

     function removeTr(e){
         let trans = table.querySelectorAll("tr");
         const index = e.target.dataset.index;
         const removeNode = trans[index];
         table.removeChild(removeNode);
         trans = table.querySelectorAll("tr");
         trans.forEach((item, index) => {
           console.log((item.querySelector("img").dataset.index = index));
         });
     }

    //  Create new transaction and interpolates string into HTML 
    function createTrans(newTrans) {
      const transElement = `<table><tr><td class="description">${newTrans.description}</td><td class="payment-type">${newTrans.type}</td><td class="currency">${newTrans.currency}</td><td class="remove"> ${removeIcon} </td></tr></table>`;
        //console.log(transElement)
      return transElement;
    }

    // validates values inputted into the tracker
    function validateTrans(theForm) {
      const transItem = {};
      let errorCount = 0;

      if (theForm.elements.description.value.trim() !== "") {
        transItem.description = theForm.elements.description.value;
      }

      if (theForm.elements.type.value.trim() !== "") {
        transItem.type = theForm.elements.type.value;
      }

      if (theForm.elements.currency.value !== 0) {
        transItem.currency = parseFloat(theForm.elements.currency.value).toFixed(2);
      }

      if (errorCount === 0) {
        transItem.valid = true;
        return transItem;
      }
    }
})