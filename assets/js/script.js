console.log("It's Working!!")

//pseudocode

//page 1
//when the button gets clicked, redirect to page 2

//page 2
//when a button gets clicked it creates a search parameter
//api/v2/exercise/?muscles=1&equipment=3
//search parameters are joined together and stored in a variable
//the variable is used to fetch information from the api
//an inpisrational quote is fetched from another api
//the information from the api is desplayed on the page
//when the save button is clicked the information is stored as an object in local storage
//when the cancel button is clicked the user is redirected to the form
// the 'previous workouts' page loads a list of previous workouts from local storage
var loadSiteBtn = $('#load-site-btn');
var genWorkoutForm = $('#gen-workout');
var workoutRec = ""
var workoutObj = []

// Shows the form to generate a workout and hides the starting screen and/or the workout screen
var showForm = function () {
    $('#start-screen').addClass('hide');
    $('#workout-screen').removeClass('hide');
    $('#request-el').addClass('hide');

};

//saves the current workout
var saveWorkout = function() {
  //selects the current 
  console.log("Saving...");


}

function displayWorkout(workout){
  console.log(workout)
  //Shows the generated workout and hides the form to generate a workout
//   $('#workout-screen').addClass('hide');
//   $('#request-el').removeClass('hide');

  //clears out previous information displayed in the movie card
  $("#workout-generated").html("");

  //adds the workout title to the generated workout div
  var title = $("<h2>");
  title.addClass("workout-title");
  title.text(workout[0].name);
  $("#workout-generated").append(title);

  //add the workout description
  $("#workout-generated").append(workout[0].description);

  var saveBtn = $("<button>");
  saveBtn.attr("id", "save-button");
  saveBtn.text("Save Workout")
  $("#workout-generated").append(saveBtn);
  $("#save-button").click(saveWorkout);

  var cancelBtn = $("<button>");
  cancelBtn.attr("id", "cancel-button");
  cancelBtn.text("Cancel")
  $("#workout-generated").append(cancelBtn);
  $("#cancel-button").click(showForm)

}

// Fetches to wger for the selected workout category to grab the ID that the API associates with each workout category
var getWorkout = function (event) {
    event.preventDefault();
    var workoutCat= $('#workout-cat').val();

    getQuote();
    
    var exerciseUrl = 'https://wger.de/api/v2/exercise/?limit=52&language=2&category=' + workoutCat;

    fetch(exerciseUrl)
    .then(response => {
        if (response.staus === 404) {
            console.log('Error');
        }else {
            return response.json();
        };
    }).then(data => {
        if (data.staus === 404) {
            console.log('Error');
        }else {
            shuffleWorkouts(data.results);
        };
    })
};

// Gets a list of quotes from an API
function getQuote () {
    fetch("https://type.fit/api/quotes")
    .then(response => {
        return response.json()
    }).then(data => {
        shuffleQuotes(data);
    });
};

// Shuffles the quotes from the API using a Knuth Shuffle and splices it down to a list of 3 to be used
function shuffleQuotes (quote) {
    var currentIndex = quote.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        [quote[currentIndex], quote[randomIndex]] = [
          quote[randomIndex], quote[currentIndex]];
        }
    quote.splice(1);
    console.log(quote);
    // TODO: call function to display with quote param
};

// Shuffles the workouts from the API using a Knuth Shuffle and splices it down to a list of 3 to be used
function shuffleWorkouts (workouts) {
    var currentIndex = workouts.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        [workouts[currentIndex], workouts[randomIndex]] = [
          workouts[randomIndex], workouts[currentIndex]];
        }
    workouts.splice(3);
    console.log(workouts);
    // TODO: call function to display with workouts param
    displayWorkout(workouts)
};

// Event Listeners
loadSiteBtn.click(showForm);
genWorkoutForm.submit(getWorkout);



// adding on modal
$(".modal-button").click(function() {
    var target = $(this).data("target");
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
 });
 
 $(".modal-close").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
 });