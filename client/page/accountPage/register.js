/**
 * Created by piyushthapa on 3/26/15.
 */
Template.register.events({
   'submit #registerForm':function(e,t){
       e.preventDefault();
       var user={
           email: t.find('#email').value,
           password: t.find('#password').value,
           profile:{
               basicInfo:{
                   Name:{
                       fname: t.find('#fname').value,
                       lname: t.find('#lname').value

                   },
                   city: t.find('#city').value,
                   phoneNo: t.find('#phoneNo').value
               }
           }
       };
       Accounts.createUser(user,function(err,res){
          if(err){
              alert(err.reason);
          }
       });
   }
});