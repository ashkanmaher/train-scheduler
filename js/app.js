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
