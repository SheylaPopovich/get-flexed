// Shows the form to generate a workout and hides the starting screen and/or the workout screen
var showForm = function () {
  $("#start-screen").addClass("hide");
  $("#workout-screen").removeClass("hide");
  $("#request-el").addClass("hide");
};

// Saves the current workout to local storage
var saveWorkout = function (workout) {
  var category = $("#workout-cat").val();
  window.localStorage.setItem(category, JSON.stringify(workout));
};

// Displays workout that is fetched from wger API
function displayWorkout(workout) {
  //Shows the generated workout and hides the form to generate a workout
  $("#workout-screen").addClass("hide");
  $("#request-el").removeClass("hide");

  //clears out previous information displayed in the movie card
  $("#workout-generated").html("");
  $("#button-div").html("");

  for (var i = 0; i < workout.length; i++) {
    var columnDiv = $("<div>");
    columnDiv.addClass("column is-one-third");
    $("#workout-generated").append(columnDiv);

    var workoutDiv = $("<div>");
    workoutDiv.addClass("work-out");
    columnDiv.append(workoutDiv);

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
  saveBtn.addClass("button is-info button is-ghost");
  saveBtn.attr("id", "save-button");
  saveBtn.text("Save Workout");
  $("#button-div").append(saveBtn);
  $("#save-button").click(function () {
    saveWorkout(workout);
  });

  //add a cancel button
  var cancelBtn = $("<button>");
  cancelBtn.addClass("button is-info button is-ghost");
  cancelBtn.attr("id", "cancel-button");
  cancelBtn.text("Go Back");
  $("#button-div").append(cancelBtn);
  $("#cancel-button").click(showForm);

  displayWorkoutImg();
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
        workoutFilter(data.results);
      }
    });
};

// Displays the quote and author to the page
var displayQuote = function (quote) {
  $("#motivational-quote").html("");

  var wiseWords = quote[0].text;

  if (quote[0].author) {
    var authoredBy = quote[0].author;
  } else {
    authoredBy = "unknown author";
  }

  var quoteDiv = $("<div>");
  $("#motivational-quote").append(quoteDiv);

  var quoteEl = $("<h2>");
  quoteEl.attr("id", "hero-text1");
  quoteEl.text(wiseWords);
  quoteDiv.append(quoteEl);

  var authorEl = $("<p>");
  authorEl.attr("id", "hero-text2");
  authorEl.text("by " + authoredBy);
  quoteDiv.append(authorEl);
};

// Shuffles the quotes from the API using a Knuth Shuffle and splices it down to just one to be used
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

  displayQuote(quote);
}

// Removes any workouts with a name or description that come back as null
function workoutFilter(workouts) {
  for (let i = 0; i < workouts.length; i++) {
    const element = workouts[i];
    if (element.name === null) {
      workouts.splice(i, 1);
    } else if (element.description === "") {
      workouts.splice(i, 1);
    };
  };

  shuffleWorkouts(workouts);
}

// Shuffles the workouts from the API using a Knuth Shuffle and splices it down to a list of 3 to be used
function shuffleWorkouts(workouts) {
  var currentIndex = workouts.length;
  var randomIndex;

  // Randomly chooses 3 workouts from workouts array
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [workouts[currentIndex], workouts[randomIndex]] = [
      workouts[randomIndex],
      workouts[currentIndex],
    ];
  }
  workouts.splice(3);

  displayWorkout(workouts);
}

// Gets a list of quotes from type fit API
function getQuote() {
  fetch("https://type.fit/api/quotes")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      shuffleQuotes(data);
    });
}

// Changes SRC based on selected workout type to display the hero image
function displayWorkoutImg() {
  var category = $("#workout-cat").val();
  $(".hero-image1").css({
    "background-image":
      'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("./assets/images/workout' +
      category +
      '.jpg"',
  });
}

// Event Listeners
$("#load-site-btn").click(showForm);
$("#gen-workout").submit(getWorkout);
