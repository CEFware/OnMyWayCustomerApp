if (Meteor.isClient) {
  // counter starts at 0
Meteor.startup(function(){
    GoogleMaps.load({ v: '3', key: 'AIzaSyAextd1AhqDBSrGQbRyzXKSaDhuQNNkfGc', libraries: 'geometry,places' });
    var url='http://omwm.meteor.com/';
   // var url='http://27.34.92.226:3000/';

    omwMerchant=DDP.connect(url);
    merchantStatus=new Mongo.Collection('status',omwMerchant);
    user=new Mongo.Collection('users',omwMerchant);
    drivesInfo=new Mongo.Collection('driveInfo',omwMerchant);
     subsUser=omwMerchant.subscribe('onlineUser');
     driveSubs=omwMerchant.subscribe('driveInfo',false,Meteor.userId());
    messeges=new Mongo.Collection('messeges',omwMerchant);

    Tracker.autorun(function(){
        var latLang=Geolocation.latLng();
        if(Meteor.user() && Meteor.user().profile && Meteor.user().profile.location && latLang){
            //check the distance is changed or not
            var userLocation=Meteor.user().profile.location;
            var distance=nearByLocation.getDistance({
                latA: userLocation.lat,
                latB: latLang.lat,
                lngA: userLocation.lng,
                lngB: latLang.lng
            });
            if(latLang){
                Meteor.call('updateLocation',latLang,function(err,res){

                });
            }
        }
        else{
            if(latLang)
            Meteor.call('updateLocation',latLang);
        }

    });
});


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
