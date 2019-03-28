function streaming(){
    var stream_serverIP = $('#hostip').val();
    var stream_port = $('#cam_port').val();
    var stream_address = 'http://' + stream_serverIP +':'+stream_port+'/stream/video.mjpeg';
    console.log("Streaming Address changed to "+stream_address);
    $("#streamImg").attr("src", stream_address);
}