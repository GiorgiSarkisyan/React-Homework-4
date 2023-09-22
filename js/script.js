import { fetchApiFunction } from "./module.js";

fetchApiFunction()
  .then((filteredData) => {
    // mainPage Wrapper - Container
    const wrapper = document.getElementById("wrapper");
    const mainPage = document.createElement("section");
    mainPage.classList.add("mainPage-section");
    wrapper.appendChild(mainPage);

    const mainPageContainer = document.createElement("div");
    mainPageContainer.classList.add("mainPage-section-container");
    mainPage.appendChild(mainPageContainer);


    // mainPage grid - Content
    const mainPageTitle = document.createElement("h2");
    mainPageContainer.appendChild(mainPageTitle);
    mainPageTitle.classList.add("mainPage-title");
    mainPageTitle.innerHTML = `All (${filteredData.length})`;

    const mainPageListContainer = document.createElement("table")
    mainPageContainer.appendChild(mainPageListContainer)
    mainPageListContainer.classList.add("mainPage-list-container")
    mainPageListContainer.innerHTML = `<thead><tr class="mainPage-list-row"><th class="mainPage-list-head">Name</th><th class="mainPage-list-head">Username</th><th class="mainPage-list-head">Email</th><th class="mainPage-list-head">Street</th><th class="mainPage-list-head">Action</th></tr> </thead>`

    const tableBody = document.createElement("tbody")
    mainPageListContainer.appendChild(tableBody)


    // for Loop for tableBody
    for (let i = 0; i < filteredData.length; i++) {
      const tableRow = document.createElement("tr");
      tableBody.appendChild(tableRow);
      tableRow.classList.add("mainPage-list-row");
      tableRow.innerHTML = `
        <td class="mainPage-list-data">${filteredData[i].name}</td>
        <td class="mainPage-list-data">${filteredData[i].username}</td>
        <td class="mainPage-list-data">${filteredData[i].email}</td>
        <td class="mainPage-list-data">${filteredData[i].street}</td>
        <td class="mainPage-list-data-action">
          <div class="action-container">
            <div class="action-container-circles-box">
              <div class="action-container-circles"></div>
              <div class="action-container-circles"></div>
              <div class="action-container-circles"></div>
            </div>
            <div class="action-container-panel">
              <div class="remove-action">Remove</div>
            </div>
          </div>
        </td>`;
    
      const actionPanel = tableRow.querySelector(".action-container-panel");
      const removeButton = tableRow.querySelector(".remove-action");
      const circlesBox = tableRow.querySelector(".action-container-circles-box");
    
      // program to delete a certain object from filteredData
      tableRow.setAttribute("data-index", i);
    
      circlesBox.addEventListener("click", () => {
        actionPanel.classList.toggle("active");
        circlesBox.querySelectorAll(".action-container-circles").forEach((circle) => {
          circle.classList.toggle("active");
        });
      });
    
      removeButton.addEventListener("click", () => {
        const dataIndex = parseInt(tableRow.getAttribute("data-index"));
    
        if (!isNaN(dataIndex)) {
          filteredData.splice(dataIndex, 1);
    
          tableRow.remove();
          const remainingRows = tableBody.querySelectorAll(".mainPage-list-row");
          remainingRows.forEach((row, newIndex) => {
            row.setAttribute("data-index", newIndex);
          });
    
          mainPageTitle.innerHTML = `All (${filteredData.length})`;
          console.log(filteredData)
        }
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });  
