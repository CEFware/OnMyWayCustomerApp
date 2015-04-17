/**
 * Created by piyushthapa on 4/17/15.
 */
Template.AccountPage.events({
   'submit form':function(e,t){
       e.preventDefault();
       alert('hi');
       Meteor.loginWithPassword({email:t.find('#loginEmail').value}, t.find('#loginPassword').value,function(err){
          if(err)
            alert(err.reason);
       });
   }
});