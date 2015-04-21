/**
 * Created by piyushthapa on 4/17/15.
 */
var mapInitialized=false;
Template.meet.onCreated(function(){
    this.autorun(function(){
        Session.set('Location',Geolocation.latLng());

    });
});
Template.meetMap.rendered=function(){
    setTimeout(function(){
        IonSideMenu.snapper.disable();
    },1000)

};
Template.meetMap.destroyed=function(){
    IonSideMenu.snapper.enable();
};
Template.meet.helpers({
    locationObtained:function(){
        return Session.get('Location');

    },
    dataCount:function(){
        var count=messeges.find({by:{$ne:Meteor.userId()},seen:false,driveId:Router.current().params._id}).count();
        if(count >0){
            return count;
        }


    }
});
Template.meet.events({

});


Template.meetMap.helpers({
    exampleMapOptions: function() {
        if(!mapInitialized){
            // Make sure the maps API has loaded
            if (GoogleMaps.loaded()) {
                // Map initialization options
                mapInitialized=true;
                return {
                    center: new google.maps.LatLng(Session.get('Location').lat, Session.get('Location').lng),
                    zoom: 15
                };
            }
        }

    }


});
Template.meetMap.onCreated(function(){
    var instance=this;
    mapInitialized=false;
    if(!Session.get('merchantId')){
        Session.set('merchantId',null);
    }
    var Marker={me:null,him:null};
    GoogleMaps.ready('meetMap', function(mapObj) {

        instance.autorun(function(){
            var position=Meteor.user().profile.location;
            console.log(position);
            if(Marker.me==null){
                var infowindow = new google.maps.InfoWindow({
                    content: "Me"
                });
                 Marker.me = new google.maps.Marker({
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(position.lat, position.lng),
                    map: mapObj.instance,
                    // We store the document _id on the marker in order
                    // to update the document within the 'dragend' event below.
                    icon: new google.maps.MarkerImage(
                        '/markers/marker-green.png',
                        null,
                        null,
                        null,
                        new google.maps.Size(36, 36)
                    )

                });
            }else{
                var latlng=new google.maps.LatLng(position.lat, position.lng);
                Marker.me.setPosition(latlng);
            }
        });
        instance.autorun(function(){

            if(driveSubs.ready()){
                var merchantId=drivesInfo.findOne({_id:Router.current().params._id}).merchantId;
                var subsc=omwMerchant.subscribe('userInfo',merchantId);
                if(subsc.ready()){
                    var query=user.find({_id:merchantId});
                    query.observeChanges({
                       added:function(id,fields){
                           if(Marker.him==null){
                               var infowindow = new google.maps.InfoWindow({
                                   content: "Merchant"
                               });
                               Marker.him = new google.maps.Marker({
                                   draggable: false,
                                   animation: google.maps.Animation.DROP,
                                   position: new google.maps.LatLng(fields.profile.location.lat, fields.profile.location.lng),
                                   map: mapObj.instance,
                                   // We store the document _id on the marker in order
                                   // to update the document within the 'dragend' event below.
                                   icon: new google.maps.MarkerImage(
                                       '/markers/marker-red.png',
                                       null,
                                       null,
                                       null,
                                       new google.maps.Size(36, 36)
                                   )

                               });
                           }
                       },
                        changed:function(id,field){
                            if(field.profile.location){
                                var latlng =  new google.maps.LatLng(field.profile.location.lat, field.profile.location.lng);
                                Marker.him.setPosition(latlng);
                            }

                        }
                    });
                }
            }

        });
    });
});
Template.messeges.onCreated(function(){

});
Template.messeges.helpers({
   isMessegeReady:function(){
       var subs=omwMerchant.subscribe('messeges',Router.current().params._id);
       if(subs.ready())
        return true;
       else
        return false;
   },
    messeges:function(){
        return messeges.find({driveId:Router.current().params._id});
    }
});
