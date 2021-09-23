const getUserRepos = (user) => {
  let apiURL = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl)
  .then((response => {
      response.json();
  })
  .then((data) => {
      console.log(data)
  } {

  })
};

getUserRepos();
