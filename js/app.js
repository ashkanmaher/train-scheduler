/*
Make sure that your app suits this basic spec:

-When adding trains, administrators should be able to submit the following:
  -Train Name
  -Destination
  -First Train Time -- in military time
  -Frequency -- in minutes

-Code this app to calculate when the next train will arrive; this should be relative to the current time.

-Users from many different machines must be able to view same train times.
Styling and theme are completely up to you. Get Creative!
*/


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDyc-sufDxKR-XhAzQdr_EQan3ZHRpCIoE",
    authDomain: "train-scheduler-5b3c5.firebaseapp.com",
    databaseURL: "https://train-scheduler-5b3c5.firebaseio.com",
    projectId: "train-scheduler-5b3c5",
    storageBucket: "",
    messagingSenderId: "462190767429"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

// Grabs user input
var trainName = $("#train-name-input").val();
var trainDestination = $("#destination-input").val();
var firstArrival = moment($("#start-input").val(), "HH:mm").format();
var trainFrequency = $("#frequency-input").val();

// Local object for holding employee data
var newTrain = {
  name: trainName,
  destination: trainDestination,
  arrival: firstArrival,
  frequency: trainFrequency,
};

// upload train data to the database
database.ref().push(newTrain);

//Log everything to the console
 console.log(newTrain.name);
 console.log(newTrain.destination);
 console.log(newTrain.arrival);
 console.log(newTrain.frequency);

//Clear the text box after submit
$("#train-name-input").val("");
$("#destination-input").val("");
$("#start-input").val("");
$("#frequency-input").val("");

});

//
