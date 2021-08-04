console.log("It's Working!!")

//pseudocode

//page 1
//when the button gets clicked, redirect to page 2
$("#make-it-happen-btn").on("click", function(){
    window.document.location = "findWorkout.html";
  });

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

// Shows the form to generate a workout and hides the starting screen
var showForm = function () {
    $('#start-screen').addClass('hide');
    $('#workout-screen').removeClass('hide');
};

// Fetches to wger for the selected workout category to grab the ID that the API associates with each workout category
var getWorkout = function () {
    event.preventDefault();
    var workoutCat= $('#workout-cat').val();
    
    var exerciseUrl = 'https://wger.de/api/v2/exercise/?limit=10&category=' + workoutCat;

    fetch(exerciseUrl)
    .then(function (response){
        if (response.staus === 404) {
            console.log('Error');
        }else {
            return response.json();
        };
    }).then(function (data) {
        if (data.staus === 404) {
            console.log('Error');
        }else {
            console.log(data.results);
        };
    })
};



// Event Listeners
loadSiteBtn.click(showForm);
genWorkoutForm.submit(getWorkout);
