var mainContent = document.getElementById('main-content');

window.loadHomePage = function() {
    mainContent.innerHTML = `
    <div class="row justify-content-center mt-4">
    <div class="col-md-6">
        <div class="card bg-light mb-3">
            <div class="card-body">
            <h5 class="card-title">Start the Game</h5>
                <p id="demo" data-text="Are you ready to test your SQL skills and knowledge while we solve a thrilling mystery? Click the button below to start and let's see if you have what it takes to crack the case!"></p>
                <div class="d-flex justify-content-end">
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
      