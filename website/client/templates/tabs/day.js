/**
 * Created by pangboww on 05/12/15.
 */

function setChart() {
    Chart.defaults.global.responsive = true;
}

function drawChart(){
    var data = {
        labels : Btcc.find({"time":1}),
        datasets : [
            {
                label: "BTCC",
                fillColor : "rgba(220,220,220,0.5)",
                strokeColor : "rgba(220,220,220,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                data : Btcc.find({"sell":1})
            },
            {
                label: "Huobi",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: Btcc.find({"sell":1})
            }
        ]
    };

    //Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#myChart").get(0).getContext("2d");
    //This will get the first returned node in the jQuery collection.
    var myNewChart = new Chart(ctx);

    new Chart(ctx).Line(data);
}


/*
 * Call the function to built the chart when the template is rendered
 */
Template.day.rendered = function() {
    setChart();
    Tracker.autorun(drawChart());
};