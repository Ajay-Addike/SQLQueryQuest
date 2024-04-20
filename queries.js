var mainContent = document.getElementById('main-content');
let score = 0;

window.loadHomePage = function() {
    mainContent.innerHTML = `
    <div class="row justify-content-center mt-4">
        <div class="col-md-6">
            <div class="card bg-light mb-3">
                <div class="card-body">
                    <h5 class="card-title">Start the Game</h5>
                    <p id="demo" data-text="Are you ready to test your SQL skills and knowledge while we solve a thrilling mystery? Click the button below to start and let's see if you have what it takes to crack the case!"></p>
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-success" onclick="query1()">Go!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    initTypewriter(); 
    };

window.query1 = function(){
    mainContent.innerHTML = `
    <div class="row justify-content-center mt-4">
        <div class="col-md-6">
            <div class="card bg-light mb-3">
                <div class="card-body">
                    <h5 class="card-title">Get the no of cases in the crime_report</h5>
                    <p>Select the options from the below represented dropdown to form a query</p>

                    <div class="row" id="check1">
                        <div class="col-md-3 mb-3">
                            <select class="custom-select" id="AttributeDropdown">
                                <option value="">Select SQL Query</option>
                                <option value="Select">Select</option>
                                <option value="Delete">Delete</option>
                                <option value="Insert">Insert</option>
                            </select>
                        </div>
                        <div class="col-md-3 mb-3">
                            <select class="custom-select" id="FieldDropdown">
                                <option value="">Select fields</option>
                                <option value="*">*</option>
                                <option value="count(*)">count(*)</option>
                            </select>
                        </div>
                        FROM
                        <div class="col-md-3 mb-3">
                            <select class="custom-select" id="FromDropdown">
                                <option value="">Select attribute</option>
                                <option value="crime_report">crime_report</option>
                                <option value="location">location</option>
                                <option value="person">person</option>
                            </select>
                        </div>
                    </div>


                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-success" onclick="executeQuery1()">Run!</button>
                        <button onclick="Next1()" id="next" class="btn btn-primary">Next Question</button>
                    </div>
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
};
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
function clearError() {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = '';
}
function changePage(page) {
    currentPage = page;
    displayResults(resultsData); // Call displayResults to show the updated page
}


function displayResults(results) {
    resultsData= results;
    console.log(results[0])
    pageSize = 5;
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

function displaySuccess(successMessage, containerId) {
    const successContainer = document.getElementById(containerId);
    score += 1;
    document.getElementById('scoreContainer').innerText = score; // Update the score value in the navigation bar
    successContainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success:</strong> ${successMessage}<br/>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
}

window.executeQuery1 = function(){
    const AttributeDropdown = document.getElementById("AttributeDropdown").value;
    const StarDropdown = document.getElementById('FieldDropdown').value;
    const FromDropdown = document.getElementById('FromDropdown').value;
    try{
        if (!AttributeDropdown.trim() || !StarDropdown.trim() || !FromDropdown.trim()) {
            throw new Error('Please select options from the dropdowns');
        }
        const sqlQuery = `${AttributeDropdown} ${StarDropdown} FROM ${FromDropdown}`;
        console.log(sqlQuery);
        query(sqlQuery, function (result) {
            displayResults(result);
            clearError();
            displaySuccess('Query executed successfully', 'successContainer');
            
            document.getElementById("next").disabled = false;

        });
    }
    catch (error) {
        displayError('Please select options from the dropdowns');
        document.getElementById("next").disabled = true;
    }
}

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

document.addEventListener("DOMContentLoaded", function() {
    loadHomePage(); // Initial load
    });


      