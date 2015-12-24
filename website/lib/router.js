/**
 * Created by pangboww on 03/12/15.
 */

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

bitinfoListController = RouteController.extend({
    template: 'btccList',
    sort: {date: -1},
    findOptions: function() {
        return {sort: this.sort};
    },
    btcc: function(){
        return Btcc.find({}, this.findOptions());
    },
    huobi: function(){
        return Huobi.find({}, this.findOptions());
    },
    subscriptions: function() {
        this.btccSub = Meteor.subscribe('btcc_hour', this.findOptions());
        this.huobiSub = Meteor.subscribe('huobi_hour', this.findOptions());
    },
    data: function() {
        var self = this;
        return {
            btcc: self.btcc(),
            huobi: self.huobi()
        };
    }
});

bitinfoBasicController = RouteController.extend({
    findOptions: function() {
        return {
            sort: {date: -1},
            fields: {
                'date': 1,
                'sell': 1
            }
        };
    },
    btccData: function() {
        return Btcc.find({}, this.findOptions());
    },
    huobiData: function() {
        return Huobi.find({}, this.findOptions());
    },
    data: function() {
        var self = this;
        return {
                btccData: self.btccData(),
                huobiData: self.huobiData()
            }

    }
});

bitinfoDayController = bitinfoBasicController.extend({
    template: 'day',
    subscriptions: function() {
        this.btccSub = Meteor.subscribe('btcc_day', this.findOptions());
        this.huobiSub = Meteor.subscribe('huobi_day', this.findOptions());
    }
});

bitinfoWeekController = bitinfoBasicController.extend({
    template: 'week',
    subscriptions: function() {
        this.btccSub = Meteor.subscribe('btcc_week', this.findOptions());
        this.huobiSub = Meteor.subscribe('huobi_week', this.findOptions());
    }
});

bitinfoHourController = RouteController.extend({
    template: 'hour',
    sort: {time: -1},
    findOptions: function() {
        return {sort: this.sort};
    },
    subscriptions: function() {
        this.sellSub = Meteor.subscribe('sell', this.findOptions());
    }
});

Router.route('/', {
    name: 'home',
    controller: bitinfoListController
});

Router.route('/hour', {
    name: 'hour',
    controller: bitinfoHourController
});

Router.route('/day', {
    name: 'day',
    controller: bitinfoHourController
});

Router.route('/week', {
    name: 'week',
    controller: bitinfoWeekController
});