window.addEventListener('load', function(e) {

    const addTransForm = document.querySelector("form");
    const tableBody = document.querySelector("tbody");
    const removeIcon = `<img  src="img/remove.svg" data-index>`;

    addTransForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const validateItem = validateTrans(e.target);
      if (validateItem.valid) {
        const htmlString = createTrans(validateItem);
        addTrans(htmlString);
      }
    }); 

    function addTrans(htmlString) {
      const makeIndex = tableBody.children.length;
      let makeNodeFromText = document
        .createRange()
        .createContextualFragment(htmlString);

      let row = makeNodeFromText.querySelector("tr");
      let image = row.querySelector("img");
      image.dataset.index = makeIndex;
      tableBody.appendChild(row);
      addListenerToImage(image);
      updateTotalTime()
    }

    function updateTotalTime(){
      console.log("foobar")
    }

    function addListenerToImage(image) {
      image.addEventListener("click", removeTrans);
    }

     function removeTrans(e){
         let trans = tableBody.querySelectorAll("tr");
         const index = e.target.dataset.index;
         const nodeToRemove = trans[index];
         tableBody.removeChild(nodeToRemove);
         trans = tableBody.querySelectorAll("tr");
         trans.forEach((item, index) => {
           console.log((item.querySelector("img").dataset.index = index));
         });
     }


    function createTrans(newTrans) {
      const transElement = 
      `
        <table>
            <tr>
               <td class="description">${newTrans.description}</td>
               <td class="payment-type">${newTrans.type}</td>
               <td class="currency">${newTrans.currency}</td>
               <td class="remove"> ${removeIcon} </td>
            </tr>
        </table>
      `;
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
