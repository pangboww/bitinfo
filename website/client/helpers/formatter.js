/**
 * Created by pangboww on 05/12/15.
 */

Template.registerHelper('formatDate', function(date) {
    return moment(date * 1000).format('MMMM Do hh:mm');
});