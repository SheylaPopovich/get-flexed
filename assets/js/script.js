var loadSiteBtn = $("#load-site-btn");
var genWorkoutForm = $("#gen-workout");

// Shows the form to generate a workout and hides the starting screen and/or the workout screen
var showForm = function () {
  $("#start-screen").addClass("hide");
  $("#workout-screen").removeClass("hide");
  $("#request-el").addClass("hide");
};

//saves the current workout
var saveWorkout = function (workout) {
  console.log("Saving...");
  var category = $("#workout-cat").val();
  window.localStorage.setItem(category, JSON.stringify(workout));
};

function displayWorkout(workout) {
  //Shows the generated workout and hides the form to generate a workout
  $("#workout-screen").addClass("hide");
  $("#request-el").removeClass("hide");


  //clears out previous information displayed in the movie card
  $("#workout-generated").html("");

  for (var i = 0; i < workout.length; i++) {
    var workoutDiv = $("<div>");
    $("#workout-generated").append(workoutDiv);

    //adds the workout title to the generated workout div
    var title = $("<h3>");
    title.addClass("workout-title");
    title.text(workout[i].name);
    workoutDiv.append(title);

    //add the workout description
    workoutDiv.append(workout[i].description);
  }

  //add a save button
  var saveBtn = $("<button>");
  saveBtn.attr("id", "save-button");
  saveBtn.text("Save Workout");
  $("#workout-generated").append(saveBtn);
  $("#save-button").click(function () {
    workoutArray.push(workout);
    saveWorkout(workout);
  });

  //add a cancel button
  var cancelBtn = $("<button>");
  cancelBtn.attr("id", "cancel-button");
  cancelBtn.text("Go Back");
  $("#workout-generated").append(cancelBtn);
  $("#cancel-button").click(showForm);

  displayWorkoutImg();
}

// Shuffles the workouts from the API using a Knuth Shuffle and splices it down to a list of 3 to be used
function shuffleWorkouts(workouts) {
  var currentIndex = workouts.length,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [workouts[currentIndex], workouts[randomIndex]] = [
      workouts[randomIndex],
      workouts[currentIndex],
    ];
  }
  workouts.splice(3);
  // TODO: call function to display with workouts param
  displayWorkout(workouts);
}

// Fetches to wger for the selected workout category to grab the ID that the API associates with each workout category
var getWorkout = function (event) {
  event.preventDefault();
  var workoutCat = $("#workout-cat").val();

  getQuote();

  var exerciseUrl =
    "https://wger.de/api/v2/exercise/?limit=52&language=2&category=" +
    workoutCat;

  fetch(exerciseUrl)
    .then((response) => {
      if (response.staus === 404) {
        console.log("Error");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (data.staus === 404) {
        console.log("Error");
      } else {
        shuffleWorkouts(data.results);
      }
    });
};

//displays the quote and author to the page
var displayQuote = function (quote) {
  $("#motivational-quote").html("");

  var wiseWords = quote[0].text;
  var authoredBy = quote[0].author;

  var quoteDiv = $("<div>");
  $("#motivational-quote").append(quoteDiv);

  var quoteEl = $("<h2>");
  quoteEl.text(wiseWords);
  quoteDiv.append(quoteEl);

  var authorEl = $("<p>");
  authorEl.text("by " + authoredBy);
  quoteDiv.append(authorEl);
};

// Shuffles the quotes from the API using a Knuth Shuffle and splices it down to a list of 3 to be used
function shuffleQuotes(quote) {
  var currentIndex = quote.length,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [quote[currentIndex], quote[randomIndex]] = [
      quote[randomIndex],
      quote[currentIndex],
    ];
  }
  quote.splice(1);
  // TODO: call function to display with quote param
  displayQuote(quote);
}

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
    displayWorkout(workouts);
};

// Gets a list of quotes from an API
function getQuote() {
  fetch("https://type.fit/api/quotes")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      shuffleQuotes(data);
    });
}

// Changes SRC based on selected workout type
function displayWorkoutImg() {
    var category = $("#workout-cat").val();
    $('#workout-img').attr('src', './assets/images/workout' + category + '.png');
}; 

// Event Listeners
loadSiteBtn.click(showForm);
genWorkoutForm.submit(getWorkout);