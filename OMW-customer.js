if (Meteor.isClient) {
  // counter starts at 0
Meteor.startup(function(){
    GoogleMaps.load({ v: '3', key: 'AIzaSyAextd1AhqDBSrGQbRyzXKSaDhuQNNkfGc', libraries: 'geometry,places' });
   // var url='http://omw.meteor.com/';
    var url='http://localhost:3000/';

    omwMerchant=DDP.connect(url);
    merchantStatus=new Mongo.Collection('status',omwMerchant);
    user=new Mongo.Collection('users',omwMerchant);
    drivesInfo=new Mongo.Collection('driveInfo',omwMerchant);
     subsUser=omwMerchant.subscribe('onlineUser');
     driveSubs=omwMerchant.subscribe('driveInfo',false,Meteor.userId());
});


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
