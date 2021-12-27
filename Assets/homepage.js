var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// Function to take username input and send to getUserRepos function.
var formSubmitHandler = function (event) {
  event.preventDefault();
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = ""; //Clears form
  } else {
    alert("Please enter a github username");
  }
};

// fetch github API, take username input in form and concatenate as user in api url
var getUserRepos = function (user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: GitHub User Not Found");
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GitHub");
    });
};

// Event listener for sumbit button
userFormEl.addEventListener("submit", formSubmitHandler);

var displayRepos = function (repos, searchTerm) {
  console.log(repos);
  console.log(searchTerm);
  // Clear previous search and display current search on html
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};
