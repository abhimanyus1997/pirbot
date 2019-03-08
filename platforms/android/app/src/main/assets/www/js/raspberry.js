var connect = false;
var app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function () {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    document.getElementById("connect_btn").addEventListener('click', function (ev) {
      //RANDOM CLIENT_ID GENERATOR
      if (document.getElementById("client_txt").value == "") {
        client_userID = "pirAppID-"+Math.floor((Math.random() * 100) + 1);
      } else {
        client_userID = document.getElementById("client_txt").value;
      }

      //CONNECTION EVT
      cordova.plugins.CordovaMqTTPlugin.connect({
        url: "tcp://" + document.getElementById("ip_txt").value, //a public broker used for testing purposes only. Try using a self hosted broker for production.
        port: document.getElementById("port_txt").value,
        clientId: client_userID,
        success: function (s) {
          connect = true;
          console.log(JSON.stringify(s));
          document.getElementById("connect_btn").style.display = "none";
          document.getElementById("disconnect_btn").style.display = "block";
          alert("Connection Successful \n\t MQTT Address: mqtt://" + document.getElementById("ip_txt").value + ":" + document.getElementById("port_txt").value+"\n\tClientID: "+client_userID);
          receivemydata();
        },
        error: function (e) {
          connect = false;
          alert("--> Error: something is wrong,\n " + JSON.stringify(e) + "<br>");
          document.getElementById("connect_btn").style.display = "block";
          document.getElementById("disconnect_btn").style.display = "none";
          alert("err!! something is wrong. check the console")
          console.log(e);
        },
        onConnectionLost: function () {
          connect = false;
          alert("--> You got disconnected");
          document.getElementById("connect_btn").style.display = "block";
          document.getElementById("disconnect_btn").style.display = "none";
        }
      });

      //PUBLISHING DATA ON SUCCESSFUL CONNECTION to "test" topic
      function sendmydata() {
        if (!connect) {
          alert("First establish connection then try to publish")
        } else {
          cordova.plugins.CordovaMqTTPlugin.publish({
            topic: "test",
            payload: "Data sent via App",
            qos: 0,
            retain: false,
            success: function (s) {
              alert("Success: you have published to the topic, " + "test" + "<br>");
            },
            error: function (e) {
              alert("--> Error: something is wrong, " + e + "<br>")
              console.log(e);
            }
          });
        }
      }

      //SUBSCRIBING TO TOPIC "rpi/data"
      function receivemydata(ev) {
        //creating null gauge
        var opts = {
          angle: 0.01, /// The span of the gauge arc
          lineWidth: 0.44, // The line thickness
          radiusScale: 1, 
          pointer: {
              length: 0.65, // Relative to gauge radius
              strokeWidth: 0.025, // The thickness
              color: '#333333'// Fill color
          },
          limitMax: 100,
          colorStart: '#6FADCF', // Colors
          colorStop: '#00695c', // just experiment with them
          strokeColor: '#E0E0E0', // to see which ones work best for you
          generateGradient: true,
          highDpiSupport: true,     // High resolution support
      };
      var target = document.getElementById('foo'); // your canvas element
      var gauge = new Gauge(target).setOptions(opts); // create gauge!
      gauge.maxValue = 50 ; // set max gauge value
      gauge.setMinValue(20); // set min value
      gauge.set(20); // set actual value

        alert("Subscribing");
        if (!connect) {
          alert("First establish connection then try to subscribe");
        } else {
          cordova.plugins.CordovaMqTTPlugin.subscribe({
            topic: "rpi/data",
            qos: 0,
            success: function (s) {
              alert("Subscribed");
              console.log("--> Success: you are subscribed to the topic, rpi/data \n");
              //get your payload here
              //MESAGE RECIVING
              cordova.plugins.CordovaMqTTPlugin.listen("rpi/data", function (payload, params, topic, topic_pattern) {
                //params will be an empty object if topic pattern is NOT used. 
                console.log("Receiving Payload Value: " + payload);
                document.getElementById("activity").innerHTML =  payload;
                document.getElementById("cpu_temp_txt").innerHTML =  payload+" &#8451;";
                gauge.set(payload)
              });
            },
            error: function (e) {
              document.getElementById("activity").innerHTML += "--> Error: something is wrong when subscribing to this topic, " + e + "<br>";
              alert("Receiving Failure")
              console.log(e);
            }
          });
        }
      }











    });

    /*  //DISCONNECT EVT
     document.getElementById("disconnect_btn").addEventListener('touchend', function (e) {
       document.getElementById("connect_btn").style.display = "block";
       document.getElementById("disconnect_btn").style.display = "none";
       cordova.plugins.CordovaMqTTPlugin.disconnect({
         success: function (s) {
           connect = false;
           document.getElementById("connect_btn").style.display = "block";
           document.getElementById("disconnect_btn").style.display = "none";
           alert("--> Success: you are now disconnected" + "<br>");
         },
         error: function (e) {
           alert("--> Error: something is wrong, " + e + "<br>");
           document.getElementById("connect_btn").style.display = "none";
           document.getElementById("disconnect_btn").style.display = "block";
           //alert("err!! something is wrong. check the console")
           console.log(e);
         }
       });
     }); */
  }
};


app.initialize();



/* // example.js file
// Wait for device API libraries to load
//
function onLoad() {
  alert("onLoad evt");
  console.log("Event Triggered: onLoad");
  document.addEventListener("deviceready", onDeviceReady, false);
  document.addEventListener("backbutton", onBackKeyDown, false);
  document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
}

// device APIs are available
//
function onDeviceReady() {
  alert("app ready");
  console.log("Event Triggered: DeviceReady");
  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
  document.addEventListener("menubutton", onMenuKeyDown, false);
  document.addEventListener("backbutton", onBackKeyDown, false);
  document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
  document.getElementById("connect").addEventListener('touchend',onMqttBtnClick());

  function onMqttBtnClick(){
    alert("Btn CLick");
    console.log("MQTT Connection Initiated");
  
    ip = document.getElementById('ip_txt').Value;
  }
  // Add similar listeners for other events
}




function onPause() {
  alert("app paused");
  console.log("Event Triggered: Paused");
  // Handle the pause event
}

function onResume() {
  alert("app resume");
  console.log("Event Triggered: Resume");
  // Handle the resume event
}

function onVolumeUpKeyDown() {
  alert("app onVolumeUpKeyDown");
  console.log("Event Triggered: onVolumeUpKeyDown Evt");
  // Handle the menubutton event
}

function onMenuKeyDown() {
  alert("app menubutton");
  console.log("Event Triggered: Menukey Evt");
  // Handle the menubutton event
}

function onBackKeyDown() {
  alert("app Backbutton presseed");
  console.log("Event Triggered: Backbutton Evt");
  // Handle the menubutton event
}

// Add similar event handlers for other events */