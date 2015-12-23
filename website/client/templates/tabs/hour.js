/**
 * Created by pangboww on 05/12/15.
 */

function processData(n) {
    n = n !== undefined ?  n : 0;

    var options = {};
    options.sort = {time: 1};


    if (Sell.findOne({}) == undefined){
        return {
            btcc: [],
            huobi: []
        };
    }
    var end = Sell.findOne({}).time - n * 60 * 60;
    var begin = end - 60 * 60;

    var data = Sell.find({time: {$gte: begin, $lt:end}}, options).fetch();
    console.log(data);

    var btcc = data.map(function(obj) {
        return [obj.time*1000, obj.btcc];
    });

    var huobi = data.map(function(obj) {
        return [obj.time*1000, obj.huobi];
    });

    return {
        btcc: btcc,
        huobi: huobi
    }
}

function builtArea() {
    console.log("build");

    $('#price-area').highcharts({

        chart: {
            type: 'spline'
        },

        title: {
            text: 'BTCC and Huobi Selling Price'
        },

        credits: {
            enabled: false
        },

        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%b %e',
                week: '%b %e'
            },
            title: {
                text: 'Time'
            }
        },

        yAxis: {
            title: {
                text: 'Price: RMB'
            }
        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: 'Price: {point.y:.2f}<br>Time: {point.x:%H:%M}'

        },

        plotOptions: {
            area: {
                pointStart: 0,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },

        series: [{
            name: 'BTCC',
            data: processData().btcc
        }, {
            name: 'Huobi',
            data: processData().huobi
        }]
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.hour.rendered = function() {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    console.log("start!");
    Tracker.autorun(builtArea);
};