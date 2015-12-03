/**
 * Created by pangboww on 03/12/15.
 */

Meteor.publish('btcc', function(options){
    return Btcc.find({}, options)
});