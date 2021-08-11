// Gets array from local storage calls a function that displays the data
var getWorkout = function () {
  event.preventDefault();

  var category = $("#workout-cat").val();
  var workout = JSON.parse(localStorage.getItem(category));

  displayHistory(workout);
};

// Display the array that is grabbed from local storage
function displayHistory(workoutArray) {
  $("#previous-workouts").empty();

  var newDiv = $("<div>");
  for (let i = 0; i < workoutArray.length; i++) {
    var workoutTitle = $("<h3>");
    workoutTitle.text(workoutArray[i].name + ": ");
    newDiv.append(workoutTitle);
    newDiv.append(workoutArray[i].description);
  }

  $("#previous-workouts").append(newDiv);
}

// Event Listener
$("#gen-workout").submit(getWorkout);
