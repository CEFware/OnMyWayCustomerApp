/**
 * Created by piyushthapa on 4/19/15.
 */
Meteor.publish('userInfo',function(id){
    var info=Meteor.users.find({_id:id},{fields:{profile:1}});
    return info;
});