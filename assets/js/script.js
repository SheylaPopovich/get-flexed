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