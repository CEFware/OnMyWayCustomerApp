if (Meteor.isClient) {
  // counter starts at 0
Meteor.startup(function(){
    GoogleMaps.load({ v: '3', key: 'AIzaSyAextd1AhqDBSrGQbRyzXKSaDhuQNNkfGc', libraries: 'geometry,places' });

});


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
