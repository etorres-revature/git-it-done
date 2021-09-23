const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");

const getUserRepos = function(user) {
    // format the github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
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

userFormEl.addEventListener("submit", formSubmitHandler);
