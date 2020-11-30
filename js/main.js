window.addEventListener('load', function(e) {

    const addTransaction = document.querySelector("form");
    const table = document.querySelector("tbody");
    const removeIcon = `<img  src="img/remove.svg" data-index>`;

    addTransaction.addEventListener("submit", function(e) {
      e.preventDefault();

      const validate = validateTrans(e.target);
      if (validate.valid) {
        const htmlString = createTrans(validate);
        addTrans(htmlString);
      }
    }); 

    function addTrans(htmlString) {
      const createIndex = table.children.length;
      let createNode = document.createRange().createContextualFragment(htmlString);
      let rows = createNode.querySelector("tr");
      let remove = rows.querySelector("img");
      remove.dataset.index = createIndex;
      table.appendChild(rows);
      removeTransaction(remove);
    }

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


    function createTrans(newTrans) {
      const transElement = `<table><tr><td class="description">${newTrans.description}</td><td class="payment-type">${newTrans.type}</td><td class="currency">${newTrans.currency}</td><td class="remove"> ${removeIcon} </td></tr></table>`;
        //console.log(transElement)
      return transElement;
    }

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