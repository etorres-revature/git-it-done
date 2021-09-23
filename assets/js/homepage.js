let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");
let languageButtonsEl = document.querySelector("#language-buttons");
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");

const getUserRepos = function (user) {
  // format the github api url
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request successful
      if (response.ok) {
        return response.json();
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .then(function (data) {
      displayRepos(data, user);
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub at this time.", error);
      console.log(error);
    });
};

const getFeaturedRepos = function (language) {
  var apiURL =
    "https://api.github.com/search/repositories?q=" +
    language +
    "+is:featured&sort=help-wanted-issues";

  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data.items, language);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub at this time.", error);
      console.log(error);
    });
};

const displayRepos = function (repos, searchTerm) {
  // check if api returned any repose
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories to display ...";
    return;
  }
  //clear previous content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (let i = 0; i < repos.length; i++) {
    // format repo name
    let repoName = repos[i].owner.login + "/" + repos[i].name;

    //create container for each repo
    let repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repository name
    let titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    //append to container
    repoEl.appendChild(titleEl);

    // create a status element
    let statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        repos[i].open_issues_count +
        " issue(s)... <i class='fas fa-times status-icon icon-danger'></i>";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append to container to the DOM
    repoContainerEl.appendChild(repoEl);
  }
};

const formSubmitHandler = (event) => {
  event.preventDefault();

  let username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    //clear old content
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username.");
  }
};

const buttonClickHandler = function (event) {
  let language = event.target.getAttribute("data-language");

  if (language) {
    getFeaturedRepos(language);

    // clear old content
    repoContainerEl.textContent = "";
  }
};

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);
