function initScenes(controller) {

    // build scene
    new ScrollMagic.Scene({
        triggerElement: "#trigger1",
        triggerHook: 1, // show, when scrolled 10% into view
        duration: "100%", // hide 10% before exiting view (n% + 10% from bottom)
        offset: 50 // move trigger to center of element
    })
        .setClassToggle("#reveal1", "visible") // add class to reveal
        .addTo(controller);

    // build scene
    new ScrollMagic.Scene({
        triggerElement: "#trigger2",
        triggerHook: 1, // show, when scrolled 10% into view
        duration: "120%", // hide 10% before exiting view (n% + 10% from bottom)
        offset: 50 // move trigger to center of element
    })
        .setClassToggle("#reveal2", "visible") // add class to reveal
        .addTo(controller);

    // build scene
    new ScrollMagic.Scene({
        triggerElement: "#trigger3",
        triggerHook: 1, // show, when scrolled 10% into view
        duration: "220%", // hide 10% before exiting view (n% + 10% from bottom)
        offset: 50 // move trigger to center of element
    })
        .setClassToggle("#reveal3", "visible") // add class to reveal
        .addTo(controller);
}


//  define a JQuery function that will be executed when the whole body is loaded
$(function () {
    translate(localStorage.getItem("lang") || 'en');

    $(".translate-button").on("click", function () {
        translate($(this).data("lng"));
    });

    // selection all the elements that have id="accordion"
    $("#accordion").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content"
    });

    $("#accordion2").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content"
    });

    // select all 'a' atributes that contain in their href '#'
    $('a[href*="#"]').on('click', function (e) {

        // Prevent event bubling (i.e. the browser will not add #element_id in address bar)
        e.preventDefault();

        // Scroll the page to the selected element
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 100, 'linear');
    });

    let controller = new ScrollMagic.Controller();
    initScenes(controller);

    let paraTemp = $("#vTemp");
    let paraPressure = $("#vPressure");
    let paraHum = $("#vHum");
    let paraPM10 = $('#vPM10');
    let paraPM25 = $('#vPM25');
    let paraUpdate = $('#vUpdate');

    // converting the time to local time 
    function dateToISOLocalDate(date) {
        const offsetMs = date.getTimezoneOffset() * 60 * 1000;
        const msLocal = date.getTime() - offsetMs;
        const dateLocal = new Date(msLocal);
        const iso = dateLocal.toISOString();
        let isoLocal = iso.slice(0, 19);
        isoLocal = isoLocal.replace('T', ' ');
        return isoLocal;
    }

    // using JSON method to take the data
    $.getJSON("https://data.sensor.community/airrohr/v1/sensor/38303/", function (data) {
        // check if the data is valid
        if (data.length == 0) {
            return;
        }

        let LastUpdate = 0;
        let temperature = 0;
        let pressure = 0;
        let humidity = 0;

        LastUpdate = dateToISOLocalDate(new Date(data[0].timestamp + "Z"));

        // Calculating the sum of all values
        for (let i = 0; i < data.length; i++) {
            // console.log("i == " + i + ": " + parseFloat(data[i].sensordatavalues[0].value));
            temperature += parseFloat(data[i].sensordatavalues[0].value);
            pressure += parseFloat(data[i].sensordatavalues[1].value);
            humidity += parseFloat(data[i].sensordatavalues[2].value);
        }

        // Calculating average values
        temperature /= data.length;
        pressure /= data.length * 100;
        humidity /= data.length;

        // Displaying the result
        paraTemp.text(temperature.toFixed(2));
        paraPressure.text(pressure.toFixed(2));
        paraHum.text(humidity.toFixed(2));
        paraUpdate.text(LastUpdate);

    });

    $.getJSON("https://data.sensor.community/airrohr/v1/sensor/38302/", function (data) {
        // After receiving a response we perform data validateion check
        if (data.length == 0) {
            return;
        }

        let PM10 = 0;
        let PM25 = 0;

        // Calculating the sum of all values
        for (let i = 0; i < data.length; i++) {
            PM10 += parseFloat(data[i].sensordatavalues[0].value);
            PM25 += parseFloat(data[i].sensordatavalues[1].value);
        }

        // Calculating average values
        PM10 /= data.length;
        PM25 /= data.length;

        // Displaying the result
        paraPM10.text(PM10.toFixed(2));
        paraPM25.text(PM25.toFixed(2));

    });

});

function showdaily() {
    let x = document.getElementById("GraphsDaily");
    // if display attribute has value = None, then we change it and make it a block element
    if (x.style.display === "none") {
        x.style.display = "block";
        $("#buttongraphday")
            .text(getTranslatedText("dailyGraphButton-hide"));
    } else {
        x.style.display = "none";
        $("#buttongraphday").text(getTranslatedText("dailyGraphButton-show"));
    }

}

function showweekly() {
    let x = document.getElementById("GraphsWeekly");

    if (x.style.display === "none") {
        x.style.display = "block";
        $("#buttongraphweek").text(getTranslatedText("weeklyGraphButton-hide"));

    } else {
        x.style.display = "none";
        $("#buttongraphweek").text(getTranslatedText("weeklyGraphButton-show"));
    }

}

function showmonthly() {
    let x = document.getElementById("GraphsMonthly");
    if (x.style.display === "none") {
        x.style.display = "block";
        $("#buttongraphmonth").text(getTranslatedText("monthlyGraphButton-hide"));
    } else {
        x.style.display = "none";
        $("#buttongraphmonth").text(getTranslatedText("monthlyGraphButton-show"));
    }

}