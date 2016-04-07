$(document).ready(function(){
    $('input[type="checkbox"]').click(function(){
        if($(this).attr("value")=="red"){
            $(".red").toggle();
        }
        if($(this).attr("value")=="green"){
            $(".green").toggle();
        }
        if($(this).attr("value")=="blue"){
            $(".blue").toggle();
        }
    });
});


function testResults (form) {
    //WEATHER STUFF
    //Instance of js object to deal with json requests and url
    var xmlhttp = new XMLHttpRequest();
    //url is working I checked the data

    //This is all the data from the form.
    var location = form.location.value;
    var units = form.units.value;
    var days = form.days.value;


    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+location+'&mode=json&appid=dab71e5e8eb47351af0a7bdb5bcac16b&units='+units+'&cnt='+days;
    var codeurl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyD0B92s8QnfLcIV1kP7dn5vGv7ldKz4Q88';


     //Standard Request given by W3
    xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        codeFunction(xmlhttp.responseText);
    }
    }
    xmlhttp.open("GET", codeurl, true);
    xmlhttp.send();


    //Function executed on it's behalf
    function codeFunction(response) {
        var otherdata = JSON.parse(response);
        var errorcode = otherdata.status;

        if (errorcode == 'ZERO_RESULTS'){
            document.getElementById("codetest").innerHTML = "ERROR! Sorry address doesn't exist";
        } else if (errorcode == 'REQUEST_DENIED'){
            document.getElementById("codetest").innerHTML = "ERROR! Your request was denied";
        } else if (errorcode == 'UNKNOWN_ERROR'){
            document.getElementById("codetest").innerHTML = "ERROR! There was an unknown error";
        } else if (errorcode == 'INVALID_REQUEST'){
            document.getElementById("codetest").innerHTML = "ERROR! That is an invalid request";
        } else if (errorcode == 'OVER_QUERY_LIMIT') {
            document.getElementById("codetest").innerHTML = "ERROR! You are over you query limit";
        } else if (errorcode == 'OK') {
            document.getElementById("codetest").innerHTML = "All good";
        }


        //Standard Request given by W3
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                myFunction(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();


        function myFunction(response) {

            var data = JSON.parse(response);

            // GOOGLE MAP STUFF
            var myCenter = new google.maps.LatLng(otherdata.results[0].geometry.location.lat, otherdata.results[0].geometry.location.lng);

            var mapProp = {
                center: myCenter,
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

            var marker = new google.maps.Marker({
                position: myCenter,
            });

            marker.setMap(map);

            document.getElementById("Mapintro").innerHTML = "THis is where you picked";

            //This is the city table
            var out = "<table>";
            out += "<tr><td>" + "Id" + "</td><td>" + data.city.id + "</td></tr>";
            out += "<tr><td>" + "Name" + "</td><td>" + data.city.name + "</td></tr>";
            out += "<tr><td>" + "Country" + "</td><td>" + data.city.country + "</td></tr>";
            out += "<tr><td>" + "Longitude" + "</td><td>" + data.city.coord.lon + "</td></tr>";
            out += "<tr><td>" + "Latitude" + "</td><td>" + data.city.coord.lat + "</td></tr>";
            out += "</table>";
            document.getElementById("ready to party").innerHTML = out;


            //This is the summary list
            var i;
            var best = "<br />";
            for (i = 0; i < data.list.length; i++) {
                best += "<a onclick='furtherInfo(" + (i + 1) + ")'>" + "Day " + (i + 1) + ": " + "</a>";
                best += "<h4 id= class" + (i + 1) + "></h4>"
                best += '<img src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png">';
                best += "<p>" + "Generally we can expect tempritures to reach " + data.list[i].temp.day +
                    " during the day." + " and " + data.list[i].temp.night + " during the night. " +
                    "<br />" + "In terms of cloudiness it will be " + data.list[i].clouds + "%." +
                    " On this day we can expect to see: " + data.list[i].weather[0].main + ", " +
                    data.list[i].weather[0].description + "</p>";
                best += "<ul>";
                best += "<li>" + "The minimum temperature is day is: " + data.list[i].temp.min + "</li>";
                best += "<li>" + "The maximum temperature for this day is: " + data.list[i].temp.max + "</li>";
                best += "<li>" + "The predicted rainfall for this day is: " + data.list[i].rain + "</li>";
                best += "</ul>";
            }
            document.getElementById("summary").innerHTML = best;


            //For loop to add the table from the array

            var other = "<table style='float:left'>";
            other += "<tr><td>" + "PRESSURE" + "</td></tr>";
            for (i = 0; i < data.list.length; i++) {
                other += "<tr><td>" + data.list[i].pressure + "</td></tr>";
            }
            other += "</table>";

            var other2 = "<table style='float:left'>";
            other2 += "<tr><td>" + "HUMIDITY" + "</td></tr>";
            for (i = 0; i < data.list.length; i++) {
                other2 += "<tr><td>" + data.list[i].humidity + "</td></tr>";
            }
            other2 += "</table>";

            var other3 = "<table style='float:left'>";
            other3 += "<tr><td>" + "WIND SPEED" + "</td></tr>";
            for (i = 0; i < data.list.length; i++) {
                other3 += "<tr><td>" + data.list[i].speed + "</td></tr>";
            }
            other3 += "</table>";

            //document.getElementById("ready to party").innerHTML = "Here is the city information" + "<br /><br />"  + out;
            //document.getElementById("summary").innerHTML = best;
            document.getElementById("tabletest").innerHTML = other;
            document.getElementById("tabletest2").innerHTML = other2;
            document.getElementById("tabletest3").innerHTML = other3;


            return data;
        }
    }



}


function furtherInfo (choice) {

    //var numberChoice = 3;

    var xmlhttp = new XMLHttpRequest();
    var location = 'London,us';
    var units = 'metric';

    var url = 'http://api.openweathermap.org/data/2.5/forecast?q='+location+'&mode=json&appid=dab71e5e8eb47351af0a7bdb5bcac16b&units='+units;

    //Standard Request given by W3
    xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myFunction(xmlhttp.responseText);
    }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    function myFunction(response) {
        var data = JSON.parse(response) ;

        //This is the summary list
        var i;
        var best = "<br />";
        var counter = 0;
        var data1 = '';
        var data2 = '';
        var data3 = '';
        var data4 = '';
        var data5 = '';

        //Get the number for the day

        for(i = 0; i < data.list.length; i++) {

            if (data.list[i].dt_txt.slice(-8) == '00:00:00'){
                counter += 1;
            }

            if (counter == 0){
                data1 += "<a>" + "Forecast " + (i + 1) + ": " + "</a>" + data.list[i].dt_txt;
                data1 += "<h4 id='finegrained'></h4>"
                data1 += '<img src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png">';
                data1 += "<p>" + "Generally we can expect tempritures to reach " + data.list[4].main.temp +
                    " on this day." + " The wind direction predicted is " + data.list[i].wind.deg +
                    "<br />" + "In terms of cloudiness it will be " + data.list[i].clouds.all + "%." +
                    " On this day we can expect to see: " + data.list[i].weather[0].main + ", " +
                    data.list[i].weather[0].description + "</p>";
                data1 += "<ul>";
                data1 += "<li>" + "The minimum temperature is day is: " + data.list[i].main.temp_min + "</li>";
                data1 += "<li>" + "The maximum temperature for this day is: " + data.list[i].main.temp_max + "</li>";
                data1 += "<li>" + "The predicted rainfall for this day is: " + data.list[i].main.temp + "</li>";
                data1 += "</ul>";

            } else if (counter == 1){
                data2 += "<a>" + "Forecast " + (i + 1) + ": " + "</a>" + data.list[i].dt_txt;
                data2 += "<h4 id='finegrained'></h4>"
                data2 += '<img src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png">';
                data2 += "<p>" + "Generally we can expect tempritures to reach " + data.list[4].main.temp +
                    " on this day." + " The wind direction predicted is " + data.list[i].wind.deg +
                    "<br />" + "In terms of cloudiness it will be " + data.list[i].clouds.all + "%." +
                    " On this day we can expect to see: " + data.list[i].weather[0].main + ", " +
                    data.list[i].weather[0].description + "</p>";
                data2 += "<ul>";
                data2 += "<li>" + "The minimum temperature is day is: " + data.list[i].main.temp_min + "</li>";
                data2 += "<li>" + "The maximum temperature for this day is: " + data.list[i].main.temp_max + "</li>";
                data2 += "<li>" + "The predicted rainfall for this day is: " + data.list[i].main.temp + "</li>";
                data2 += "</ul>";

            } else if (counter == 2){
                data3 += "<a>" + "Forecast " + (i + 1) + ": " + "</a>" + data.list[i].dt_txt;
                data3 += "<h4 id='finegrained'></h4>"
                data3 += '<img src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png">';
                data3 += "<p>" + "Generally we can expect tempritures to reach " + data.list[4].main.temp +
                    " on this day." + " The wind direction predicted is " + data.list[i].wind.deg +
                    "<br />" + "In terms of cloudiness it will be " + data.list[i].clouds.all + "%." +
                    " On this day we can expect to see: " + data.list[i].weather[0].main + ", " +
                    data.list[i].weather[0].description + "</p>";
                data3 += "<ul>";
                data3 += "<li>" + "The minimum temperature is day is: " + data.list[i].main.temp_min + "</li>";
                data3 += "<li>" + "The maximum temperature for this day is: " + data.list[i].main.temp_max + "</li>";
                data3 += "<li>" + "The predicted rainfall for this day is: " + data.list[i].main.temp + "</li>";
                data3 += "</ul>";

            } else if (counter == 3){
                data4 += "<a>" + "Forecast " + (i + 1) + ": " + "</a>" + data.list[i].dt_txt;
                data4 += "<h4 id='finegrained'></h4>"
                data4 += '<img src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png">';
                data4 += "<p>" + "Generally we can expect tempritures to reach " + data.list[4].main.temp +
                    " on this day." + " The wind direction predicted is " + data.list[i].wind.deg +
                    "<br />" + "In terms of cloudiness it will be " + data.list[i].clouds.all + "%." +
                    " On this day we can expect to see: " + data.list[i].weather[0].main + ", " +
                    data.list[i].weather[0].description + "</p>";
                data4 += "<ul>";
                data4 += "<li>" + "The minimum temperature is day is: " + data.list[i].main.temp_min + "</li>";
                data4 += "<li>" + "The maximum temperature for this day is: " + data.list[i].main.temp_max + "</li>";
                data4 += "<li>" + "The predicted rainfall for this day is: " + data.list[i].main.temp + "</li>";
                data4 += "</ul>";
            } else if (counter == 4){
                data5 += "<a>" + "Forecast " + (i + 1) + ": " + "</a>" + data.list[i].dt_txt;
                data5 += "<h4 id='finegrained'></h4>"
                data5 += '<img src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png">';
                data5 += "<p>" + "Generally we can expect tempritures to reach " + data.list[4].main.temp +
                    " on this day." + " The wind direction predicted is " + data.list[i].wind.deg +
                    "<br />" + "In terms of cloudiness it will be " + data.list[i].clouds.all + "%." +
                    " On this day we can expect to see: " + data.list[i].weather[0].main + ", " +
                    data.list[i].weather[0].description + "</p>";
                data5 += "<ul>";
                data5 += "<li>" + "The minimum temperature is day is: " + data.list[i].main.temp_min + "</li>";
                data5 += "<li>" + "The maximum temperature for this day is: " + data.list[i].main.temp_max + "</li>";
                data5 += "<li>" + "The predicted rainfall for this day is: " + data.list[i].main.temp + "</li>";
                data5 += "</ul>";
            } else{
                var dimitri = 0;
            }



            }

            if (choice == 1){
                document.getElementById("class1").innerHTML = data1;
            } else if (choice == 2){
                document.getElementById("class2").innerHTML = data2;
            } else if (choice == 3) {
                document.getElementById("class3").innerHTML = data3;
            } else if (choice == 4){
                document.getElementById("class4").innerHTML = data4;
            } else if (choice == 5){
                document.getElementById("class5").innerHTML = data5;
            }


    }


}








