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
