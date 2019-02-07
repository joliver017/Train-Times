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

$("#fields").on("submit", function(event){
event.preventDefault();

var name = $("#name").val();
var destination = $("#destination").val();
var firstTrain = $("#first-train").val();
var frequency = $("#frequency").val();

database.ref().push({
    name, destination, firstTrain, frequency
});

$("#name").val("");
$("#destination").val("");
$("#first-train").val("");
$("#frequency").val("");

});

database.ref().on("child_added",function(childSnapshot){
var name = childSnapshot.val().name;
var destination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().firstTrain;
var frequency = childSnapshot.val().frequency;


var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
// console.log(firstTrainConverted);

var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime); 

var tRemainder = diffTime % frequency;
// console.log(tRemainder);

var minutesAway = frequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + minutesAway);

var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
// console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

$("#table-data").append("<tr>" + "<td>" + name + "</td> <td>" + destination + "</td> <td>" + frequency + "</td> <td>" + nextArrival + "</td> <td>" + minutesAway + "</td> </tr>");
});