function showMe (box) {
    document.getElementById(box).style.display = 'inline';
}


function testResults (form) {
    //WEATHER STUFF
    //Instance of js object to deal with json requests and url
    var xmlhttp = new XMLHttpRequest();
    //url is working I checked the data

    //This is all the data from the form.
    var location = form.location.value;
    var units = form.units.value;
    var days = form.days.value;

    //var url = "http://api.openweathermap.org/data/2.5/forecast?q="+location+"&mode=json&appid=dab71e5e8eb47351af0a7bdb5bcac16b&units="+units+"&cnt="+days;
    //var url = "http://api.openweathermap.org/data/2.5/forecast?q="+location+"&mode=json&appid=dab71e5e8eb47351af0a7bdb5bcac16b&units="+units;

    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+location+'&mode=json&appid=dab71e5e8eb47351af0a7bdb5bcac16b&units='+units+'&cnt='+days;
    //var url = 'http://api.openweathermap.org/data/2.5/forecast?lat=53.3498053&lon=-6.260309699999993&mode=json&appid=5285c55183ef5de1fc376eb445326ff5&units=metric'

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

        // GOOGLE MAP STUFF
        var myCenter=new google.maps.LatLng(data.city.coord.lat,data.city.coord.lon);

        var mapProp = {
          center:myCenter,
          zoom:5,
          mapTypeId:google.maps.MapTypeId.ROADMAP
          };

        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

        var marker=new google.maps.Marker({
          position:myCenter,
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
        for(i = 0; i < data.list.length; i++) {
            best += "<a onclick='furtherInfo()'>" + "Day " + (i+1) + ": " + "</a>";
            best += "<h4 id='finegrained'></h4>"
            best += '<img src="http://openweathermap.org/img/w/'+data.list[i].weather[0].icon +'.png">';
            best += "<p>" + "Generally we can expect tempritures to reach " + data.list[i].temp.day +
                    " during the day." + " and " + data.list[i].temp.night + " during the night. " +
                    "<br />" + "In terms of cloudiness it will be " + data.list[i].clouds + "%." +
                    " On this day we can expect to see: " + data.list[i].weather[0].main + ", " +
                    data.list[i].weather[0].description + "</p>";
            best += "<ul>";
            best += "<li>" + "The minimum temperature is day is: " + data.list[i].temp.min + "</li>";
            best += "<li>" + "The maximum temperature for this day is: " + data.list[i].temp.max + "</li>";
            best += "<li>" + "The predicted rainfall for this day is: " + " DONT HAVE YET " + "</li>";
            best += "</ul>";
        }
        document.getElementById("summary").innerHTML = best;


        //For loop to add the table from the array

        var other = "<table style='float:left'>";
        other += "<tr><td>" + "PRESSURE (ground, sea)" + "</td></tr>";
        for(i = 0; i < data.list.length; i++) {
            other +=  "<tr><td>" + data.list[i].pressure + "</td></tr>";
        }
        other += "</table>";

        var other2 = "<table style='float:left'>";
        other2 += "<tr><td>" + "HUMIDITY" + "</td></tr>";
        for(i = 0; i < data.list.length; i++) {
            other2 +=  "<tr><td>" + data.list[i].humidity + "</td></tr>";
        }
        other2 += "</table>";

        var other3 = "<table style='float:left'>";
        other3 += "<tr><td>" + "WIND SPEED" + "</td></tr>";
        for(i = 0; i < data.list.length; i++) {
            other3 +=  "<tr><td>" + data.list[i].speed + "</td></tr>";
        }
        other3 += "</table>";

        var checkbx = "<input type=\"checkbox\" name=\"c1\" onclick=\"showMe('table1')\">Show Hide Checkbox" +
        "<input type=\"checkbox\" name=\"c1\" onclick=\"showMe('table2')\">Show Hide Checkbox" +
        "<input type=\"checkbox\" name=\"c1\" onclick=\"showMe('table3')\">Show Hide Checkbox";

        //document.getElementById("ready to party").innerHTML = "Here is the city information" + "<br /><br />"  + out;
        //document.getElementById("summary").innerHTML = best;
        document.getElementById("checkboxes").innerHTML = checkbx;
        document.getElementById("table1").innerHTML = other;
        document.getElementById("table2").innerHTML = other2;
        document.getElementById("table3").innerHTML = other3;


        return data;
    }



}


function furtherInfo () {

    var xmlhttp = new XMLHttpRequest();
    var location = 'London,us';
    var units = 'metric';

    var xmlhttp = new XMLHttpRequest();
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

        var numberChoice = 3;

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

            if (numberChoice == 1){
                document.getElementById("finegrained").innerHTML = data1;
            } else if (numberChoice == 2){
                document.getElementById("finegrained").innerHTML = data2;
            } else if (numberChoice == 3) {
                document.getElementById("finegrained").innerHTML = data3;
            } else if (numberCHoice == 4){
                document.getElementById("finegrained").innerHTML = data4;
            } else if (numberCHoice == 4){
                document.getElementById("finegrained").innerHTML = data5;
            }


    }


}








