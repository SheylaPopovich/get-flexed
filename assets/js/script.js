
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
var workoutArray = [];

//make sure that any past saved workouts are included in the array
workoutArray = JSON.parse(localStorage.getItem("workouts"));
//unless there is nothing saved...
if (workoutArray === null) {
    workoutArray = [];
};

// Shows the form to generate a workout and hides the starting screen and/or the workout screen
var showForm = function () {
    $('#start-screen').addClass('hide');
    $('#workout-screen').removeClass('hide');
    $('#request-el').addClass('hide');

};

//saves the current workout
var saveWorkout = function() { 
    console.log("Saving...");
    window.localStorage.setItem("workouts", JSON.stringify(workoutArray));

}

function displayWorkout(workout){
   //Shows the generated workout and hides the form to generate a workout
    $('#workout-screen').addClass('hide');
    $('#request-el').removeClass('hide');

  //clears out previous information displayed in the movie card
    $("#workout-generated").html("");

    for (var i = 0; i < workout.length; i++) {
        //adds the workout title to the generated workout div
        var title = $("<h3>");
        title.addClass("workout-title");
        title.text(workout[i].name);
        $("#workout-generated").append(title);

        //add the workout description
        $("#workout-generated").append(workout[i].description);
    }

  //add a save button
    var saveBtn = $("<button>");
    saveBtn.attr("id", "save-button");
    saveBtn.text("Save Workout")
    $("#workout-generated").append(saveBtn);
    $("#save-button").click(function(){
        workoutArray.push(workout);
        saveWorkout();
    });

  //add a cancel button
    var cancelBtn = $("<button>");
    cancelBtn.attr("id", "cancel-button");
    cancelBtn.text("Go Back");
    $("#workout-generated").append(cancelBtn);
    $("#cancel-button").click(showForm);

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
    // TODO: call function to display with workouts param
    displayWorkout(workouts)
};

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

//displays the quote and author to the page
var displayQuote = function(quote){

    $("#motivational-quote").html("")

    var wiseWords = quote[0].text;
    var authoredBy = quote[0].author;

    var quoteEl = $("<h2>")
    quoteEl.text(wiseWords)
    $("#motivational-quote").append(quoteEl)

    var authorEl = $("<p>")
    authorEl.text("by " + authoredBy)
    $("#motivational-quote").append(authorEl)

}

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
    // TODO: call function to display with quote param
    displayQuote(quote)
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


function displayHistory() {
    workoutArray.forEach(element => {
        var newDiv = $("<ol>")
        for (let i = 0; i < element.length; i++) {
            var workoutLi = $("<li>")
            workoutLi.text(element[i].name + ": ")
            newDiv.append(workoutLi)
            newDiv.append(element[i].description)
        }
        $("#previous-workouts").append(newDiv)
    });
}

displayHistory()
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