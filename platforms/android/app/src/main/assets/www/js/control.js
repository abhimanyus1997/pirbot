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
    host=prompt("Enter MQTT Server","enchantress");
    document.getElementById("motorStartBtn").addEventListener('touchend', function (ev) {
      cordova.plugins.CordovaMqTTPlugin.connect({
        url: "tcp://"+host, //a public broker used for testing purposes only. Try using a self hosted broker for production.
        port: 1883,
        clientId: "pirAppClient",
        success: function (s) {
          connect = true;
          console.log(JSON.stringify(s));
          alert("Motor Connected");
          /*  document.getElementById("connect").style.display = "none";
           document.getElementById("disconnect").style.display = "block";
           document.getElementById("activity").innerHTML += "--> Success: you are connected to, "+document.getElementById("url").value+":"+document.getElementById("port").value+"<br>" */
        },
        error: function (e) {
          connect = false;
          /*                     document.getElementById("activity").innerHTML += "--> Error: something is wrong,\n "+JSON.stringify(e)+"<br>";
                              document.getElementById("connect").style.display = "block";
                              document.getElementById("disconnect").style.display = "none"; */
          alert("ERROR:Motor Connection Error!");
          console.log(e);
        },
        onConnectionLost: function () {
          connect = false;
          /*                     document.getElementById("activity").innerHTML += "--> You got disconnected";
                              document.getElementById("connect").style.display = "block";
                              document.getElementById("disconnect").style.display = "none"; */
          alert("ERROR:Motor Connection Lost");
        }
      });
    });
    document.getElementById("motorStopBtn").addEventListener('touchend', function (e) {
      if (!connect) {
        alert("Error: Push Stop Motor Button");
      } else {
        cordova.plugins.CordovaMqTTPlugin.publish({
          topic: "esp32/control",
          payload: "w-" + document.getElementById("pwmRange").value + "-0",
          qos: 0,
          retain: false,
          success: function (s) {
            /* document.getElementById("activity").innerHTML += "--> Success: you have published to the topic, "+document.getElementById("topic_sub").value+"<br>"; */
          },
          error: function (e) {
            /* document.getElementById("activity").innerHTML += "--> Error: something is wrong, "+e+"<br>"; */
            alert("Error: Unable to Send Commands");
            console.log(e);
          }
        });

        //DISCONNECT AFTER STOPPING
        cordova.plugins.CordovaMqTTPlugin.disconnect({
          success: function (s) {
            connect = false;
            /*   document.getElementById("connect").style.display = "block";
              document.getElementById("disconnect").style.display = "none";
              document.getElementById("activity").innerHTML += "--> Success: you are now disconnected"+"<br>" */
            alert("Motor Disconnected");
          },
          error: function (e) {
            /*                 document.getElementById("activity").innerHTML += "--> Error: something is wrong, "+e+"<br>";
                            document.getElementById("connect").style.display = "none";
                            document.getElementById("disconnect").style.display = "block"; */
            alert("ERROR: Motor Disconnection Error");
            console.log(e);
          }
        });

      }
    });

    /*         document.getElementById("subscribe").addEventListener('touchend',function(ev){
                if (!connect) {
                  alert("First establish connection then try to subscribe");
                } else {
                  cordova.plugins.CordovaMqTTPlugin.subscribe({
                    topic:document.getElementById("topic_sub").value,
                    qos:0,
                    success:function(s){
                      document.getElementById("subscribe").style.display = "none";
                      document.getElementById("unsubscribe").style.display = "block";
                      document.getElementById("activity").innerHTML += "--> Success: you are subscribed to the topic, "+document.getElementById("topic_sub").value+"<br>";
                      //get your payload here
                      //Deprecated method
                      document.addEventListener(document.getElementById("topic_sub").value,function (e) {
                          e.preventDefault();

                          document.getElementById("activity").innerHTML += "--> Payload for"+e.topic+" topic: "+JSON.stringify(e.payload)+"<br>";
                      });

                      cordova.plugins.CordovaMqTTPlugin.listen(document.getElementById("topic_sub").value,function (payload,params,topic,topic_pattern) {
                          //params will be an empty object if topic pattern is NOT used. 
                          document.getElementById("activity").innerHTML += "--> Payload for"+topic+" topic: "+JSON.stringify(payload)+"<br>";
                      });
                    },
                    error:function(e){
                      document.getElementById("activity").innerHTML += "--> Error: something is wrong when subscribing to this topic, "+e+"<br>";
                      document.getElementById("subscribe").style.display = "block";
                      document.getElementById("unsubscribe").style.display = "none";
                      //alert("err!! something is wrong. check the console")
                      console.log(e);
                    }
                  });
                }
            });
            document.getElementById("unsubscribe").addEventListener('touchend',function(ev){
                cordova.plugins.CordovaMqTTPlugin.unsubscribe({
                  topic:document.getElementById("topic_sub").value,
                  success:function(s){
                    document.removeEventListener(document.getElementById("topic_sub").value);
                    document.getElementById("unsubscribe").style.display = "none";
                    document.getElementById("subscribe").style.display = "block";
                    document.getElementById("activity").innerHTML += "--> Success: you are unsubscribed to the topic, "+document.getElementById("topic_sub").value+"<br>";
                    document.getElementById("topic_sub").value = "";
                  },
                  error:function(e){
                    document.getElementById("activity").innerHTML += "--> Error: something is wrong, "+e+"<br>";
                    document.getElementById("subscribe").style.display = "block";
                    document.getElementById("unsubscribe").style.display = "none";
                    //alert("err!! something is wrong. check the console")
                    console.log(e);
                  }
                });
            }); */


    //FWD Button
    document.getElementById("fwdBtn").addEventListener('touchend', function (ev) {
      if (!connect) {
        alert("Error: Push Start Motor Button");
      } else {
        cordova.plugins.CordovaMqTTPlugin.publish({
          topic: "esp32/control",
          payload: "w-" + document.getElementById("pwmRange").value + "-1",
          qos: 0,
          retain: false,
          success: function (s) {
            /* document.getElementById("activity").innerHTML += "--> Success: you have published to the topic, "+document.getElementById("topic_sub").value+"<br>"; */
          },
          error: function (e) {
            /* document.getElementById("activity").innerHTML += "--> Error: something is wrong, "+e+"<br>"; */
            alert("Error: Unable to Send Commands");
            console.log(e);
          }
        });
      }
    });

    //BWD Button
    document.getElementById("bckBtn").addEventListener('touchend', function (ev) {
      if (!connect) {
        alert("Error: Push Start Motor Button");
      } else {
        cordova.plugins.CordovaMqTTPlugin.publish({
          topic: "esp32/control",
          payload: "s-" + document.getElementById("pwmRange").value + "-1",
          qos: 0,
          retain: false,
          success: function (s) {
            /* document.getElementById("activity").innerHTML += "--> Success: you have published to the topic, "+document.getElementById("topic_sub").value+"<br>"; */
          },
          error: function (e) {
            /* document.getElementById("activity").innerHTML += "--> Error: something is wrong, "+e+"<br>"; */
            alert("Error: Unable to Send Commands");
            console.log(e);
          }
        });
      }
    });


    console.log('Received Event: ' + id);
  },
  append: function (id, s) {
    // it is just a string append function. Nothing to do with the MQTT functions
    var node = document.createElement("p"); // Create a <li> node
    var textnode = document.createTextNode(s); // Create a text node
    node.appendChild(textnode); // Append the text to <li>
    document.getElementById(id).appendChild(node); // Append <li> to <ul> with id="myList"
  }
};

app.initialize();