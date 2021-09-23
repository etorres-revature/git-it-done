const getRepoIssues = function (repo) {
  let apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  fetch(apiURL)
    .then(function (response) {
      //request was successful
      if (response.ok) {
        return response.json();
      } else {
        alert("There was a problem completing that request.");
      }
    })
    .then(function (data) {
      console.log(data);
    });
};

getRepoIssues("facebook/react");
