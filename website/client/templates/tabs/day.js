/**
 * Created by pangboww on 05/12/15.
 */

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

function builtArea() {

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
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },

        yAxis: {
            title: {
                text: 'Price: RMB'
            }
        },

        tooltip: {
            pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
        },

        plotOptions: {
            area: {
                pointStart: 1940,
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
Template.day.rendered = function() {
    Tracker.autorun(builtArea);
};