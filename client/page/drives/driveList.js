/**
 * Created by piyushthapa on 4/10/15.
 */
Template.driveList.helpers({
    drives:function(){
        return drivesInfo.find({customerId:Meteor.userId(),status:Router.current().params.status});
    },
    status:function(){
        return Router.current().params.status;
    },
    getClassByStatus:function(){
        var color={'accepted':'text-green','rejected':'text-red'}
        return color[Router.current().params.status];
    }
});