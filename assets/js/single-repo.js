let issueContainerEl = document.querySelector("#issues-container");
let limitWarningEl = document.querySelector("#limit-warning");

const getRepoIssues = function (repo) {
  let apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  fetch(apiURL)
    .then(function (response) {
      // check if api has paginated issues
      if (response.headers.get("Link")) {
        displayWarning(repo);
      }
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
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues.";
    return;
  }

  for (let i = 0; i < issues.length; i++) {
    // create link element to take users to the issue on GH
    let issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    // create span to hold issue title
    let titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

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

    issueContainerEl.appendChild(issueEl);
  }
};

const displayWarning = function (repo) {
  // add text to warning container
  limitWarningEl.textContent = "repo has more than 30 issues pending...";

  let linkEl = document.createElement("a");
  linkEl.textContent = "See more Issues on Githb.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  // append warning to container
  limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");
