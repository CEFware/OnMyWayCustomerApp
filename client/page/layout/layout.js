/**
 * Created by piyushthapa on 4/1/15.
 */
var initSlideEvent=function(){
    $('.badge2').click(function(){
        var state=IonSideMenu.snapper.state().state;
        if(state=='closed'){
            omwMerchant.call('allMessegeSeen',Router.current().params._id,Meteor.userId());
        }
    });
};
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
   },
    'click .buttonStart':function(){
        $('#messege').focus();
    }
});
Template.messegeData.helpers({
    myMessege:function(){
        var isMe= this.by==Meteor.userId();

        return isMe;
    },
    makeSeen:function(){
        if(IonSideMenu.snapper.state().state =="closed" || this.seen == true)
            return;

        else {
            omwMerchant.call('messegeSeen', this._id, function (err, res) {

            });
        }

    }
});
Template.sideLayout.rendered=function(){
    $('.content').addClass('has-footer');
};
Template.messegeData.rendered=function(){
    if(this.data.by!=Meteor.userId() && this.data.seen==false){
        initSlideEvent();
    }
    $(".content").animate({
        scrollTop:  10000
    });
};