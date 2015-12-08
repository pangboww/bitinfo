/**
 * Created by pangboww on 05/12/15.
 */

/*
 * Call the function to built the chart when the template is rendered
 */
function setChart() {
    Chart.defaults.global.responsive = true;
}

function processData() {
    var data = Sell.find({}).fetch();

    var time = data.map(function(obj) {
        return moment(obj.time * 1000).format('hh:mm');
    });

    time.reverse();
    time.pop();

    var btcc = data.map(function(obj) {
       return obj.btcc;
    });
    btcc.reverse();
    btcc.pop();

    var huobi = data.map(function(obj) {
        return obj.huobi;
    });
    huobi.reverse();
    huobi.pop();

    return {
        time: time,
        btcc: btcc,
        huobi: huobi
    }
}

function drawChart(){
    var data = {
        labels : processData().time,
        //labels:[1,2,3],
        datasets : [
            {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: processData().huobi
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: processData().btcc
            }
        ]
    };

    //Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#myChart").get(0).getContext("2d");
    //This will get the first returned node in the jQuery collection.
    var myNewChart = new Chart(ctx);

    new Chart(ctx).Line(data);
}

function prt() {
    var c = Sell.find({}).count();
    console.log(c);
}

Template.hour.rendered = function() {
    setChart();
    Tracker.autorun(drawChart);
    Tracker.autorun(prt);
};