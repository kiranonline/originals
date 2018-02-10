$.getScript('http://maps.googleapis.com/maps/api/js?key=AIzaSyApkKeEIsijY0a5MucL6DAtCQIm0Cf9jUI&sensor=false&libraries=places', function()
{

    var source, destination;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    google.maps.event.addDomListener(window, 'load', function () {
        new google.maps.places.SearchBox(document.getElementById('txtSource'));
        new google.maps.places.SearchBox(document.getElementById('txtDestination'));
        directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
    });


    $('#mapp').click(

    

    function(){
        var mumbai = new google.maps.LatLng(22.975084, 88.434509);
        var mapOptions = {
            zoom: 7,
            center: mumbai
        };
        map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
        directionsDisplay.setMap(map);
        

        source = document.getElementById("txtSource").value;
        destination = document.getElementById("txtDestination").value;
 
        
        var request = {
            origin: source,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [source],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                var distance = response.rows[0].elements[0].distance.text;
                var duration = response.rows[0].elements[0].duration.text;
                var dvDistance = document.getElementById("dvDistance");
               dvDistance.innerHTML = "";
                dvDistance.innerHTML += "Distance: " + distance + "<br />";
                dvDistance.innerHTML += "Duration:" + duration;
     
            } else {
                alert("Unable to find the distance via road.");
            }

        });


    }
    );
    





  
    
});

$(document).ready(function(){



      //generating order id
      $('#placeoo').click(function(){
        var name=$('#nnnn').val();
        var orderid=name.substring(0,4)+Math.floor((Math.random() * 1000000) + 1).toString();
        console.log(orderid);
    
    });



});