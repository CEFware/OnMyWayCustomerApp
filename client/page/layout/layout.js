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

Template.sideLayout.events({
   'submit form':function(e,t){
       e.preventDefault();
       var messege= {
           driveId: Router.current().params._id,
           text: t.find('#messege').value,
           by: Meteor.userId()
       };
       omwMerchant.call('insertMessege',messege,function(err){
        if(!err){
            $('#messegeForm')[0 ].reset();
        }
       });
   }
});
Template.messegeData.helpers({
    myMessege:function(){
        return this.by==Meteor.userId();
    },
    makeSeen:function(){
        omwMerchant.call('messegeSeen',this._id,function(err,res){

        });
    }
});