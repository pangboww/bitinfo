/**
 * Created by pangboww on 05/12/15.
 */

Template.registerHelper('formatDate', function(time) {
    return moment(time * 1000).format('MMMM Do hh:mm');
});