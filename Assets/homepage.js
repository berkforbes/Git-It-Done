
var userFormEl = document.querySelector('#user-form')
var nameInputEl = document.querySelector('#username')

// Function to take username input and send to getUserRepos function. 
var formSubmitHandler = function(event){
event.preventDefault();
var username = nameInputEl.value.trim();

if (username) {
    getUserRepos(username);
    nameInputEl.value="";  //Clears form
} else {
    alert('Please enter a github username');
}
}

// fetch github API, take username input in form and concatenate as user in api url
var getUserRepos = function (user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response){ //convert response into json then store as data
        response.json().then(function(data) {
            displayRepos(data, user);
        });
    });
};

// Event listener for sumbit button
userFormEl.addEventListener('submit', formSubmitHandler);

var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
  };