const Hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    Hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));
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
    document.getElementById("QuizInfo1").style.display = "none"
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

// ********Start Quiz Button***********

function startQuiz(){
    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("startQuizCard").style.display = "none";
    document.getElementById("QuizInfo1").style.display = "block"
}

function Question1(){
    document.getElementById("QuizCard1").style.display = "block";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "none";
    // document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
 
    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "none";
    // document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
 
    document.getElementById("startQuizCard").style.display = "none";
   
}
 
function Next1(){
    document.getElementById("QuizCard1").style.display = "none";
    document.getElementById("QuizCard2").style.display = "none";
    document.getElementById("QuizCard3").style.display = "none";
    document.getElementById("QuizCard4").style.display = "none";
    // document.getElementById("QuizCard5").style.display = "none";
    // document.getElementById("QuizCard6").style.display = "none";
    // document.getElementById("QuizCard7").style.display = "none";
 
    document.getElementById("QuizInfo1").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "block";
    document.getElementById("QuizInfo3").style.display = "none";
    document.getElementById("QuizInfo4").style.display = "none";
    // document.getElementById("QuizInfo5").style.display = "none";
    // document.getElementById("QuizInfo6").style.display = "none";
    // document.getElementById("QuizInfo7").style.display = "none";
 
    document.getElementById("startQuizCard").style.display = "none";
}
 


// DISPLAY RESULT
function displayResults(results) {
    resultsData= results;
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize, results[0].values.length);
    var tableHTML = "<table class='table table-bordered mt-3'>";
    tableHTML += "<thead><tr>";
    results[0].columns.forEach(column => {
        tableHTML += "<th>" + column + "</th>";
    });
    tableHTML += "</tr></thead><tbody>";
    for (var i = startIndex; i < endIndex; i++) {
        var row = results[0].values[i];
        tableHTML += "<tr>";
        row.forEach(cell => { 
            tableHTML += "<td>" + cell + "</td>";
        });
        tableHTML += "</tr>";
    }
    tableHTML += "</tbody></table>";

    var recordsInfo = `Showing ${startIndex + 1}-${endIndex} of ${results[0].values.length} records`;
    tableHTML += `<div>${recordsInfo}</div>`;

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

function executeQuery() {
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
        // console.log(query1);
        query(sqlQuery, function (result) {
            displayResults(result);
            clearError();
            displaySuccess('Query executed successfully', 'successContainer');
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

// ***************

function Question2(){
    document.getElementById("QuizCard2").style.display = "block";
    document.getElementById("startQuizCard").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none"
}

function executeQuery2() {
    querySuccess = '';
    
  const AttributeDropdown = document.getElementById("AttributeDropdown").value;
  const StarDropdown = document.getElementById('StarDropdown').value;
  const FromDropdown = document.getElementById('FromDropdown').value;
  const TableDropdown = document.getElementById('TableDropdown').value;
  const ConditionTypeDropdown = document.getElementById('ConditionTypeDropdown').value;
  const ConditionCityDropdown2 = document.getElementById('ConditionCityDropdown2').value;
  const OrderByDropdown = document.getElementById('OrderByDropdown').value;

  try {
       if (!AttributeDropdown.trim() || !StarDropdown.trim() || !FromDropdown.trim()
        || !TableDropdown.trim() || !ConditionTypeDropdown.trim() || !ConditionCityDropdown2.trim()
        || !OrderByDropdown.trim()
        ) {
          throw new Error('Please select options from the dropdowns');
        }

        const sqlQuery = `${AttributeDropdown} ${StarDropdown} ${FromDropdown} ${TableDropdown} WHERE ${ConditionTypeDropdown} 
                            ${OrderByDropdown} ${ConditionCityDropdown2} AND city = 'Fairfax'; 
                             `;
      
        querySuccess = sqlQuery;
        console.log(query1);
        query(sqlQuery, function (result) {
            displayResults(result);
            clearError();
            displaySuccess('Query executed successfully', 'successContainer');
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

// *********QUESTION 3**************

function Question3(){
    document.getElementById("QuizCard2").style.display = "block";
    document.getElementById("startQuizCard").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none"
}

function executeQuery3() {
    querySuccess = '';
    
  const AttributeDropdown = document.getElementById("AttributeDropdown").value;
  const StarDropdown = document.getElementById('StarDropdown').value;
  const FromDropdown = document.getElementById('FromDropdown').value;
  const TableDropdown = document.getElementById('TableDropdown').value;
  const ConditionTypeDropdown = document.getElementById('ConditionTypeDropdown').value;
  //const ConditionCityDropdown2 = document.getElementById('ConditionCityDropdown2').value;
  const OrderByDropdown = document.getElementById('OrderByDropdown').value;

  try {
       if (!AttributeDropdown.trim() || !StarDropdown.trim() || !FromDropdown.trim()
        || !TableDropdown.trim() || !ConditionTypeDropdown.trim() || !OrderByDropdown.trim()
        ) {
          throw new Error('Please select options from the dropdowns');
        }

        const sqlQuery = `${AttributeDropdown} ${StarDropdown} ${FromDropdown} ${TableDropdown} WHERE ${ConditionTypeDropdown} 
                            ${OrderByDropdown} AddressNumber DESC;
                             `;
      
        querySuccess = sqlQuery;
        console.log(query1);
        query(sqlQuery, function (result) {
            displayResults(result);
            clearError();
            displaySuccess('Query executed successfully', 'successContainer');
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

// *********QUESTION 4**************

function Question3(){
    document.getElementById("QuizCard2").style.display = "block";
    document.getElementById("startQuizCard").style.display = "none";
    document.getElementById("QuizInfo2").style.display = "none"
}

function executeQuery4() {
    querySuccess = '';
    
  const AttributeDropdown = document.getElementById("AttributeDropdown").value;
  const StarDropdown = document.getElementById('StarDropdown').value;
  const FromDropdown = document.getElementById('FromDropdown').value;
  const TableDropdown = document.getElementById('TableDropdown').value;
  const ConditionTypeDropdown = document.getElementById('ConditionTypeDropdown').value;
  const ConditionCityDropdown2 = document.getElementById('ConditionCityDropdown2').value;
  const OrderByDropdown = document.getElementById('OrderByDropdown').value;

  try {
       if (!AttributeDropdown.trim() || !StarDropdown.trim() || !FromDropdown.trim()
        || !TableDropdown.trim() || !ConditionTypeDropdown.trim() || !OrderByDropdown.trim()
        || !ConditionTypeDropdown2.trim() 
        ) {
          throw new Error('Please select options from the dropdowns');
        }

        const sqlQuery = `${AttributeDropdown} ${StarDropdown} ${FromDropdown} ${TableDropdown} WHERE ${ConditionTypeDropdown} 
                            ${OrderByDropdown} ${!ConditionTypeDropdown};
                             `;
      
        querySuccess = sqlQuery;
        console.log(query1);
        query(sqlQuery, function (result) {
            displayResults(result);
            clearError();
            displaySuccess('Query executed successfully', 'successContainer');
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

function clearError() {
  const errorContainer = document.getElementById('errorContainer');
  errorContainer.innerHTML = '';
}

