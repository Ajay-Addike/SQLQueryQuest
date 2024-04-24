var mainContent = document.getElementById("main-content");

window.loadHomePage = function () {
  mainContent.innerHTML = `
    <div class="row justify-content-center mt-4">
    <div class="col-md-6">
        <div class="card bg-light mb-3">
        <div class="card-body">
            <p id="demo" class="card-text" data-text="SQL Mystery is a game where players learn and practice SQL by solving a mystery. Take on the role of a detective to solve a mystery by querying a database. To succeed, you must use your SQL skills to find clues, uncover hidden information, and identify patterns."></p>
            <p class="text-danger text-center">Let's see how good you are at SQL .</p>
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

window.loadStoryPage = function () {
  mainContent.innerHTML = `
        <div class="row justify-content-center mt-4">
            <div class="col-md-6">
                <div class="card bg-light mb-3">
                    <div class="card-body">
                        <div class="card-header">Story</div>
                        <p id="demo" class="card-text" data-text="Adrian Bell, the CTO of a large technology company, was found to be missing after a gala event on April 1st, 2023, prompting an urgent police investigation. It has been three weeks, and there is no clue about Mr. Bell's whereabouts. The police have escalated the case to you. As a detective, you are now given access to the crime reports and other related databases to find the culprit."></p>
                        <div class="d-flex justify-content-between">
                            <button type="button" class="btn btn-success" onclick="loadHomePage()">Go Back</button>
                            <button type="button" class="btn btn-success" onclick="loadReportsPage()">
                            Get Reports !
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  initTypewriter();
};

window.loadReportsPage = function () {
  mainContent.innerHTML = `
    <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="img/Table1.png" class="d-block w-100" alt="Slide 1" />
            </div>

            <div class="carousel-item">
              <img src="img/Table2.png" class="d-block w-100" alt="Slide 2" />
            </div>

            <div class="carousel-item">
              <img src="img/Table3.png" class="d-block w-100" alt="Slide 4" />
            </div>

            <div class="carousel-item">
              <img src="img/Table4.png" class="d-block w-100" alt="Slide 3" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true">
            </span>
            <span class="visually-hidden"> Previous </span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true">
            </span>
            <span class="visually-hidden"> Next </span>
          </button>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between">
                            <button type="button" class="btn btn-success" onclick="loadStoryPage()">Go Back</button>
                            <button type="button" class="btn btn-success">
                            <a href="queries.html">
                            Go!
                            </a>
                            </button>
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

document.addEventListener("DOMContentLoaded", function () {
  loadHomePage(); // Initial load
});
