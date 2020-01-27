function initScenes() {

    // build scene
    new ScrollMagic.Scene({
            triggerElement: "#trigger1",
            triggerHook: 1, // show, when scrolled 10% into view
            duration: "117%", // hide 10% before exiting view (80% + 10% from bottom)
            offset: 50 // move trigger to center of element
        })
        .setClassToggle("#reveal1", "visible") // add class to reveal
        .addTo(controller);

    // build scene
    new ScrollMagic.Scene({
            triggerElement: "#trigger2",
            triggerHook: 1, // show, when scrolled 10% into view
            duration: "117%", // hide 10% before exiting view (80% + 10% from bottom)
            offset: 50 // move trigger to center of element
        })
        .setClassToggle("#reveal2", "visible") // add class to reveal
        .addTo(controller);

    // build scene
    new ScrollMagic.Scene({
            triggerElement: "#trigger3",
            triggerHook: 1, // show, when scrolled 10% into view
            duration: "200%", // hide 10% before exiting view (80% + 10% from bottom)
            offset: 50 // move trigger to center of element
        })
        .setClassToggle("#reveal3", "visible") // add class to reveal
        .addTo(controller);
}



$(function() {

    $("#accordion").accordion({
        active: 0
    });

    $('a[href*="#"]').on('click', function(e) {
        // Prevent event bubling (i.e. the browser will not add #element_id in address bar)
        e.preventDefault();

        // Scroll the page to the selected element
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 100, 'linear');
    });

    initScenes();

    let paraTemp = $("#vTemp");
    let paraPressure = $("#vPressure");
    let paraHum = $("#vHum");
    let paraPM11 = $('#vPM10');
    let paraPM25 = $('#vPM25');



    $.getJSON("http://data.sensor.community/airrohr/v1/sensor/38303/", function(data) {

        console.log(data);

        let temp1 = parseFloat(data[0].sensordatavalues[0].value);
        let temp2 = parseFloat(data[1].sensordatavalues[0].value);
        let temp = (temp1 + temp2) / 2;
        console.log(temp.toFixed(2));
        paraTemp.text(temp.toFixed(2));

        let pressure1 = parseFloat(data[0].sensordatavalues[1].value);
        let pressure2 = parseFloat(data[1].sensordatavalues[1].value);
        let pressure = (pressure1 + pressure2) / 2;
        console.log(pressure.toFixed(2));
        paraPressure.text(pressure.toFixed(2));

        let hum1 = parseFloat(data[0].sensordatavalues[2].value);
        let hum2 = parseFloat(data[1].sensordatavalues[2].value);
        let hum = (hum1 + hum2) / 2;
        console.log(hum1.toFixed(2));
        paraHum.text(hum1.toFixed(2));

    });

    $.getJSON("http://data.sensor.community/airrohr/v1/sensor/38302/", function(data) {

        console.log(data);

        let PM11 = parseFloat(data[0].sensordatavalues[0].value);
        let PM12 = parseFloat(data[1].sensordatavalues[0].value);
        let PM10 = (PM11 + PM12) / 2;
        console.log(PM10.toFixed(2));
        paraPM11.text(PM10.toFixed(2));

        let PM21 = parseFloat(data[0].sensordatavalues[1].value);
        let PM22 = parseFloat(data[1].sensordatavalues[1].value);
        let PM25 = (PM21 + PM22) / 2;
        console.log(PM25.toFixed(2));
        paraPM25.text(PM25.toFixed(2));

    });

});

function showdaily() {
    var x = document.getElementById("GraphsDaily");
    if (x.style.display === "none") {
        x.style.display = "block";
        $("#buttongraphday").text("Hide daily graphs");
    } else {
        x.style.display = "none";
        $("#buttongraphday").text("Show daily graphs");
    }

}

function showweekly() {
    var x = document.getElementById("GraphsWeekly");

    if (x.style.display === "none") {
        x.style.display = "block";
        $("#buttongraphweek").text("Hide weekly graphs");
    } else {
        x.style.display = "none";
        $("#buttongraphweek").text("Show weekly graphs");
    }

}

function showmonthly() {
    var x = document.getElementById("GraphsMonthly");
    if (x.style.display === "none") {
        x.style.display = "block";
        $("#buttongraphmonth").text("Hide monthly graphs");
    } else {
        x.style.display = "none";
        $("#buttongraphmonth").text("Show monthly graphs");
    }

}

function infoFunction() {
    var x = document.getElementById("pminfo");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}