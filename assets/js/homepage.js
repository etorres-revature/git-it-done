const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");
const repoContainerEl = document.querySelector("#repos-container");
const repoSearchTerm = document.querySelector("#repo-search-term");

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
  //clear previous content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (let i = 0; i < repos.length; i++) {
    // format repo name
    let repoName = repos[i].owner.login + "/" + repos[i].name;

    //create container for each repo
    let repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repository name
    let titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    //append to container
    repoEl.appendChild(titleEl);

    // append to container to the DOM
    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);
