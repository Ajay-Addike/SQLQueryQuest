window.onload = function() {
  var i = 0;
  var demo = document.getElementById("demo");
  var txt = demo.getAttribute("data-text"); // Get the text from the "data-text" attribute
  var speed = 7;

  function typeWriter() {
      if (i < txt.length) {
          demo.innerHTML += txt.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
      }
  }

  typeWriter();
};
