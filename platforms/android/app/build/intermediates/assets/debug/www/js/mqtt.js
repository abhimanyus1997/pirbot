console.log("\nMQTT SCRIPT:Loading");
$(function() {
    console.log("\n******\n***********\n*****************");
    console.log("MQTT loaded\n");

    $( "#mqtt_start" ).click(function() {
        console.log( "MQTT-> Connecting\n" );
        console.log( "MQTT-> Initializing Connection\n" );
        connectMe();
        

      });


    $( "#mqtt_send" ).click(function() {
        console.log( "Sent\n" );
    });


    $( "#mqtt_stop" ).click(function() {
        console.log( "Disconnected\n" );
    });

    function connectMe(){
        
    }
});
