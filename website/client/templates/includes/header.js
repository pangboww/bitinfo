/**
 * Created by pangboww on 03/12/15.
 */

Template.header.helpers({
    hourTab: function() {
        return Router.current().route.path(this) == "/hour" ? "active" : "";
    },
    dayTab: function() {
        return Router.current().route.path(this) == "/day" ? "active" : "";
    },
    weekTab: function() {
        return Router.current().route.path(this) == "/week" ? "active" : "";
    }
})