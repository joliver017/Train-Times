// Initialize Firebase
var config = {
    apiKey: "AIzaSyDoQGZd--1yfAOBJzOxJ0KQPJif67XrFnk",
    authDomain: "train-times-16c7d.firebaseapp.com",
    databaseURL: "https://train-times-16c7d.firebaseio.com",
    projectId: "train-times-16c7d",
    storageBucket: "train-times-16c7d.appspot.com",
    messagingSenderId: "671310355966"
  };

firebase.initializeApp(config);

var database = firebase.database();

// This submits the fields form when the button is clicked
$("#fields").on("submit", function(event){
event.preventDefault();

// These variables are set to whatever is input into the corresponding field
var name = $("#name").val();
var destination = $("#destination").val();
var firstTrain = $("#first-train").val();
var frequency = $("#frequency").val();


// This pushes them to Firebase
database.ref().push({
    name, destination, firstTrain, frequency
});

// This clears the field once they are submitted
$("#name").val("");
$("#destination").val("");
$("#first-train").val("");
$("#frequency").val("");

});

// This now makes variables for each corresponding value in Firebase
database.ref().on("child_added",function(childSnapshot){
var name = childSnapshot.val().name;
var destination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().firstTrain;
var frequency = childSnapshot.val().frequency;

// The following code uses moment.js to get the times and find the differences
var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  // console.log(firstTrainConverted);

var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  // console.log("DIFFERENCE IN TIME: " + diffTime); 

var tRemainder = diffTime % frequency;
  // console.log(tRemainder);

var minutesAway = frequency - tRemainder;
  // console.log("MINUTES TILL TRAIN: " + minutesAway);

var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
  // console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));


// This appends the variables/table data we want to show up in new rows
$("#table-data").append("<tr>" + "<td>" + name + "</td> <td>" + destination + "</td> <td>" + frequency + "</td> <td>" + nextArrival + "</td> <td>" + minutesAway + "</td> </tr>");
});