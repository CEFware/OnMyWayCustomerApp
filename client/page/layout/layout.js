/**
 * Created by piyushthapa on 4/1/15.
 */
Template.layout.events({
   'click #map-btn':function(e,t){
       e.preventDefault();
       Router.go('/search');
   }
});