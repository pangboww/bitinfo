/**
 * Created by pangboww on 05/12/15.
 */

function processData(hourBefore) {
    var options = {};
    options.sort = {time: 1};


    if (Sell.findOne({}) == undefined){
        return {
            btcc: [],
            huobi: []
        };
    }
    var end = Sell.findOne({}).time - hourBefore * 60 * 60;
    var begin = end - 60 * 60;

    var data = Sell.find({time: {$gte: begin, $lt:end}}, options).fetch();

    var btcc = data.map(function(obj) {
        return [obj.time*1000, obj.btcc !== undefined ? obj.btcc : obj.huobi];
    });

    var huobi = data.map(function(obj) {
        return [obj.time*1000, obj.huobi !== undefined ? obj.huobi : obj.btcc];
    });

    return {
        btcc: btcc,
        huobi: huobi
    }
}

function buildArea(hourBefore) {
    console.log("build");
    console.log(hourBefore);

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
            data: processData(hourBefore).btcc
        }, {
            name: 'Huobi',
            data: processData(hourBefore).huobi
        }]
    });
}



/*
 * Call the function to built the chart when the template is rendered
 */
Template.hour.created = function() {
    this.hourBefore = new ReactiveVar(0);
    this.buildArea = buildArea(this);
};

Template.hour.rendered = function() {
    var self = this;
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    console.log("start!");
    self.autorun(function(){
        buildArea(self.hourBefore.get());
    });
};

Template.hour.events({
    'click #previous': function(e, t){
        e.preventDefault();
        t.hourBefore.set(t.hourBefore.get() + 1);
        console.log(t.hourBefore.get());
        console.log("previous");
    },
    'click #now': function(e, t){
        e.preventDefault();
        t.hourBefore.set(0);
        console.log("now");
    },
    'click #after': function(e, t){
        e.preventDefault();
        if(t.hourBefore.get() > 0) {
            t.hourBefore.set(t.hourBefore.get() - 1);
        }
        console.log("after");
    }
});