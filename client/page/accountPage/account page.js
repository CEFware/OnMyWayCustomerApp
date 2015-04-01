/**
 * Created by piyushthapa on 3/28/15.
 */
Template.AccountPage.events({
   'submit form':function(e,t){
       e.preventDefault();
       var email= t.find('#login_email').value,
           password=t.find('#login_password').value;
       Meteor.loginWithPassword(email,password,function(err){
          if(!err){
              Router.go('/');
          }
       });
   }
});