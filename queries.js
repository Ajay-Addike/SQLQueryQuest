var mainContent = document.getElementById("main-content");
let score = 0;
let currentPage = 1;

window.loadHomePage = function () {
  mainContent.innerHTML = `
    <div class="row justify-content-center mt-4">
        <div class="col-md-6">
            <div class="card bg-light mb-3">
                <div class="card-body">
                    <h5 class="card-title">Start the Game</h5>
                    <p id="demo" data-text="Are you ready to test your SQL skills and knowledge while we solve a thrilling mystery? Click the button below to start and let's see if you have what it takes to crack the case!"></p>
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-success" onclick="Query(1)">Go!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
  initTypewriter();
};

function next1(No) {
  if (No == 2) {
    mainContent.innerHTML = `
        <div class="row justify-content-center mt-4">
            <div class="col-md-6">
                <div class="card bg-light mb-3">
                    <div class="card-body">
                    <h5 class="card-title">Question 2:</h5>
                    <p>Clue: we know from the story that Mr.Bell went missing on 2023-04-01 in Fairfax city</p>
                    <button class="btn btn-primary" onclick="Query(2)">Go to Question</button>
                    </div>
                </div>
            </div>
        </div>
        `;
  }
  // else if(No == 3)
  // {
  //     mainContent.innerHTML = `
  //     <div class="row justify-content-center mt-4">
  //         <div class="col-md-6">
  //             <div class="card bg-light mb-3">
  //                 <div class="card-body">
  //                 <h5 class="card-title">Question 2:</h5>
  //                 <p>Clue: we know from the story that Mr.Bell went missing on 2023-04-01 in Fairfax city</p>
  //                 <button class="btn btn-primary" onclick="query3()">Go to Question</button>
  //             </div>
  //         </div>
  //     </div>
  //     `;
  // }
  // score += 1;
  // document.getElementById("scoreContainer").innerText = score;
}

window.Query = function (show, scoreUpdate) {
  mainContent.innerHTML = `
    <div class="row justify-content-center mt-4">
        <div class="col-md-6">
            <div class="card bg-light mb-3">
                <div class="card-body">
                    ${
                      show == 1
                        ? `
                        <h5 class="card-title text-success">Get the number of cases in the CRIME_REPORT.</h5>
                        `
                        : ""
                    }
                    ${
                      show == 1.2
                        ? ` <h5 class="card-title text-success">Get all the cases in the CRIME_REPORT.</h5>`
                        : ``
                    }
                    ${
                      show == 2
                        ? `<h5 class="card-title text-success">Get the case related to Mr.Bell from the CRIME_REPORT.</h5>
                        <button class="btn btn-warning" onclick="displayHint()">Hint !</button>
                        <p id="myParagraph" class="text-info">Remember, Mr.Bell went missing on 2023-04-01 in Fairfax City..</p>
                        </br>`
                        : ""
                    }
                    ${
                      show == 3
                        ? `
                        <h5 class="card-title text-info">We Know that first witness lives at the last house on "Southwestern Dr".</h5>
                        <h5 class="card-title text-success">Find the first witness details.</h5>`
                        : ""
                    }
                    ${
                      show == 4
                        ? `
                        <h5 class="card-title text-info">We Know that second witness john lives somewhere on "Hanks Ave".</h5>
                        <h5 class="card-title text-success">Find the second witness details.</h5>`
                        : ""
                    }
                    ${
                      show == 5
                        ? `<h5 class="card-title text-info">ID of the First and Second witness are 15867 and 24663.</h5>
                        <h5 class="card-title text-success">Get the interview transcripts.</h5>`
                        : ""
                    }
                    ${
                      show == 6
                        ? `<h5 class="card-title text-success">Get License Plate details that include NJ53.</h5>`
                        : ""
                    }
                    ${
                      show == 7
                        ? `<h5 class="card-title text-info">We know that Andrian bell was being forcibly led into a black sedan by a person who's 6ft.</h5>
                        <h5 class="card-title text-success">Find the culprit.</h5>`
                        : ""
                    }
                    <p>Use the form to create  a query</p>
                    <div class="row" id="check1">
                        <div class="col-md-3 mb-3">
                            <select class="custom-select" id="AttributeDropdown">
                                <option value="">Choose Action</option>
                                <option value="Select">Select</option>
                                <option value="Delete">Delete</option>
                                <option value="Insert">Insert</option>
                            </select>
                        </div>
                        ${
                          show != 7
                            ? `<div class="col-md-3 mb-3">
                            <select class="custom-select" id="FieldDropdown">
                                <option value="">Choose Field</option>
                                <option value="*">*</option>
                                <option value="count(*)">count(*)</option>
                            </select>
                        </div>`
                            : `P.ID, P.Name, P.gender, p.height, DL.License_number`
                        }
                        
                        <div class="col-md-3 mb-3">
                            <select class="custom-select" id="fromOptionDropdown">
                                <option value="">Choose Action</option>
                                <option value="Into">Into</option>
                                <option value="From">From</option>
                            </select>
                        </div>

                        
                        ${
                          show == 5 || show == 6
                            ? `<div class="col-md-3 mb-3">
                              <select class="custom-select" id="FromDropdown">
                                  <option value="">Choose Table</option>
                                  <option value="Drivers_License">Drivers_License</option>
                                  <option value="interview">interview</option>
                                  <option value="person">person</option>
                              </select>
                          </div>`
                            : show == 1
                            ? `<div class="col-md-3 mb-3" style="display: flex; align-items: center;">
                            <select class="custom-select" id="FromDropdown">
                                <option value="">Choose Table</option>
                                <option value="CRIME_REPORT">CRIME_REPORT</option>
                                <option value="location">location</option>
                                <option value="person">person</option>
                            </select>
                            <div style="margin-left: 7px;">;</div>
                        </div>
                        `
                            : `<div class="col-md-3 mb-3">
                                <select class="custom-select" id="FromDropdown">
                                    <option value="">Choose Table</option>
                                    <option value="CRIME_REPORT">CRIME_REPORT</option>
                                    <option value="location">location</option>
                                    <option value="person">person</option>
                                </select>
                            </div>`
                        }

                        ${
                          show == 7
                            ? `
                              as 
                                <div class="col-md-3 mb-3">
                                    <select class="custom-select" id="alias1">
                                        <option value="">Choose Attribute</option>
                                        <option value="p">p</option>
                                        <option value="DL">DL</option>
                                        <option value="D">D</option>
                                    </select>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <select class="custom-select" id="joinDropDown">
                                        <option value="">Choose Attribute</option>
                                        <option value="Inner Join">Inner Join</option>
                                        <option value="Outer Join">Outer Join</option>
                                        <option value="Left Join">Left Join</option>
                                    </select>
                                </div>
                                <div class="col-md-3 mb-3">
                              <select class="custom-select" id="FromDropdown2">
                                  <option value="">Choose Table</option>
                                  <option value="Drivers_License">Drivers_License</option>
                                  <option value="interview">interview</option>
                                  <option value="person">person</option>
                              </select>
                          </div>
                                as DL
                                <div class="col-md-3 mb-3">
                                <select class="custom-select" id="onDropDown">
                                    <option value="">Choose Attribute</option>
                                    <option value="on">on</option>
                                    <option value="out">out</option>
                                    <option value="in">in</option>
                                </select>
                            </div>
                            P.License_ID

                              `
                            : ``
                        }

                        ${
                          show == 2
                            ? `where date
                            <div class="col-md-3 mb-3">
                                <select class="custom-select" id="Q2ConditionTypeDropdown">
                                    <option value="">Choose Condition</option>
                                    <option value="=== '2023-04-01'">=== '2023-04-01'</option>
                                    <option value="= '2023-04-01'">= '2023-04-01'</option>
                                    <option value="NOT IN ('2023-04-01')">NOT IN ('2023-04-01')</option>
                                </select>
                            </div>
                            and type =
                            <div class="col-md-3 mb-3">
                                <select class="custom-select" id="Q2ConditionCityDropdown2">
                                    <option value="">Choose Condition</option>
                                    <option value="'missing'">'missing'</option>
                                    <option value="'Robbery'">'Robbery'</option>
                                </select>
                            </div>
                            and city =
                            <div class="col-md-3 mb-3">
                                <select class="custom-select" id="cityDropdown">
                                    <option value="">Choose Condition</option>
                                    <option value="'Fairfax'">'Fairfax'</option>
                                    <option value="'NYC'">'NYC'</option>
                                    <option value="'Richmond'">'Richmond'</option>
                                </select>
                                ;
                            </div>
                            
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-success" onclick="executeQuery(2)">Run!</button>
                                <button  id="next1" class="btn btn-primary" disabled onclick="Query(3,1)">Next Question</button>
                            </div>
                            `
                            : ""
                        }
                        ${
                          show == 3
                            ? `   WHERE AddressStreet
                              <div class="col-md-3 mb-3">
                                  <select class="custom-select" id="Q3ConditionTypeDropdown">
                                      <option value="">Choose Condition</option>
                                      <option value="IN 'Southwestern Dr'">IN 'Southwestern Dr'</option>
                                      <option value="= 'Hanks Ave'">= 'Hanks Ave'</option>
                                      <option value="= 'Southwestern Dr'">= 'Southwestern Dr'</option>
                                  </select>
                              </div>
                              <div class="col-md-3 mb-3">
                                  <select class="custom-select" id="Q3OrderByDropdown">
                                      <option value="">Choose Clause</option>
                                      <option value="ORDER BY">ORDER BY</option>
                                      <option value="GROUP BY ">GROUP BY</option>
                                      <option value="AND">AND</option>
                                  </select>
                              </div>
                              AddressNumber DESC;
                              
                              <div class="d-flex justify-content-end">
                              <button type="button" class="btn btn-success" onclick="executeQuery(3)">Run!</button>
                              <button  id="next1" class="btn btn-primary" disabled onclick="Query(4,1)">Next Question</button>
                          </div>`
                            : ""
                        }
                        ${
                          show == 4
                            ? ` WHERE AddressStreet
                              <div class="col-md-3 mb-3">
                              <select class="custom-select" id="Q3ConditionTypeDropdown">
                                  <option value="">Choose Condition</option>
                                  <option value="IN 'Southwestern Dr'">IN 'Southwestern Dr'</option>
                                  <option value="= 'Hanks Ave'">= 'Hanks Ave'</option>
                                  <option value="= 'Southwestern Dr'">= 'Southwestern Dr'</option>
                              </select>
                          </div>
                          <div class="col-md-3 mb-3">
                          AND Name
                          </div>
                              <div class="col-md-3 mb-3">
                              
                               <select class="custom-select" id="Q4ConditionTypeDropdown2">
                                   <option value="">Choose Condition</option>
                                   <option value="LIKE 'John%'">LIKE 'John%'</option>
                                   <option value="LIKE = 'John'">LIKE = 'John'</option>
                                   <option value="LIKE = 'John%'">LIKE = 'John%'</option>
                               </select>  
                               ;
                               </div>

                               <div class="d-flex justify-content-end">
                               <button type="button" class="btn btn-success" onclick="executeQuery(4)">Run!</button>
                               <button  id="next1" class="btn btn-primary" disabled onclick="Query(5,1)">Next Question</button>
                           </div>
                                `
                            : ""
                        }
                        ${
                          show == 5
                            ? ` WHERE personID
                                <div class="col-md-3 mb-3">
                                <select class="custom-select" id="Q5ConditionTypeDropdown">
                                    <option value="">Choose Condition</option>
                                    <option value="= 13867">= 13867</option>
                                    <option value="= 14867">= 14867</option>
                                    <option value="= 15867">= 15867</option>
                                </select>
                            </div>
                            <div class="col-md-3 mb-3">
                                 <select class="custom-select" id="Q5ConditionTypeDropdown2">
                                     <option value="">Choose Condition</option>
                                     <option value="AND">AND</option>
                                     <option value="OR">OR</option>
                                     <option value="NOT">NOT</option>
                                 </select>  
                            </div>
                            personID
                            <div class="col-md-3 mb-3">
                                <select class="custom-select" id="Q5ConditionTypeDropdown3">
                                    <option value="">Choose Condition</option>
                                    <option value="= 27663">= 27663</option>
                                    <option value="= 24663">= 24663</option>
                                    <option value="= 15867">= 15867</option>
                                </select>;
                            </div>
  
                                 <div class="d-flex justify-content-end">
                                 <button type="button" class="btn btn-success" onclick="executeQuery(5)">Run!</button>
                                 <button  id="next1" class="btn btn-primary" disabled onclick="Query(6,1)">Next Question</button>
                             </div>
                                  `
                            : ""
                        }
                        ${
                          show == 6
                            ? ` WHERE License_number
                            <div class="col-md-3 mb-3">
                                <select class="custom-select" id="Q6ConditionTypeDropdown">
                                    <option value="">Choose Condition</option>
                                    <option value="LIKE '%NJ53%'">LIKE '%NJ53%'</option>
                                    <option value="LIKE = '%NJ53%'">LIKE = '%NJ53%'</option>
                                    <option value="LIKE = '%NJ533%'">LIKE = '%NJ533%'</option>
                                </select>  
                            </div>
    
                                <div class="d-flex justify-content-end">
                                    <button type="button" class="btn btn-success" onclick="executeQuery(6)">Run!</button>
                                    <button  id="next1" class="btn btn-primary" disabled onclick="Query(7,1)">Next Question</button>
                                </div>
                                    `
                            : ""
                        }
                        ${
                          show == 7
                            ? ` 
                            <div class="col-md-3 mb-3">
                                <select class="custom-select" id="Q7ConditionTypeDropdown3">
                                    <option value="">Choose Condition</option>
                                    <option value="= DL.ID">= DL.ID</option>
                                    <option value="= p.ID">= p.ID</option>
                                    <option value="= D.ID">= D.ID</option>
                                </select>
                            </div>
                            WHERE DL.height = 6.0 and DL.License_number like '%NJ53%';

                            <div class="d-flex justify-content-end">
                                    <button type="button" class="btn btn-success" onclick="executeQuery(7)">Run!</button>
                                    <button type="button" class="btn btn-success" onclick="exitPage(1)">Next!</button>
                                </div>
                            `
                            : ""
                        }

                    </div>

                    ${
                      show == 1
                        ? `<div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-success" onclick="executeQuery(1)">Run!</button>
                        <button  id="next1" class="btn btn-primary" disabled onclick="Query(1.2,1)">Next Question</button>
                    </div>`
                        : ``
                    }
                    ${
                      show == 1.2
                        ? `<div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-success" onclick="executeQuery(1.2)">Run!</button>
                        <button  id="next1" class="btn btn-primary" disabled onclick="Query(2,1)">Next Question</button>
                    </div>`
                        : ``
                    }

                    <div class="row mt-3">
                    <div id="errorContainer"></div>
                    <div id="successContainer"></div>
                </div>
                </div>
            </div>
        </div>
        <div class="container mt-5">
            <div id="outputContainer" class="text-center"></div>
            <div id="gridPagination" class="pagination-container"></div>
        </div>
    </div>
    `;

  score += scoreUpdate == undefined ? 0 : scoreUpdate;
  document.getElementById("scoreContainer").innerText = score;
};

function displayError(errorMessage) {
  const errorContainer = document.getElementById("errorContainer");
  let error = "Error:";
  if (errorMessage.includes(error)) error = "";
  if (errorMessage.includes("wrong")) error = "";
  errorContainer.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${error}</strong> ${errorMessage}
        </div>
    `;
}

function clearError() {
  const errorContainer = document.getElementById("errorContainer");
  errorContainer.innerHTML = "";
}
function clearSuccess() {
  const successContainer = document.getElementById("successContainer");
  successContainer.innerHTML = "";
}
function clearOutputAndGrid() {
  const clearOutput = document.getElementById("outputContainer");
  clearOutput.innerHTML = "";
  document.getElementById("gridPagination").innerHTML = "";
}

function changePage(page) {
  currentPage = page;
  displayResults(resultsData, page); // Call displayResults to show the updated page
}

function displayHint(no){
  var paragraph = document.getElementById("myParagraph");
  if (paragraph.style.display === "none") {
    paragraph.style.display = "block";
  } else {
    paragraph.style.display = "none";
  }

}

function query(sql, cb, err_cb) {
  if (err_cb) {
    worker.onerror = (e) => err_cb(e);
  } else {
    clearSuccess();
    clearOutputAndGrid();
    worker.onerror = (e) => {
      throw new Error(displayError(e.message));
    };
  }

  worker.onmessage = (event) => {
    cb(event.data.results);
  };
  worker.postMessage({
    id: 2,
    action: "exec",
    sql: sql,
  });
}

function exitPage(scoreUpdate){
  mainContent.innerHTML = `  <div class="row justify-content-center mt-4">
  <div class="col-md-6">
      <div class="card bg-light mb-3">
          <div class="card-body">
          <h5 class="card-title text-success">Congratulations you have reached the end!!
          </h5>
            </div>
            </div>
            </div>
            </div>`;
            score += scoreUpdate == undefined ? 0 : scoreUpdate;
            document.getElementById("scoreContainer").innerText = score;
}

function displayResults(results, page) {
  itemsPerPage = 5;
  const start = (page - 1) * itemsPerPage;
  // const end = page * itemsPerPage;
  const end = Math.min(page * itemsPerPage, results[0].values.length);

  let pageData = results[0].values;
  pageData = pageData.slice(start, end);
  // const pageData = results[0].values.slice(start, end);

  resultsData = results;
  // console.log(results[0])
  var startIndex = 0;
  var endIndex = Math.min(startIndex + itemsPerPage, results[0].values.length);
  var tableHTML = "<table class='table table-bordered mt-3'>";
  tableHTML += "<thead><tr>";
  results[0].columns.forEach((column) => {
    tableHTML += "<th>" + column + "</th>";
  });
  tableHTML += "</tr></thead><tbody>";
  for (var i = 0; i < pageData.length; i++) {
    var row = pageData[i];
    //console.log(row);
    tableHTML += "<tr>";
    row.forEach((cell) => {
      tableHTML += "<td>" + cell + "</td>";
    });
    tableHTML += "</tr>";
  }
  tableHTML += "</tbody></table>";

  // var recordsInfo = `Showing ${startIndex + 1}-${endIndex} of ${results[0].values.length} records`;
  // tableHTML += `<div>${recordsInfo}</div>`;
  // console.log(tableHTML)
  document.getElementById("outputContainer").innerHTML = tableHTML;

  var paginationHTML = "";
  var totalPages = Math.ceil(results[0].values.length / itemsPerPage);
  for (var i = 1; i <= totalPages; i++) {
    paginationHTML += `<button onclick="changePage(${i})">${i}</button>`;
  }
  document.getElementById("gridPagination").innerHTML = paginationHTML;

  // for (let index = 0; index < itemsPerPage; index++) {
  //     resultsData[0].values.shift();
  // }
}

function displaySuccess(successMessage, containerId) {
  const successContainer = document.getElementById(containerId);
  successContainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success:</strong> ${successMessage}<br/>
            
        </div>
    `;
}

window.executeQuery = function (queryNo) {
  currentPage = 1;
  let sqlQuery = "";
  const AttributeDropdown = document.getElementById("AttributeDropdown").value;
  const StarDropdown =
    document.getElementById("FieldDropdown")?.value || "fallbackValue";
  const FromDropdown = document.getElementById("FromDropdown").value;
  const fromOptionDropdown =
    document.getElementById("fromOptionDropdown").value;
    const cityDropdown =
    document.getElementById("cityDropdown")?.value || "fallbackValue";
    
  const FromDropdown2 =
    document.getElementById("FromDropdown2")?.value || "fallbackValue";

  const Q2ConditionTypeDropdown =
    document.getElementById("Q2ConditionTypeDropdown")?.value ||
    "fallbackValue";
  const Q2ConditionCityDropdown2 =
    document.getElementById("Q2ConditionCityDropdown2")?.value ||
    "fallbackValue";
  const Q3ConditionTypeDropdown =
    document.getElementById("Q3ConditionTypeDropdown")?.value ||
    "fallbackValue";
  const Q3OrderByDropdown =
    document.getElementById("Q3OrderByDropdown")?.value || "fallbackValue";
  const Q4ConditionTypeDropdown2 =
    document.getElementById("Q4ConditionTypeDropdown2")?.value ||
    "fallbackValue";
  const Q5ConditionTypeDropdown =
    document.getElementById("Q5ConditionTypeDropdown")?.value ||
    "fallbackValue";
  const Q5ConditionTypeDropdown2 =
    document.getElementById("Q5ConditionTypeDropdown2")?.value ||
    "fallbackValue";
  const Q5ConditionTypeDropdown3 =
    document.getElementById("Q5ConditionTypeDropdown3")?.value ||
    "fallbackValue";
  const Q6ConditionTypeDropdown =
    document.getElementById("Q6ConditionTypeDropdown")?.value ||
    "fallbackValue";
  const alias1 = document.getElementById("alias1")?.value || "fallbackValue";
  const onDropDown =
    document.getElementById("onDropDown")?.value || "fallbackValue";
  const joinDropDown =
    document.getElementById("joinDropDown")?.value || "fallbackValue";

  const Q7ConditionTypeDropdown3 =
    document.getElementById("Q7ConditionTypeDropdown3")?.value ||
    "fallbackValue";

  try {
    if (
      !AttributeDropdown.trim() ||
      !StarDropdown.trim() ||
      !FromDropdown.trim() ||
      !Q2ConditionTypeDropdown.trim() ||
      !Q2ConditionCityDropdown2.trim() ||
      !fromOptionDropdown
    ) {
      throw new Error("Please select options from the dropdowns");
    }
    if (queryNo == 1)
      sqlQuery = `${
        AttributeDropdown == "Select" ? AttributeDropdown : "wrong"
      } ${StarDropdown == "count(*)" ? StarDropdown : "wrong"} ${
        fromOptionDropdown == "From" ? fromOptionDropdown : "wrong"
      } ${FromDropdown == "CRIME_REPORT" ? FromDropdown : "wrong"}`;
    else if (queryNo == 1.2)
      sqlQuery = `${
        AttributeDropdown == "Select" ? AttributeDropdown : "wrong"
      } ${StarDropdown == "*" ? StarDropdown : "wrong"} ${
        fromOptionDropdown == "From" ? fromOptionDropdown : "wrong"
      } ${FromDropdown == "CRIME_REPORT" ? FromDropdown : "wrong"}`;
    else if (queryNo == 2)
      sqlQuery = `${AttributeDropdown == "Select" ? AttributeDropdown : "wrong"} ${StarDropdown == "*" ? StarDropdown : "wrong"} ${fromOptionDropdown == "From" ? fromOptionDropdown : "wrong"} ${FromDropdown == "CRIME_REPORT" ? FromDropdown : "wrong"} where date ${Q2ConditionTypeDropdown == "= '2023-04-01'"?Q2ConditionTypeDropdown : "wrong"} and type = ${Q2ConditionCityDropdown2 == "'missing'"?Q2ConditionCityDropdown2: "wrong"} and city = ${cityDropdown == "'Fairfax'"?cityDropdown: "wrong"};`;
    else if (queryNo == 3)
      sqlQuery = `${
        AttributeDropdown == "Select" ? AttributeDropdown : "wrong"
      } ${StarDropdown == "*" ? StarDropdown : "wrong"} ${
        fromOptionDropdown == "From" ? fromOptionDropdown : "wrong"
      } ${FromDropdown == "person" ? FromDropdown : "wrong"} where AddressStreet ${Q3ConditionTypeDropdown == "= 'Southwestern Dr'"?Q3ConditionTypeDropdown: "wrong"} ${Q3OrderByDropdown == "ORDER BY"?Q3OrderByDropdown: "wrong"} AddressNumber DESC;`;
    else if (queryNo == 4)
      sqlQuery = `${
        AttributeDropdown == "Select" ? AttributeDropdown : "wrong"
      } ${StarDropdown == "*" ? StarDropdown : "wrong"} ${
        fromOptionDropdown == "From" ? fromOptionDropdown : "wrong"
      } ${FromDropdown == "person" ? FromDropdown : "wrong"} where AddressStreet ${Q3ConditionTypeDropdown == "= 'Hanks Ave'"?Q3ConditionTypeDropdown: "wrong"} and name ${Q4ConditionTypeDropdown2 == "LIKE 'John%'"?Q4ConditionTypeDropdown2: "wrong"};`;
    else if (queryNo == 5)
      sqlQuery = `${
        AttributeDropdown == "Select" ? AttributeDropdown : "wrong"
      } ${StarDropdown == "*" ? StarDropdown : "wrong"} ${
        fromOptionDropdown == "From" ? fromOptionDropdown : "wrong"
      } ${FromDropdown == "interview" ? FromDropdown : "wrong"} where personID ${Q5ConditionTypeDropdown == "= 15867"?Q5ConditionTypeDropdown : "wrong"} ${Q5ConditionTypeDropdown2 == "OR"?Q5ConditionTypeDropdown2: "wrong"} personID ${Q5ConditionTypeDropdown3 == "= 24663"?Q5ConditionTypeDropdown3: "wrong"};`;
    else if (queryNo == 6)
      sqlQuery = `${
        AttributeDropdown == "Select" ? AttributeDropdown : "wrong"
      } ${StarDropdown == "*" ? StarDropdown : "wrong"} ${
        fromOptionDropdown == "From" ? fromOptionDropdown : "wrong"
      } ${FromDropdown == "Drivers_License" ? FromDropdown : "wrong"} where License_number ${Q6ConditionTypeDropdown == "LIKE '%NJ53%'"?Q6ConditionTypeDropdown: "wrong"};`;
    else
      sqlQuery = `${AttributeDropdown == "Select" ? AttributeDropdown : "wrong"} P.ID, P.Name, P.gender, p.height, DL.License_number ${fromOptionDropdown == "From" ? fromOptionDropdown : "wrong"} ${FromDropdown == "person" ? FromDropdown : "wrong"} as ${alias1 == "p"?alias1:  "wrong"} ${joinDropDown == "Inner Join"?joinDropDown : "wrong"} ${FromDropdown2 == "Drivers_License"?FromDropdown2: "wrong"} as DL
      ${onDropDown == "on"?onDropDown: "wrong"} P.License_ID=${Q7ConditionTypeDropdown3 == "= DL.ID"?Q7ConditionTypeDropdown3: "wrong"}
      WHERE DL.height = 6.0 and DL.License_number like '%NJ53%';`;

    if (sqlQuery.includes("wrong")) {
      clearSuccess();
      clearOutputAndGrid();
      displayError("wrong answer");
    } else {
      console.log(sqlQuery);
      query(sqlQuery, function (result) {
        displayResults(result, currentPage);
        clearError();
        displaySuccess("Query executed successfully", "successContainer");

        document.getElementById("next1").disabled = false;
      });
    }
  } catch (error) {
    clearSuccess();
    clearOutputAndGrid();
    displayError("Please select options from the dropdowns");
    document.getElementById("next1").disabled = true;
  }
};

function initTypewriter() {
  var demo = document.getElementById("demo");
  var txt = demo.getAttribute("data-text");
  var i = 0;
  var speed = 7;

  function typeWriter() {
    if (i < txt.length) {
      demo.innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();
}

document.addEventListener("DOMContentLoaded", function () {
  loadHomePage(); // Initial load
});
