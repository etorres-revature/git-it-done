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
      displayIssues(data);
    });
};

const displayIssues = function (issues) {
  for (let i = 0; i < issues.length; i++) {
    // create link element to take users to the issue on GH
    let issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    // create span to hold issue title
    let titleEl = document.createElement("span");
    titleEl.textContent = issues[i].titleEl;

    // append to container
    issueEl.appendChild(titleEl);

    // create a type element
    let typeEl = document.createElement("span");

    // check if issue is an actual issue of pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull Request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    // append to container
    issueEl.appendChild(typeEl);
  }
};

getRepoIssues("facebook/react");
