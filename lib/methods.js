/**
 * Created by piyushthapa on 3/29/15.
 */
Meteor.methods({
    completeStep:function(securityInfo){
        Meteor.users.update({_id:Meteor.userId()},{$set:{'profile.securityInfo':securityInfo}});
    },
    updateLocation:function(location){
        Meteor.users.update({_id:Meteor.userId()},{$set:{'profile.location':location}});
    }
});