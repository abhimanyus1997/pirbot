$(document).ready(function () {
  var slider = document.getElementById("pwmRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function () {
    output.innerHTML = this.value;
    $('#pwmRange').tooltip({
      title: this.value
    });
    $('#pwmRange').tooltip('update');
  };
});



/* var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'PIR Control Board',
    // App id
    id: 'com.abhimanyus1997.pir',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
    ],
    // ... other parameters
  });
  
  var mainView = app.views.create('.view-main'); */