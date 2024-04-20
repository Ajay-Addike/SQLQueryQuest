var mainContent = document.getElementById('main-content');

window.loadHomePage = function() {
mainContent.innerHTML = `
    <div class="row justify-content-center mt-4">
    <div class="col-md-6">
        <div class="card bg-light mb-3">
        <div class="card-body">
            <p id="demo" class="card-text" data-text="SQL Mystery is a casual game where players learn and practice SQL by solving puzzles. In the game, players take on the role of a detective tasked with solving a series of mysteries by querying a database. To succeed, players must use their SQL skills to find clues, uncover hidden information, and identify patterns."></p>
            <p class="text-danger text-center">Let's see how good you are at SQL</p>
            <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-success" onclick="loadStoryPage()">Go!</button>
            </div>
            
        </div>
        </div>
    </div>
    </div>
`;
initTypewriter(); 
};

window.loadStoryPage = function() {
    mainContent.innerHTML = `
        <div class="row justify-content-center mt-4">
            <div class="col-md-6">
                <div class="card bg-light mb-3">
                    <div class="card-body">
                        <div class="card-header">Story</div>
                        <p id="demo" data-text="Adrian Bell, CTO of a large technology company was found to be missing after a Gala event on April 1st, 2023, prompting an urgent police investigation. As a Detective You are given access to the crime reports and other related databases to find the culprit."></p>
                        <div class="d-flex justify-content-between">
                            <button type="button" class="btn btn-danger" onclick="loadHomePage()">Go Back</button>
                            <button type="button" class="btn btn-success" onclick="loadHomePage()">Go!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    initTypewriter(); 
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

document.addEventListener("DOMContentLoaded", function() {
    loadHomePage(); // Initial load
  });
  