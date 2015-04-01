/**
 * Created by piyushthapa on 3/25/15.
 */
Router.configure({
  layoutTemplate:'layout'
});
Router.onBeforeAction(function () {
    // all properties available in the route function
    // are also available here such as this.params

    if (!Meteor.userId()) {
        // if the user is not logged in, render the Login template
        this.layout('fullAppLayout');
        this.render('AccountPage');
    } else {
        // otherwise don't hold up the rest of hooks or our route/action function
        // from running
        this.next();
    }
});
Router.route('/',function(){
   this.render('home');
});

Router.route('/search',function(){
    this.layout('OnlyPageLayout');
    this.render('searchMap');
});
