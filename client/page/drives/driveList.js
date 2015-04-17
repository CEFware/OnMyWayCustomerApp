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
    }
});