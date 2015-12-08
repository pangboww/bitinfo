/**
 * Created by pangboww on 03/12/15.
 */

Meteor.publish('btcc_all', function(options){

    return Btcc.find({}, options);
});

Meteor.publish('btcc_hour', function(options){
    options.limit = 60;
    return Btcc.find({}, options);
});

Meteor.publish('btcc_day', function(options){
    options.limit = 60 * 24;
    return Btcc.find({}, options);
});

Meteor.publish('btcc_week', function(options){
    options.limit = 60 * 24 * 7;
    return Btcc.find({}, options);
});

Meteor.publish('huobi_all', function(options){
    return Huobi.find({}, options);
});

Meteor.publish('huobi_hour', function(options){
    options.limit = 60;
    return Huobi.find({}, options);
});

Meteor.publish('huobi_day', function(options){
    options.limit = 60 * 24;
    return Huobi.find({}, options);
});

Meteor.publish('huobi_week', function(options){
    options.limit = 60 * 24 * 7;
    return Huobi.find({}, options);
});

Meteor.publish('sell', function(options){
    options.limit = 60;
    return Sell.find({}, options);
});