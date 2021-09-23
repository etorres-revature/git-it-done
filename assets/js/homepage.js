const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");

const getUserRepos = function (user) {
  // format the github api url
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      displayRepose(data, user);
    });
  });
};

const formSubmitHandler = (event) => {
  event.preventDefault();

  let username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username.");
  }
};

const displayRepose = function (repos, searchTerm) {
  console.log(repos);
  console.log(searchTerm);
};

userFormEl.addEventListener("submit", formSubmitHandler);
