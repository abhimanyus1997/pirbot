/* $(document).ready(function(){
    var opts = {
        angle: 0.01, /// The span of the gauge arc
        lineWidth: 0.44, // The line thickness
        radiusScale: 1, 
        pointer: {
            length: 0.65, // Relative to gauge radius
            strokeWidth: 0.025, // The thickness
            color: '#333333'// Fill color
        },
        colorStart: '#6FADCF', // Colors
        colorStop: '#00695c', // just experiment with them
        strokeColor: '#E0E0E0', // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,     // High resolution support
    };
    var target = document.getElementById('foo'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create gauge!
    gauge.maxValue = 3000; // set max gauge value
    gauge.setMinValue(0); // set min value
    gauge.set(1250); // set actual value
 
 

});
 */