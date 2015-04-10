/**
 * Created by piyushthapa on 4/8/15.
 */
Template.searchMap.onCreated(function(){
   this.autorun(function(){
       Session.set('Location',Geolocation.latLng());
   });
});
Template.searchMap.helpers({
    locationObtained:function(){
        if(Session.get('Location'))
            return true;
    }
});
Template.map.onCreated(function(){

    GoogleMaps.ready('OMWMAP', function(mapObj) {

        var MARKERS=[];

        var handle=user.find().observeChanges({
            added:function(userid,user){
                var infowindow = new google.maps.InfoWindow({
                    content: "<h5>"+user.profile.basicInfo.Name.fname+" "+user.profile.basicInfo.Name.lname+" </h5><br> <a class='button button-full button-positive btn-drive'>Request Drive </a>"
                });
                var marker = new google.maps.Marker({
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(user.profile.location.lat, user.profile.location.lng),
                    map: mapObj.instance,
                    // We store the document _id on the marker in order
                    // to update the document within the 'dragend' event below.
                    id:userid ,
                    icon: new google.maps.MarkerImage(
                        'images/marker-magenta.png',
                        null,
                        null,
                        null,
                        new google.maps.Size(36, 36)
                    )

                });
                marker.infowindow=infowindow;
                google.maps.event.addListener(marker, 'click', function() {
                    //infobox.setContent(infoWindowContent(document));
                    marker.infowindow.open(mapObj.instance, this);
                    var markerCurr=this;
                    $('.btn-drive').click(function(e){
                        e.preventDefault();
                       omwMerchant.call('requestDrive',markerCurr.id,Meteor.userId(),Meteor.user().profile,function(err,res){
                          if(err){
                              alert(err.reason);
                          }else{
                            Router.go('/');
                          }
                       });
                    });

                });
                MARKERS[userid]=marker;
            },
            changed:function(){

            }
        });

    });


});
Template.map.helpers({
    exampleMapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(Session.get('Location').lat, Session.get('Location').lng),
                zoom: 15
            };
        }
    }

});