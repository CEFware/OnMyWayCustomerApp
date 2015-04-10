/**
 * Created by piyushthapa on 4/1/15.
 */
Template.layout.events({
   'click #map-btn':function(e,t){
       e.preventDefault();
       Router.go('/search');
   },
    'click .nav-driveStatus':function(e){
        e.preventDefault();
        var status=$(e.target).attr('data-status');
        Router.go('/drive/'+status);
    },
    'click .btn-home':function(e){
        e.preventDefault();
        Router.go('/');
    }
});
Template.layout.helpers({
    getDriveCount:function(status){
        if(driveSubs.ready()){
            return drivesInfo.find({customerId:Meteor.userId(),status:status}).count();
        }
    },
    getpendingCount:function(){
        return drivesInfo.find({customerId:Meteor.userId(),customerSeen:false}).count();
    }
});