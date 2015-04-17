/**
 * Created by piyushthapa on 4/10/15.
 */
Template.normalHome.onCreated(function(){

});
Template.normalHome.helpers({
    driveRequest:function(){
        return drivesInfo.find({customerId:Meteor.userId(),customerSeen:false});
    },
    merchantInfo:function(){
        var subs=omwMerchant.subscribe('userInfo',this.merchantId);
        if(subs.ready()){
            var userInfo= user.findOne({_id:this.merchantId},{fields:{'profile.basicInfo':1}});
            if(userInfo && userInfo.profile){
                console.log(userInfo.profile.basicInfo);
                return userInfo.profile.basicInfo;
            }

        }
    },
    accepted:function(){
        console.log('accepted');
        return this.status=='accepted';
    }
});
Template.normalHome.events({
    'click .btn-status':function(e,t){
        e.preventDefault();
        var id=this._id;
       omwMerchant.call('seenByCustomer',this._id,function(err,res){
            if(!err){
                Router.go('/meet/'+id);
            }
       });
    },
    'click .btn-search':function(e,t){
        e.preventDefault();
        Router.go('/search');
    }
});