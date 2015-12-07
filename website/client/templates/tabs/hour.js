/**
 * Created by pangboww on 05/12/15.
 */

function builtArea() {

    $('#container-area').highcharts({

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
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
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

        data: {
            table: 'datatable'
        }
    });
}


/*
 * Call the function to built the chart when the template is rendered
 */
Template.hour.rendered = function() {
    builtArea();
};