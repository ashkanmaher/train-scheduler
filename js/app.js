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

// First Arrival (referenced code that pushed back 1 year to make sure the train arrives before the current time)
// Attempted this code but didn't get expected result moment(firstArrival, 'HH:mm').add(trainFrequency, 'minutes').format("HH:mm")
var firstTimeArrived = moment(firstArrival).subtract(1, "years");
// Difference between times
var diffTime = moment().diff(moment(firstTimeArrived), "minutes");

//Time apart
var tApart = diffTime % trainFrequency;

// Minutes until next train
var minUntil = trainFrequency - tApart;

// Next train
var nextTrain = moment().add(minUntil, "minutes");

// Arrival Time
var nextArrival = moment(nextTrain).format("hh:mm a");

// Local object for holding train data
var newTrain = {
  name: trainName,
  destination: trainDestination,
  arrival: firstArrival,
  frequency: trainFrequency,
  minutesAway: minUntil,
  nextTrain: nextArrival
};

// upload train data to the database
database.ref().push(newTrain);

//Log everything to the console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.arrival);
console.log(newTrain.frequency);
console.log(newTrain.minUntil);
console.log(newTrain.nextArrival);

//Clear the text box after submit
$("#train-name-input").val("");
$("#destination-input").val("");
$("#start-input").val("");
$("#frequency-input").val("");
});

//Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
console.log(childSnapshot.val());

// Store everything into a variable.
var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var firstArrival = childSnapshot.val().arrival;
var trainFrequency = childSnapshot.val().frequency;
var minUntil = childSnapshot.val().minutesAway;
var nextArrival = childSnapshot.val().nextTrain;
console.log(trainName);
console.log(trainDestination);
console.log(firstArrival);
console.log(trainFrequency);
console.log(minUntil);
console.log(nextArrival);

$("#train-table > tbody").append(
  "<tr><td>" +
    trainName +
    "</td><td>" +
    trainDestination +
    "</td><td>" +
    trainFrequency +
    "</td><td>" +
    nextArrival +
    "</td><td>" +
    minUntil +
    "</td><td>"
);
});
