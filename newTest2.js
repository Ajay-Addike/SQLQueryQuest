var score = 0;
var pageSize = 5; // Number of rows per page
var currentPage = 1;
var querySuccess = '';

// *************LOAD DATA*****************

function loadData(dbFile) {
    if (!dbFile) { return; }
    window.worker = new Worker("scripts/worker.sql.js");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dbFile, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
        var uInt8Array = new Uint8Array(xhr.response);
        worker.onmessage = event => {
            if (event.data.ready) {
                query('SELECT 1', (e) => {
                    console.log('DB initialization successful');
                    document.querySelectorAll("input.sql-exercise-submit").forEach(
                        (button) => { button.disabled = false; });
                });
            } else {
                console.log('DB initialization failed');
            }
        }

        worker.postMessage({
            id: 1,
            action: 'open',
            buffer: uInt8Array,
        });
    }
    xhr.send();
    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "none";
    document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";


    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "none";
    document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
    // document.getElementById("QuizInfo8").style.display = "none";

}


function query(sql, cb, err_cb) {
    if (err_cb) {
        worker.onerror = e => err_cb(e);
    } else {
        worker.onerror = e => { throw new Error(e.message); }
    }

    worker.onmessage = event => {
        cb(event.data.results);
    }
    worker.postMessage({
        id: 2,
        action: 'exec',
        sql: sql
    });
}

function datatable(data) {
  var tbl = document.createElement("table");
  tbl.classList.add('table', 'table-bordered', 'mt-3');

  var columns = data[0];
  var values = data[1];

  var headerRow = tbl.insertRow(0);
  columns.forEach((label, index) => {
      var col = document.createElement('col');
      col.className = label;
      tbl.appendChild(col);

      var headerCell = headerRow.insertCell(index);
      headerCell.textContent = label;
  });

  values.forEach((row, rowIndex) => {
      var dataRow = tbl.insertRow(rowIndex + 1);
      row.forEach((value, columnIndex) => {
          var dataCell = dataRow.insertCell(columnIndex);
          dataCell.textContent = value;
      });
  });

  return tbl;
}

// DISPLAY RESULT
function displayResults(results) {
    resultsData= results;
    console.log(results[0])
    pageSize = 5;
    // var startIndex = (currentPage - 1) * pageSize;
    var startIndex = 0;
    var endIndex = Math.min(startIndex + pageSize, results[0].values.length);
    var tableHTML = "<table class='table table-bordered mt-3'>";
    tableHTML += "<thead><tr>";
    results[0].columns.forEach(column => {
        tableHTML += "<th>" + column + "</th>";
    });
    tableHTML += "</tr></thead><tbody>";
    for (var i = startIndex; i < endIndex; i++) {
        var row = results[0].values[i];
        //console.log(row);
        tableHTML += "<tr>";
        row.forEach(cell => { 
            tableHTML += "<td>" + cell + "</td>";
        });
        tableHTML += "</tr>";
    }
    tableHTML += "</tbody></table>";

    var recordsInfo = `Showing ${startIndex + 1}-${endIndex} of ${results[0].values.length} records`;
    tableHTML += `<div>${recordsInfo}</div>`;
    console.log(tableHTML)
    document.getElementById("outputContainer").innerHTML = tableHTML;

    var paginationHTML = "";
    var totalPages = Math.ceil(results[0].values.length / pageSize);
    for (var i = 1; i <= totalPages; i++) {
        paginationHTML += `<button onclick="changePage(${i})">${i}</button>`;
    }
    document.getElementById("gridPagination").innerHTML = paginationHTML;
}

function changePage(page) {
    currentPage = page;
    displayResults(resultsData); // Call displayResults to show the updated page
}

function clearError() {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = '';
}
  
function displayError(errorMessage) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error:</strong> ${errorMessage}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
}
  
  
function displaySuccess(successMessage, containerId) {
      const successContainer = document.getElementById(containerId);
      score += 1;
      document.getElementById('scoreContainer').innerText = score; // Update the score value in the navigation bar
      successContainer.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Success:</strong> ${successMessage}<br/>${querySuccess}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
      `;
}
// ********Start Quiz Button***********

function startQuiz(){
    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("startQuizCard").style.display = "none";
    document.getElementById("QuizInfo1").style.display = "block"

    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "none";
    document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";


    document.getElementById("QuizInfo1").style.display = "block";
    document.getElementById("QuizInfo2").style.display = "none";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "none";
    document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
}

function Question1(){
    // document.getElementById("QuizCard1").style.display = "block";
    // document.getElementById("startQuizCard").style.display = "none";
    // document.getElementById("QuizInfo1").style.display = "none"
    document.getElementById("startQuizCard").style.display = "none";

    document.getElementById("QuizCard1").style.display = "block";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "none";
    document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "none";
    document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    //document.getElementById("successQuizCard").style.display = "none";
}

function executeQuery1() {
    querySuccess = '';
    
  const AttributeDropdown = document.getElementById("AttributeDropdown").value;
  const StarDropdown = document.getElementById('FieldDropdown').value;
  const FromDropdown = document.getElementById('FromDropdown').value;
  try {
       if (!AttributeDropdown.trim() || !StarDropdown.trim() || !FromDropdown.trim()) {
          throw new Error('Please select options from the dropdowns');
        }

        const sqlQuery = `${AttributeDropdown} ${StarDropdown} FROM ${FromDropdown}`;
      
        querySuccess = sqlQuery;
        console.log(sqlQuery);
        query(sqlQuery, function (result) {
            displayResults(result);
            clearError();
            displaySuccess('Query executed successfully', 'successContainer1');
            
            document.getElementById("next").disabled = false;

        }, function (error) {
            displayError('Sorry, wrong answer');
            document.getElementById("next").disabled = true;

        });
  } catch (error) {
      displayError('Please select options from the dropdowns');
      document.getElementById("next").disabled = true;
  }
}

function Next1(){
    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "none";
    document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "block";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "none";
    document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    document.getElementById("startQuizCard").style.display = "none";

    document.getElementById("outputContainer").style.display = "none";
    document.getElementById("gridPagination").style.display = "none";

}

// ********************QUESTION 2*************************************************
function Question2(){
    // document.getElementById("QuizCard2").style.display = "block";
    // document.getElementById("startQuizCard").style.display = "none";
    // document.getElementById("QuizInfo2").style.display = "none"

    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("QuizCard2").style.display = "block";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "none";
    document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "none";
    document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";


    document.getElementById("startQuizCard").style.display = "none";

    document.getElementById("outputContainer").style.display = "none";
    document.getElementById("gridPagination").style.display = "none";
}

function executeQuery2() {
   querySuccess = '';

   const Q2AttributeDropdown = document.getElementById("Q2AttributeDropdown").value;
   const Q2StarDropdown = document.getElementById('Q2StarDropdown').value;
   const Q2FromDropdown = document.getElementById('Q2FromDropdown').value;
   const Q2TableDropdown = document.getElementById('Q2TableDropdown').value;
   const Q2ConditionTypeDropdown = document.getElementById('Q2ConditionTypeDropdown').value;
   const Q2ConditionCityDropdown2 = document.getElementById('Q2ConditionCityDropdown2').value;
   const Q2OrderByDropdown = document.getElementById('Q2OrderByDropdown').value;

  try {
       if (!Q2AttributeDropdown.trim() || !Q2StarDropdown.trim() || !Q2FromDropdown.trim()
        || !Q2TableDropdown.trim() || !Q2ConditionTypeDropdown.trim() || !Q2ConditionCityDropdown2.trim()
        || !Q2OrderByDropdown.trim()
        ) {
          throw new Error('Please select options from the dropdowns');
        }

        const sqlQuery = `${Q2AttributeDropdown} ${Q2StarDropdown} ${Q2FromDropdown} ${Q2TableDropdown} WHERE ${Q2ConditionTypeDropdown} ${Q2OrderByDropdown} ${Q2ConditionCityDropdown2} AND city = 'Fairfax';`;
        //const sqlQuery="Select * From crime_report WHERE date = '2023-04-01' ORDER BY type = 'missing' AND city = 'Fairfax';";
        console.log(sqlQuery);
        querySuccess = sqlQuery;
        //console.log(querySuccess);
        query(sqlQuery, function (result) {
            console.log(result);
            displayResults(result);
            clearError();
            displaySuccess('Query executed successfully', 'successContainer2');
            document.getElementById("next").disabled = false;
            document.getElementById("outputContainer").style.display = "block";
            document.getElementById("gridPagination").style.display = "block";

        }, function (error) {
            displayError('Sorry, wrong answer');
            document.getElementById("next").disabled = true;

        });
  } catch (error) {
      displayError('Please select options from the dropdowns');
      document.getElementById("next").disabled = true;

  }
}

function Next2(){
    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "none";
    document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none";
    document.getElementById("QuizInfo3").style.display = "block";
    document.getElementById("QuizInfo4").style.display = "none";
    document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    document.getElementById("startQuizCard").style.display = "none";

    document.getElementById("outputContainer").style.display = "none";
    document.getElementById("gridPagination").style.display = "none";
}

// *********QUESTION 3**************

function Question3(){
    // document.getElementById("QuizCard2").style.display = "block";
    // document.getElementById("startQuizCard").style.display = "none";
    // document.getElementById("QuizInfo2").style.display = "none"

    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "block";
    document.getElementById("QuizCard4").style.display = "none";
    document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "none";
    document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";


    document.getElementById("startQuizCard").style.display = "none";

    document.getElementById("outputContainer").style.display = "none";
    document.getElementById("gridPagination").style.display = "none";
}

function executeQuery3() {
    querySuccess = '';
    
  const Q3AttributeDropdown = document.getElementById("Q3AttributeDropdown").value;
  const Q3StarDropdown = document.getElementById('Q3StarDropdown').value;
  const Q3FromDropdown = document.getElementById('Q3FromDropdown').value;
  const Q3TableDropdown = document.getElementById('Q3TableDropdown').value;
  const Q3ConditionTypeDropdown = document.getElementById('Q3ConditionTypeDropdown').value;
  //const ConditionCityDropdown2 = document.getElementById('ConditionCityDropdown2').value;
  const Q3OrderByDropdown = document.getElementById('Q3OrderByDropdown').value;

  try {
       if (!Q3AttributeDropdown.trim() || !Q3StarDropdown.trim() || !Q3FromDropdown.trim()
        || !Q3TableDropdown.trim() || !Q3ConditionTypeDropdown.trim() || !Q3OrderByDropdown.trim()
        ) {
          throw new Error('Please select options from the dropdowns');
        }

        const sqlQuery = `${Q3AttributeDropdown} ${Q3StarDropdown} ${Q3FromDropdown} ${Q3TableDropdown} WHERE ${Q3ConditionTypeDropdown} 
                            ${Q3OrderByDropdown} AddressNumber DESC;
                             `;
      
        querySuccess = sqlQuery;
        console.log(querySuccess);
        query(sqlQuery, function (result) {
            displayResults(result);
            clearError();
            displaySuccess('Query executed successfully', 'successContainer3');
            document.getElementById("next").disabled = false;
            document.getElementById("outputContainer").style.display = "block";
            document.getElementById("gridPagination").style.display = "block";

        }, function (error) {
            displayError('Sorry, wrong answer');
            document.getElementById("next").disabled = true;

        });
  } catch (error) {
      displayError('Please select options from the dropdowns');
      document.getElementById("next").disabled = true;

  }
}

function Next3(){
    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "none";
    document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "block";
    document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";


    document.getElementById("startQuizCard").style.display = "none";

    document.getElementById("outputContainer").style.display = "none";
    document.getElementById("gridPagination").style.display = "none";
}

// *********QUESTION 4**************

function Question4(){
    // document.getElementById("QuizCard2").style.display = "block";
    // document.getElementById("startQuizCard").style.display = "none";
    // document.getElementById("QuizInfo2").style.display = "none"

    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "block";
    document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "none";
    document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";


    document.getElementById("startQuizCard").style.display = "none";

    document.getElementById("outputContainer").style.display = "none";
    document.getElementById("gridPagination").style.display = "none";
}

function executeQuery4() {
    querySuccess = '';
    
  const Q4AttributeDropdown = document.getElementById("Q4AttributeDropdown").value;
  const Q4StarDropdown = document.getElementById('Q4StarDropdown').value;
  const Q4FromDropdown = document.getElementById('Q4FromDropdown').value;
  const Q4TableDropdown = document.getElementById('Q4TableDropdown').value;
  const Q4ConditionTypeDropdown = document.getElementById('Q4ConditionTypeDropdown').value;
  const Q4ConditionTypeDropdown2 = document.getElementById('Q4ConditionTypeDropdown2').value;
  const Q4OrderByDropdown = document.getElementById('Q4OrderByDropdown').value;
  //alert("4");

  //alert("4.1")
  try {
       if (!Q4AttributeDropdown.trim() || !Q4StarDropdown.trim() || !Q4FromDropdown.trim()
        || !Q4TableDropdown.trim() || !Q4ConditionTypeDropdown.trim() || !Q4OrderByDropdown.trim()
        || !Q4ConditionTypeDropdown2.trim() 
        ) {
          throw new Error('Please select options from the dropdowns');
        }
        alert("4.2")
        const sqlQuery = `${Q4AttributeDropdown} ${Q4StarDropdown} ${Q4FromDropdown} ${Q4TableDropdown} WHERE ${Q4ConditionTypeDropdown} 
                            ${Q4OrderByDropdown} ${Q4ConditionTypeDropdown2};
                             `;
        console.log(sqlQuery);
        querySuccess = sqlQuery;
        console.log(querySuccess);
        query(sqlQuery, function (result) {
            displayResults(result);
            clearError();
            displaySuccess('Query executed successfully', 'successContainer4');
            document.getElementById("next").disabled = false;
            document.getElementById("outputContainer").style.display = "block";
            document.getElementById("gridPagination").style.display = "block";

        }, function (error) {
            displayError('Sorry, wrong answer');
            document.getElementById("next").disabled = true;

        });
  } catch (error) {
      displayError('Please select options from the dropdowns');
      document.getElementById("next").disabled = true;

  }
}

function Next4(){
    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "none";
    document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "none";
    document.getElementById("QuizInfo5").style.display = "block";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";


    document.getElementById("startQuizCard").style.display = "none";

    document.getElementById("outputContainer").style.display = "none";
    document.getElementById("gridPagination").style.display = "none";
}



// *********QUESTION 5**************

function Question5(){
    // document.getElementById("QuizCard2").style.display = "block";
    // document.getElementById("startQuizCard").style.display = "none";
    // document.getElementById("QuizInfo2").style.display = "none"
    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "none";
    document.getElementById("QuizCard5").style.display = "block";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "none";
    document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";


    document.getElementById("startQuizCard").style.display = "none";

    document.getElementById("outputContainer").style.display = "none";
    document.getElementById("gridPagination").style.display = "none";
}

function executeQuery5() {
    alert("5");
    querySuccess = '';
    
  const Q5AttributeDropdown = document.getElementById("Q5AttributeDropdown").value;
  const Q5WhereDropdown = document.getElementById('Q5WhereDropdown').value;
  const Q5FromDropdown = document.getElementById('Q5FromDropdown').value;
  const Q5TableDropdown = document.getElementById('Q5TableDropdown').value;
  const Q5ConditionTypeDropdown = document.getElementById('Q5ConditionTypeDropdown').value;
  const Q5ConditionTypeDropdown2 = document.getElementById('Q5ConditionTypeDropdown2').value;
  //const OrderByDropdown = document.getElementById('OrderByDropdown').value;
  console.log(Q5AttributeDropdown)
  console.log(Q5WhereDropdown)
  console.log(Q5FromDropdown)
  console.log(Q5TableDropdown)
  console.log(Q4ConditionTypeDropdown)
  console.log(Q4ConditionTypeDropdown2)
    alert("5.1")
  try {
       if (!Q5AttributeDropdown.trim() || !Q5WhereDropdown.trim() || !Q5FromDropdown.trim()
        || !Q5TableDropdown.trim() || !Q5ConditionTypeDropdown.trim() || !Q5ConditionTypeDropdown2.trim() 
        ) {
          throw new Error('Please select options from the dropdowns');
        }
        alert("5.2")
        const sqlQuery = `${Q5AttributeDropdown} * ${Q5FromDropdown} ${Q5TableDropdown} ${Q5WhereDropdown} ${Q5ConditionTypeDropdown} 
                            AND ${Q5ConditionTypeDropdown2};
                             `;
        console.log(sqlQuery);
        querySuccess = sqlQuery;
        console.log(querySuccess);
        query(sqlQuery, function (result) {
            displayResults(result);
            clearError();
            displaySuccess('Query executed successfully', 'successContainer5');
            document.getElementById("next").disabled = false;
            document.getElementById("outputContainer").style.display = "block";
            document.getElementById("gridPagination").style.display = "block";

        }, function (error) {
            displayError('Sorry, wrong answer');
            document.getElementById("next").disabled = true;

        });
  } catch (error) {
      displayError('Please select options from the dropdowns');
      document.getElementById("next").disabled = true;

  }
}

function Next5(){
    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "none";
    document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";

    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "none";
    document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "block";
    // document.getElementById("QuizInfo7").style.display = "none";
    // document.getElementById("QuizCard8").style.display = "none";


    document.getElementById("startQuizCard").style.display = "none";

    document.getElementById("outputContainer").style.display = "none";
    document.getElementById("gridPagination").style.display = "none";
}



